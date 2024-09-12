import { ReactNode } from "react";
import { Header } from "@/ui/header/Header";
import Footer from "@/ui/footer/Footer";
import { Product } from "@/app/(products)/data/products";

interface ThemedLayoutProps {
  children: ReactNode;
  product: Product;
}

export default function ThemedLayout({ children, product }: ThemedLayoutProps) {
  return (
    <>
      <Header product={product} />
      <main className="grow flex flex-col">{children}</main>
      <Footer theme={product.theme} />
    </>
  );
}
