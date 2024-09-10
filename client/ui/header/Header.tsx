import { Theme } from "@/ui/themes/types/Theme";
import Link from "next/link";
import { Button } from "../button/Button";

interface HeaderProps {
  theme: Theme;
}

export function Header({ theme }: HeaderProps) {
  return (
    <header className="shadow-sm">
      <nav className="flex items-center justify-between border-2 p-6">
        <Link href="/" className="flex gap-2 items-center">
          <svg className={`w-6 h-6 fill-${theme.color}`}>
            <use href={`/assets/logos.svg#logo-secondary`}></use>
          </svg>
          <span className="text-xl font-semibold">PDF Converter</span>
        </Link>
        <div className="flex gap-3 items-center absolute left-1/2 transform -translate-x-1/2">
          <svg className="w-10 h-10">
            <use href={`/assets/logos.svg#${theme.logo}`}></use>
          </svg>
          <span className="text-2xl font-bold">{theme.data.title}</span>
        </div>
        <div className="">
          <Button href="signup" theme={theme}>
            Sing Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
