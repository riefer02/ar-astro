import { cn } from "@/lib/utils";

interface HairlineProps {
  className?: string;
}

const Hairline = ({ className }: HairlineProps) => (
  <div
    aria-hidden="true"
    className={cn(
      "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glint/50 to-transparent",
      className
    )}
  />
);

export default Hairline;
