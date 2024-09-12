import { env } from "@/config/env";
import axios, { AxiosProgressEvent } from "axios";
import { Products } from "../data/products";

interface UploadOfficeToPdfResponse {
  message: string;
  jobId: string;
}

export interface JobStatusResponse {
  status: JobStatus;
  jobId: string;
}

export interface DownloadFileResponse {
  url: string;
}

export enum JobStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export const officeToPdf = async (
  formData: FormData,
  setProgress?: React.Dispatch<React.SetStateAction<number>>
): Promise<UploadOfficeToPdfResponse> => {
  const response = await axios.post(
    `${env.API_GATEWAY}/converter/office-to-pdf`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(progressEvent) {
        if (setProgress) handleUploadProgress(progressEvent, setProgress);
      },
    }
  );
  return response.data;
};

export const getJobStatus = async (id: string): Promise<JobStatusResponse> => {
  const response = await axios.get(
    `${env.API_GATEWAY}/converter/files/${id}/status`
  );
  return response.data;
};

export const downloadFile = async (id: string) => {
  const response = await axios.get<DownloadFileResponse>(
    `${env.API_GATEWAY}/converter/files/${id}/download`
  );
  window.open(response.data.url, "_blank");
};

export const selectProduct = (mime: string) => {
  const product = Products.find((product) => {
    return product.mimes.includes(mime);
  });
  if (!product) throw new Error("Sorry, we are not able to convert this file.");
  return product.href;
};

function handleUploadProgress(
  progressEvent: AxiosProgressEvent,
  setProgress: React.Dispatch<React.SetStateAction<number>>
) {
  if (progressEvent.total) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 90) / (progressEvent.total || 1)
    );
    console.log(percentCompleted);
    setProgress(percentCompleted);
  }
}
