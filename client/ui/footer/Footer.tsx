import { Theme } from "@/ui/themes/types/Theme";
import Link from "next/link";

interface FooterProps {
  theme: Theme;
}

export default function Footer({ theme }: FooterProps) {
  return (
    <footer className="">
      <div className="border-b-[1px] border-t-[1px] py-12">
        <div className="container flex justify-between">
          <div className="grid grid-cols-4 gap-20">
            <nav className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">Member area</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/" className="text-s-1">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-s-1">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-s-1">
                    Forgot Password?
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">PDF Converter</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/" className="text-s-1">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">Company</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/" className="text-s-1">
                    Teams in Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-s-1">
                    Developers API
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="flex flex-col gap-4">
              <h3 className="font-bold text-lg">Support</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link href="/" className="text-s-1">
                    Help
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div className="flex items-center gap-4 py-6 border-b-[1px]">
              <svg className={`fill-${theme.color} w-6 h-6`}>
                <use href={`/assets/logos.svg#logo-secondary`}></use>
              </svg>
              <span className="text-xl font-semibold">PDF Converter</span>
            </div>
            <div className="flex flex-col gap-1 py-2">
              <p
                className={`text-center text-xl text-${theme.color} tracking-widest`}
              >
                877750233817
              </p>
              <p className="text-center text-sm">files converted since 2005</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center container py-4">
        <p>
          <span>This is a copy of&nbsp;</span>
          <a
            href="https://www.freepdfconvert.com/"
            className={`text-${theme.color} font-bold`}
          >
            freepdfconvert.com
          </a>
          <span>&nbsp;made for educational purposes</span>
        </p>
      </div>
    </footer>
  );
}
