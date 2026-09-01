import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeClasses = {
  md: "h-12 w-12 rounded-lg",
  lg: "h-14 w-14 rounded-lg",
  xl: "h-16 w-16 rounded-xl",
} as const;

const iconSizeClasses = {
  md: "h-6 w-6",
  lg: "h-7 w-7",
  xl: "h-8 w-8",
} as const;

interface IconChipProps {
  icon: LucideIcon;
  size?: keyof typeof sizeClasses;
  /** Adds the group-hover invert effect. Requires a `group` ancestor. */
  hover?: boolean;
  className?: string;
  iconClassName?: string;
}

const IconChip = ({
  icon: Icon,
  size = "md",
  hover = true,
  className,
  iconClassName,
}: IconChipProps) => (
  <div
    aria-hidden="true"
    className={cn(
      "grounded-icon inline-flex items-center justify-center rounded-lg transition-colors duration-300",
      sizeClasses[size],
      hover && "text-foreground group-hover:bg-foreground group-hover:text-background",
      className
    )}
  >
    <Icon className={cn(iconSizeClasses[size], iconClassName)} />
  </div>
);

export default IconChip;
