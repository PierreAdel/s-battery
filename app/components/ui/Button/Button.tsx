import * as React from "react";

import { cn } from "@/utils/helpers";

import { type ButtonVariantProps, buttonVariants } from "./ButtonVariants";

import { Slot } from "@radix-ui/react-slot";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean;
  }) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
