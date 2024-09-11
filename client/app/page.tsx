import { ThemeDefault } from "@/ui/themes/Themes";
import ThemedLayout from "@/ui/layout/ThemedLayout";
import ConverterLayout from "@/ui/layout/ConverterLayout";

export default function Home() {
  return (
    <ThemedLayout theme={ThemeDefault}>
      <ConverterLayout theme={ThemeDefault} />
    </ThemedLayout>
  );
}
