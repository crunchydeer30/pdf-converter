import JobLayout from "@/ui/layout/JobLayout";
import { ThemeExcel } from "@/ui/themes/Themes";

export default function WordJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobLayout theme={ThemeExcel}>{children}</JobLayout>;
}
