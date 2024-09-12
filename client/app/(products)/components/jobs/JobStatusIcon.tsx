import { JobStatus } from "../../services";
import { Theme } from "@/ui/themes/types/Theme";

interface JobStatusIconProps {
  status: JobStatus;
  theme: Theme;
}

export default function JobStatusIcon({ status, theme }: JobStatusIconProps) {
  return (
    <div className="shadow-xl w-[200px] h-[300px] bg-white rounded-lg flex justify-center items-center">
      <Status status={status} theme={theme} />
    </div>
  );
}

function Status({ status, theme }: JobStatusIconProps) {
  switch (status) {
    case JobStatus.PENDING:
    case JobStatus.PROCESSING:
      return (
        <svg className={`w-12 h-12 fill-${theme.color} animate-spin`}>
          <use href={`/assets/icons.svg#spinner1`}></use>
        </svg>
      );
    case JobStatus.COMPLETED:
      return (
        <svg className={`w-24 h-24 fill-${theme.color}`}>
          <use href={`/assets/icons.svg#pdf`}></use>
        </svg>
      );
    default:
      return null;
  }
}
