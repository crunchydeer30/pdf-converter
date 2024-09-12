"use client";
import DownloadButton from "@/app/(products)/components/job-section/DownloadButton";
import JobIcon from "@/app/(products)/components/job-section/JobIcon";
import {
  downloadFile,
  JobStatus,
  JobStatusResponse,
} from "@/app/(products)/services";
import { ThemeWord } from "@/ui/themes/Themes";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function WordJob() {
  const { id } = useParams();
  const [status, setStatus] = useState<JobStatus>(JobStatus.PROCESSING);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8000/api/v1/converter/files/${id}/progress`
    );
    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data) as JobStatusResponse;
      if (data && data.status) {
        setStatus(data.status);
      }
      if (
        data.status !== JobStatus.PENDING &&
        data.status !== JobStatus.PROCESSING
      ) {
        eventSource.close();
      }
    };
    return () => eventSource.close();
  }, [id]);

  const download = async () => {
    try {
      await downloadFile(id as string);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container h-full flex flex-col gap-4 justify-between items-center">
      <JobIcon status={status} />
      {status === JobStatus.COMPLETED && (
        <DownloadButton theme={ThemeWord} onClick={download} />
      )}
    </div>
  );
}
