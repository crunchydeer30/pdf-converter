import JobLayout from "@/ui/layout/JobLayout";
import { ThemeDefault } from "@/ui/themes/Themes";

export default function WordJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobLayout theme={ThemeDefault}>{children}</JobLayout>;
}
