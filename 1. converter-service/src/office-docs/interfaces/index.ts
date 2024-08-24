export enum JobStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface FileMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
}

export interface Job {
  id: string;
  status: JobStatus;
}
