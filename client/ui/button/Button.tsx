import Link from "next/link";
import { Theme } from "../themes/types/Theme";
import { ExtendableClassNames } from "../extendableClassNames/extendable";
import { extendClassNames } from "../extendableClassNames/extendable";

interface ButtonProps extends ExtendableClassNames {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  theme: Theme;
  style?: "primary" | "secondary";
}

export function Button({ theme, href, children, ...props }: ButtonProps) {
  let className = [];

  switch (props.style) {
    case "secondary":
      className = [
        `text-${theme.color}`,
        `bg-white`,
        `border-2`,
        `border-${theme.color}`,
        "text-sm",
        "font-bold",
        "transition-all",
        "rounded-full",
        `hover:bg-${theme.color}`,
        "hover:text-white",
        "px-6",
        "py-2",
      ];
      break;
    default:
      className = [
        "flex",
        "gap-2",
        "relative",
        "items-center",
        "justify-center",
        "text-white",
        `bg-${theme.color}`,
        `hover:bg-${theme.color}-light`,
        "transition",
        "py-6",
        "px-10",
        "rounded-full",
        "text-xl",
        "font-bold",
        `disabled:bg-${theme.color}-light`,
        `disabled:opacity-50`,
        "disabled:cursor-not-allowed",
        "cursor-pointer",
      ];
  }
  extendClassNames(props, className);

  if (href) {
    return (
      <Link href={href} className={className.join(" ")}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      type={props.type || "button"}
      className={className.join(" ")}
    >
      {children}
    </button>
  );
}
