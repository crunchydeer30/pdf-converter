import { Controller } from '@nestjs/common';
import { JobsService } from './jobs.service';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { UtilsService } from 'src/utils/utils.service';
import { Job } from 'src/interfaces';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly utils: UtilsService,
  ) {}

  // TCP Events - Gateway
  @MessagePattern('job_status')
  async status(@Payload() jobId: string) {
    return await this.jobsService.status(jobId);
  }

  @MessagePattern('job_progress')
  async progress(@Payload() jobId: string) {
    return await this.jobsService.progress(jobId);
  }

  @MessagePattern('download')
  async download(@Payload() jobId: string) {
    console.log(jobId);
    return await this.jobsService.download(jobId);
  }

  // RMQ Events - Converter Worker
  @EventPattern('job_acknowledged')
  async jobAcknowledged(@Payload() jobId: string, @Ctx() context: RmqContext) {
    this.utils.ack(context);
    await this.jobsService.acknowledge(jobId);
  }

  @EventPattern('job_completed')
  async jobCompleted(@Payload() job: Job, @Ctx() context: RmqContext) {
    this.utils.ack(context);
    await this.jobsService.completed(job);
  }
}
