import JobLayout from "@/ui/layout/JobLayout";
import { ThemeWord } from "@/ui/themes/Themes";

export default function WordJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobLayout theme={ThemeWord}>{children}</JobLayout>;
}
