import JobLayout from "@/ui/layout/JobLayout";
import { ThemeJPG } from "@/ui/themes/Themes";

export default function WordJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobLayout theme={ThemeJPG}>{children}</JobLayout>;
}
