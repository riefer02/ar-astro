import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeadingSize = "md" | "lg" | "xl";

const sizeClasses: Record<HeadingSize, string> = {
  md: "md:text-4xl",
  lg: "md:text-5xl",
  xl: "md:text-6xl",
};

interface SectionHeaderProps {
  kicker?: string;
  title: ReactNode;
  /** Optional trailing text rendered as grounded-gradient-text inside the heading. */
  highlight?: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2";
  size?: HeadingSize;
  className?: string;
}

const SectionHeader = ({
  kicker,
  title,
  highlight,
  description,
  as: Tag = "h2",
  size = "lg",
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("text-center", className)}>
      {kicker && (
        <Badge
          variant="outline"
          className="grounded-kicker mb-4 px-3 py-1 text-muted-foreground"
        >
          {kicker}
        </Badge>
      )}
      <Tag
        className={cn(
          "grounded-section-heading mb-6 text-3xl font-bold tracking-tight text-foreground",
          sizeClasses[size]
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="grounded-gradient-text">{highlight}</span>
          </>
        )}
      </Tag>
      {description && (
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
