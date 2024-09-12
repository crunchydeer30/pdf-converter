import JobLayout from "@/ui/layout/JobLayout";
import { ThemePPT } from "@/ui/themes/Themes";

export default function WordJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobLayout theme={ThemePPT}>{children}</JobLayout>;
}
