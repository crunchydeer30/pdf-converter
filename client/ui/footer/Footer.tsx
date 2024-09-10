import { Theme } from "@/ui/themes/types/Theme";

interface FooterProps {
  theme: Theme;
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer>
      <p>
        Copyright © {new Date().getFullYear()} {theme.title}
      </p>
    </footer>
  );
}
