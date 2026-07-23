import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-ring/30 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-[0_18px_45px_-18px_var(--shadow-primary)] hover:-translate-y-0.5 hover:bg-primary/95",
        glass: "border border-white/60 bg-white/62 text-foreground shadow-[0_16px_40px_-28px_var(--shadow-ink)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/78",
      },
      size: {
        default: "h-12 rounded-xl px-5",
        hero: "h-[4.75rem] rounded-[1.4rem] px-5 text-base",
        tile: "h-28 rounded-[1.35rem] p-4",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
