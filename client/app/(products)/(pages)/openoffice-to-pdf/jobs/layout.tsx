import JobLayout from "@/ui/layout/JobLayout";
import { ThemeOpenOffice } from "@/ui/themes/Themes";

export default function OpenOfficeJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobLayout theme={ThemeOpenOffice}>{children}</JobLayout>;
}
