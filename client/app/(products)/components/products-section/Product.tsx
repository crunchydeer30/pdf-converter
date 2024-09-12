import Link from "next/link";
import { Theme } from "../../../../ui/themes/types/Theme";

interface ProductProps {
  theme: Theme;
  children: React.ReactNode;
  href: string;
}

export default function Product({ theme, children, href }: ProductProps) {
  return (
    <Link
      href={href}
      scroll={true}
      className={`group realtive text-s-1 bg-${theme.color}-very-light border-[1px] flex flex-col gap-4 items-center justify-center rounded-lg p-6`}
    >
      <svg className="w-10 h-10 group-hover:scale-[1.15] transition">
        <use href={`/assets/logos.svg#${theme.logo}`}></use>
      </svg>
      <span className="text-center text-sm">{children}</span>
    </Link>
  );
}
