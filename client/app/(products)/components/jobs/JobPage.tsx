import useJob from "../../hooks/useJob";
import JobStatusIcon from "./JobStatusIcon";
import { JobStatus } from "../../services";
import DownloadButton from "./DownloadButton";
import { Theme } from "@/ui/themes/types/Theme";

interface JobPageProps {
  theme: Theme;
}

export default function JobPage({ theme }: JobPageProps) {
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
      <JobStatusIcon status={jobStatus} theme={theme} />
      {jobStatus === JobStatus.COMPLETED && (
        <DownloadButton theme={theme} onClick={download} />
      )}
    </div>
  );
}
