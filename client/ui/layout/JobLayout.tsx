import { Theme } from "../themes/types/Theme";

interface JobLayoutProps {
  theme: Theme;
  children: React.ReactNode;
}

export default function JobLayout({ theme, children }: JobLayoutProps) {
  return <div className={`grow bg-${theme.color}-very-light`}>{children}</div>;
}
