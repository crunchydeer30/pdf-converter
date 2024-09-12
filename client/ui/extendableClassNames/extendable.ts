export interface ExtendableClassNames {
  className?: string;
}

export function extendClassNames(
  props: ExtendableClassNames,
  className: string[]
) {
  if (props.className) {
    className.push(props.className);
  }
}
