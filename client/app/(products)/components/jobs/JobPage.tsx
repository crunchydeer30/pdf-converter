import useJob from "../../hooks/useJob";
import JobStatusIcon from "./JobStatusIcon";
import { JobStatus } from "../../services";
import DownloadButton from "./DownloadButton";
import { Theme } from "@/ui/themes/types/Theme";
import ErrorToast from "@/ui/error/ErrorToast";
import { Button } from "@/ui/button/Button";

interface JobPageProps {
  theme: Theme;
}

export default function JobPage({ theme }: JobPageProps) {
  const { jobStatus, isError, error, fileName, downloadLink, download } =
    useJob();

  if (isError) {
    return (
      <>
        {isError && <ErrorToast error={error!} />}
        <div className="container h-full flex flex-col gap-4 pb-20 justify-center items-center">
          <Button href="/" theme={theme} className="!py-4">
            Go Back
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container h-full flex flex-col gap-4 justify-between items-center">
        <div className="flex flex-col gap-4 items-center">
          <JobStatusIcon status={jobStatus} theme={theme} />
          {fileName && <span className="text-sm text-s-1">{fileName}</span>}
        </div>
        {jobStatus === JobStatus.COMPLETED && downloadLink && fileName && (
          <DownloadButton theme={theme} onClick={download} />
        )}
      </div>
    </>
  );
}
2;
