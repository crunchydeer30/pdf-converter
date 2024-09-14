import Link from "next/link";
import { Button } from "../button/Button";
import { Product } from "@/app/(products)/data/products";

interface HeaderProps {
  product: Product;
}

export function Header({ product }: HeaderProps) {
  return (
    <header className="shadow">
      <nav className="flex items-center justify-between border-2 px-5 py-7">
        <Link href="/" className="flex gap-2 items-center">
          <svg className={`w-6 h-6 fill-${product.theme.color}`}>
            <use href={`/assets/logos.svg#logo-secondary`}></use>
          </svg>
          <span className="text-xl font-semibold">PDF Converter</span>
        </Link>
        <div className="flex gap-3 items-center absolute left-1/2 transform -translate-x-1/2">
          <svg className="w-10 h-10">
            <use href={`/assets/logos.svg#${product.theme.logo}`}></use>
          </svg>
          <h1 className="text-[26px] font-bold">{product.data.title}</h1>
        </div>
        <div className="">
          <Button href="/signup" theme={product.theme} style="secondary">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
