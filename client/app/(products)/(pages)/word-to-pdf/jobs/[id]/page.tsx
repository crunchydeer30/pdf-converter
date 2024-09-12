"use client";
import DownloadButton from "@/app/(products)/components/jobs/DownloadButton";
import JobStatusIcon from "@/app/(products)/components/jobs/JobStatusIcon";
import useJob from "@/app/(products)/hooks/useJob";
import { JobStatus } from "@/app/(products)/services";
import { ThemeWord } from "@/ui/themes/Themes";

export default function WordJob() {
  const { jobStatus, download, isError, error } = useJob();

  if (isError) {
    return (
      <div className="container h-full flex flex-col gap-4 pb-20 justify-center items-center">
        <h2 className="text-3xl font-bold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container h-full flex flex-col gap-4 justify-between items-center">
      <JobStatusIcon status={jobStatus} />
      {jobStatus === JobStatus.COMPLETED && (
        <DownloadButton theme={ThemeWord} onClick={download} />
      )}
    </div>
  );
}
