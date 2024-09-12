import { Theme } from "@/ui/themes/types/Theme";
import Link from "next/link";
import { Button } from "../button/Button";

interface HeaderProps {
  theme: Theme;
}

export function Header({ theme }: HeaderProps) {
  return (
    <header className="shadow">
      <nav className="flex items-center justify-between border-2 px-5 py-7">
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
          <h1 className="text-[26px] font-bold">{theme.data.title}</h1>
        </div>
        <div className="">
          <Button href="/signup" theme={theme}>
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
