import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/nav";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-80 border-border bg-background shadow-[0_24px_70px_-40px_hsl(var(--depth-shadow)/1)]"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border py-4">
            <h2 className="text-lg font-semibold text-foreground">
              Navigation
            </h2>
          </div>
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className="flex items-center gap-3 rounded-lg border border-transparent px-4 py-3 text-foreground transition-colors duration-200 hover:border-border/70 hover:bg-secondary/75 hover:text-foreground"
                  >
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
          <div className="border-t border-border pt-4">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Andrew Riefenstahl
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
