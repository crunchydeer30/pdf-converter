import { Module } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConverterModule, ScheduleModule.forRoot()],
})
export class AppModule {}
