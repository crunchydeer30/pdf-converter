import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  JobStatus,
  JobStatusResponse,
  downloadFile,
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

  useEffect(() => {
    const fetchJobStatus = async () => {
      try {
        setIsLoading(true);
        await getJobStatus(jobId as string);
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

  const download = async () => {
    if (jobStatus !== JobStatus.COMPLETED) return;
    try {
      await downloadFile(jobId as string);
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
  };
}
