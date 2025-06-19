import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, BookOpen } from "lucide-react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/posts", label: "Blog Posts", icon: BookOpen },
  ];

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-stone-100 hover:bg-stone-500/20 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 border-stone-200 bg-stone-50">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 py-4">
            <h2 className="text-lg font-semibold text-stone-900">Navigation</h2>
          </div>
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleItemClick}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-700 transition-colors duration-200 hover:bg-stone-100 hover:text-stone-900"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
          <div className="border-t border-stone-200 pt-4">
            <p className="text-center text-sm text-stone-500">
              © 2025 Andrew Riefenstahl
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
