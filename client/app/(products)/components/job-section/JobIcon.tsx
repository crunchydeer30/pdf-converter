import { ThemeWord } from "@/ui/themes/Themes";
import { JobStatus } from "../../services";

interface JobIconProps {
  status: JobStatus;
}

export default function JobIcon({ status }: JobIconProps) {
  return (
    <div className="shadow-xl w-[200px] h-[300px] bg-white rounded-lg flex justify-center items-center">
      <Status status={status} />
    </div>
  );
}

function Status({ status }: JobIconProps) {
  switch (status) {
    case JobStatus.PENDING:
    case JobStatus.PROCESSING:
      return (
        <svg className={`w-12 h-12 fill-${ThemeWord.color} animate-spin`}>
          <use href={`/assets/icons.svg#spinner1`}></use>
        </svg>
      );
    case JobStatus.COMPLETED:
      return (
        <svg className={`w-24 h-24 fill-${ThemeWord.color}`}>
          <use href={`/assets/icons.svg#pdf`}></use>
        </svg>
      );
    default:
      return null;
  }
}
