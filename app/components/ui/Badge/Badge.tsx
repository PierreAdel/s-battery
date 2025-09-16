import * as React from "react";

import { cn } from "@/utils/helpers";

import { type BadgeVariantProps, badgeVariants } from "./BadgeVariants";

import { Slot } from "@radix-ui/react-slot";

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & BadgeVariantProps & { asChild?: boolean }) {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
