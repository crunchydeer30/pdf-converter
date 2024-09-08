import { ThemeWord } from "@/ui/themes/ThemeWord";
import { ThemeDefault } from "@/ui/themes/ThemeDefault";
import { ThemeExcel } from "@/ui/themes/ThemeExcel";
import { ThemePPT } from "@/ui/themes/ThemePPT";
import { ThemeJPG } from "@/ui/themes/ThemeJPG";
import { ThemeOpenOffice } from "@/ui/themes/ThemeOpenOffice";

export default function Home() {
  return (
    <div>
      <svg className="w-24 h-24 fill-current">
        <use href={`/assets/logos.svg#logo-default`} />
      </svg>
      <div>
        <h1 className={"text-" + ThemeDefault.color}>{ThemeDefault.title}</h1>
        <svg className="w-24 h-24 fill-current">
          <use href={`/assets/logos.svg#logo-secondary`} />
        </svg>
      </div>

      <div>
        <h1 className={"text-" + ThemeWord.color}>{ThemeWord.title}</h1>
        <svg className="w-24 h-24 fill-current">
          <use href={`/assets/logos.svg#logo-word`} />
        </svg>
      </div>

      <div>
        <h1 className={"text-" + ThemeExcel.color}>{ThemeExcel.title}</h1>
        <svg className="w-24 h-24 fill-current">
          <use href={`/assets/logos.svg#logo-excel`} />
        </svg>
      </div>

      <div>
        <h1 className={"text-" + ThemePPT.color}>{ThemePPT.title}</h1>
        <svg className="w-24 h-24 fill-current">
          <use href={`/assets/logos.svg#logo-ppt`} />
        </svg>
      </div>

      <div>
        <h1 className={"text-" + ThemeJPG.color}>{ThemeJPG.title}</h1>
        <svg className="w-24 h-24 fill-current">
          <use href={`/assets/logos.svg#logo-jpg`} />
        </svg>
      </div>

      <div>
        <h1 className={"text-" + ThemeOpenOffice.color}>
          {ThemeOpenOffice.title}
        </h1>
        <svg className="w-24 h-24 fill-current">
          <use href={`/assets/logos.svg#logo-openoffice`} />
        </svg>
      </div>
    </div>
  );
}
