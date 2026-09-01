import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const groundedVariants = {
  primary:
    "grounded-button-primary h-12 rounded-full px-8 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5",
  outline:
    "grounded-button-outline h-12 rounded-full px-8 text-base text-foreground transition-all hover:-translate-y-0.5 hover:text-foreground",
} as const;

interface GroundedButtonProps extends Omit<ComponentProps<typeof Button>, "variant"> {
  variant?: keyof typeof groundedVariants;
}

const GroundedButton = ({
  variant = "primary",
  className,
  ...props
}: GroundedButtonProps) => (
  <Button
    asChild
    size="lg"
    variant={variant === "outline" ? "outline" : "default"}
    className={cn(groundedVariants[variant], className)}
    {...props}
  />
);

export default GroundedButton;
