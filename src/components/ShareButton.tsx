import { Button } from "./ui/button";
import { toast } from "../hooks/use-toast";
import React from "react";

export default function ShareButton({ url }: { url: string }) {
  return (
    <Button
      className="bg-stone-800 text-white transition-colors hover:bg-stone-900"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Blog link copied!",
          description: "You can now share this article.",
        });
      }}
    >
      Share Article
    </Button>
  );
}
