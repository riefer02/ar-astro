import { Button } from "./ui/button";
import { toast } from "../hooks/use-toast";

export default function ShareButton({ url }: { url: string }) {
  return (
    <Button
      className="bg-stone-800 text-white transition-colors hover:bg-stone-900"
      onClick={async () => {
        if (!navigator?.clipboard?.writeText) {
          toast({
            title: "Copy unavailable",
            description: "Your browser doesn't allow clipboard access here.",
          });
          return;
        }

        try {
          await navigator.clipboard.writeText(url);
          toast({
            title: "Blog link copied!",
            description: "You can now share this article.",
          });
        } catch (error) {
          toast({
            title: "Copy failed",
            description: "Please copy the URL manually.",
          });
        }
      }}
    >
      Share Article
    </Button>
  );
}
