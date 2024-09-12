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
}

export function Button({ theme, href, children, ...props }: ButtonProps) {
  const className = [
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
