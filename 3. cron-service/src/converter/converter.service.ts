import { InjectRedis } from '@nestjs-modules/ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Redis } from 'ioredis';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectS3, S3 } from 'nestjs-s3';
import { Logger } from 'winston';
import { Job } from './interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConverterService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectS3() private readonly s3: S3,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async terminateOldJobs() {
    try {
      this.logger.info('Terminating old jobs...');
      const jobs = await this.getOldJobs();
      this.logger.info(`Jobs staged for termination: ${jobs.length}`, jobs);
      const succesfulJobs = await this.deleteJobs(jobs);
      if (succesfulJobs === jobs.length) {
        this.logger.info(
          `Jobs termintated: ${succesfulJobs}/${jobs.length}`,
          jobs,
        );
      } else {
        this.logger.warn(
          `Jobs termintated: ${succesfulJobs}/${jobs.length}`,
          jobs,
        );
      }
    } catch (e) {
      this.logger.error('Error while terminating old jobs', e);
    }
  }

  async getOldJobs(): Promise<Job[]> {
    try {
      const ids = await this.redis.zrangebyscore(
        'jobs:timestamps',
        '-inf',
        Date.now() - 30 * 60 * 1000,
      );

      const pipeline = this.redis.pipeline();
      ids.forEach((id) => {
        pipeline.hgetall(`jobs:${id}`);
      });
      let response = await pipeline.exec();

      response = response.filter(([err, job]) => !err && this.parseJob(job));
      const jobs = response.map(([, job]) => job) as Job[];
      return jobs;
    } catch (e) {
      this.logger.error('Error while retrieving old jobs', e);
    }
  }

  async deleteJobs(jobs: Job[]) {
    let succesfulJobs = 0;
    await Promise.allSettled(
      jobs.map(async (job: Job) => {
        try {
          await this.deleteJob(job);
          succesfulJobs++;
        } catch {}
      }),
    );
    return succesfulJobs;
  }

  async deleteJob(job: Job) {
    try {
      await this.deleteS3Object(`input/${job.id}`);
      await this.deleteS3Object(`output/${job.id}`);
      await this.deleteDbEntry(job);
      this.logger.info(`Deleted job: ${job.id}`, job);
    } catch (e) {
      this.logger.error(`Error while deleting job: ${job.id}`, e);
      throw new Error(e);
    }
  }

  async deleteS3Object(path: string) {
    await this.s3.deleteObject({
      Bucket: this.configService.get('CONVERTER_S3_BUCKET'),
      Key: path,
    });
  }

  async deleteDbEntry(job: Job) {
    const pipeline = this.redis.pipeline();
    pipeline.del(`jobs:${job.id}`);
    pipeline.zrem('jobs:timestamps', job.id);
    await pipeline.exec();
  }

  parseJob(job: unknown) {
    if (
      job instanceof Object &&
      'id' in job &&
      'name' in job &&
      'status' in job
    ) {
      return true;
    } else {
      return false;
    }
  }
}
