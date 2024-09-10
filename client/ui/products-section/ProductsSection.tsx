import Product from "./Product";
import {
  ThemeDefault,
  ThemeExcel,
  ThemeJPG,
  ThemeOpenOffice,
  ThemePPT,
  ThemeWord,
} from "../themes/Themes";

export default function ProductsSection() {
  return (
    <section className="container flex flex-col gap-12 py-16">
      <h2 className="text-3xl font-bold text-center">
        Meet our full product family
      </h2>
      <div className="grid grid-cols-6 gap-8">
        <Product href="/word-to-pdf" theme={ThemeWord}>
          Word to PDF
        </Product>
        <Product href="/excel-to-pdf" theme={ThemeExcel}>
          Excel to PDF
        </Product>
        <Product href="/ppt-to-pdf" theme={ThemePPT}>
          PowerPoint to PDF
        </Product>
        <Product href="/jpg-to-pdf" theme={ThemeJPG}>
          JPG to PDF
        </Product>
        <Product href="/openoffice-to-pdf" theme={ThemeOpenOffice}>
          OpenOffice to PDF
        </Product>
        <Product href="/" theme={ThemeDefault}>
          PDF Converter
        </Product>
      </div>
    </section>
  );
}
