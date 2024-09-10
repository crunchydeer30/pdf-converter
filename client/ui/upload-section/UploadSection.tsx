import { Theme } from "../themes/types/Theme";
import UploadButton from "./UploadButton";

interface UploadSectionProps {
  theme: Theme;
}

export function UploadSection({ theme }: UploadSectionProps) {
  return (
    <section className={` bg-${theme.color}-very-light border-b-[1px]`}>
      <div className="flex flex-col gap-20 justify-center items-center py-16 max-w-7xl mx-auto">
        <h2 className="text-s-1 text-xl pt-12">{theme.data.subheader}</h2>
        <div>
          <UploadButton theme={theme} />
        </div>
        <div className="flex flex-col gap-12 items-center">
          <h2 className="text-xl font-bold">{theme.data.howTo.title}</h2>
          <ol className="grid grid-cols-3 gap-12 steps">
            {Object.entries(theme.data.howTo.steps).map(([key, value]) => (
              <Step key={key} theme={theme}>
                {value}
              </Step>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const classNames = [
    "flex",
    "items-center",
    "gap-4",
    "text-s-1",
    "before:bg-white",
    "before:font-semibold",
    "before:rounded-full",
    "before:p-3",
    `before:text-${theme.color}`,
    "before:border-s1",
    "before:border-2",
    "before:w-4",
    "before:h-4",
    "before:flex",
    "before:items-center",
    "before:justify-center",
  ];

  return <li className={classNames.join(" ")}>{children}</li>;
}
