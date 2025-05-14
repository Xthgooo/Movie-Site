import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-[6px] flex gap-2 items-center font-medium text-[14px] transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-white bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:underline",
        link: "text-primary underline-offset-4 hover:underline",
        // New toggle variant: we leave the base empty because the styles come from our compound variants.
        toggle: "border bg-white text-black",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "w-[8px] h-[4px]",
        none: "",
      },
      isToggled: {
        true: "bg-black text-white",
      },
    },
    compoundVariants: [
      {
        variant: "toggle",
        isToggled: true,
        className: "bg-black text-white",
      },
      {
        variant: "toggle",
        isToggled: false,
        className: "bg-white text-black",
      },
    ],
    defaultVariants: {
      variant: "outline",
      size: "default",
      isToggled: false,
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isToggled?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  handleClick,
  isToggled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size, isToggled, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
