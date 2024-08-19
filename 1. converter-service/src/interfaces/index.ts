export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface FileMetadata {
  file_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
}

export interface Job {
  id: string;
  status: JobStatus;
}
