import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  JobStatus,
  JobStatusResponse,
  downloadFile,
  getDownloadLink,
  getJobStatus,
} from "../services";
import { getServerErrorMessage } from "@/utils";
import { env } from "@/config/env";

export default function useJob() {
  const { id: jobId } = useParams();
  const [jobStatus, setJobStatus] = useState<JobStatus>(JobStatus.PROCESSING);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobStatus = async () => {
      try {
        setIsLoading(true);
        const { status } = await getJobStatus(jobId as string);
        setJobStatus(status);
      } catch (e) {
        setIsError(true);
        setError(getServerErrorMessage(e));
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobStatus();

    const eventSource = new EventSource(
      `${env.API_GATEWAY}/converter/files/${jobId}/progress`
    );
    eventSource.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data) as JobStatusResponse;
        if (data && data.status) {
          setJobStatus(data.status);
        }
        if (
          data.status !== JobStatus.PENDING &&
          data.status !== JobStatus.PROCESSING
        ) {
          eventSource.close();
        }
      } catch (error) {
        setIsError(true);
        setError(getServerErrorMessage(error));
      }
    };
    return () => eventSource.close();
  }, [jobId, isError]);

  useEffect(() => {
    const fetchDownloadLink = async () => {
      const { url, fileName } = await getDownloadLink(jobId as string);
      setDownloadLink(url);
      setFileName(fileName);
    };
    if (jobStatus === JobStatus.COMPLETED) {
      fetchDownloadLink();
    }
  }, [jobId, jobStatus]);

  const download = async () => {
    if (jobStatus !== JobStatus.COMPLETED || !downloadLink || !fileName)
      throw new Error("Sorry, file is not available. Please try again later.");
    try {
      await downloadFile(downloadLink);
    } catch (error) {
      setIsError(true);
      setError(getServerErrorMessage(error));
    }
  };

  return {
    jobStatus,
    download,
    isError,
    error,
    isLoading,
    downloadLink,
    fileName,
  };
}
