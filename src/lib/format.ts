export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateShort = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const getReadingTime = (content: unknown): string => {
  if (typeof content !== "string") {
    return "5 min read";
  }
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-]/g, "")
    .replace(/\s+/g, " ");
  const words = plain.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);
  return `${Math.max(readingTime, 1)} min read`;
};
