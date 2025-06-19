import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PostData {
  title: string;
  description: string;
  pubDate: Date;
  image: {
    url: any;
    alt: string;
  };
  author: string;
  tags?: string[];
}

interface Post {
  slug: string;
  data: PostData;
}

interface Props {
  post: Post;
}

const EnhancedPostCard = ({ post }: Props) => {
  const { title, description, pubDate, image, author, tags } = post.data;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (description: string) => {
    const words = description.split(" ").length;
    const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute
    return `${readingTime} min read`;
  };

  return (
    <Card className="group h-full overflow-hidden border border-stone-200 bg-white transition-all duration-300 hover:border-stone-300 hover:shadow-lg">
      {/* Image Header */}
      <div className="relative overflow-hidden">
        <img
          src={image.url.src}
          alt={image.alt}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-stone-100 text-xs text-stone-700 transition-colors hover:bg-stone-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <CardTitle className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-stone-900 transition-colors group-hover:text-stone-700">
          {title}
        </CardTitle>

        {/* Description */}
        <p className="mb-4 line-clamp-3 flex-grow text-sm leading-relaxed text-stone-600">
          {description}
        </p>

        {/* Meta Information */}
        <div className="mb-4 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(pubDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{getReadingTime(description)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{author}</span>
          </div>
        </div>

        {/* Read More Button */}
        <a href={`/posts/${post.slug}`} className="block">
          <Button
            variant="outline"
            className="w-full transition-all duration-200 group-hover:border-stone-400 group-hover:bg-stone-50"
          >
            <span>Read Article</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default EnhancedPostCard;
