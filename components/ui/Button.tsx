import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
