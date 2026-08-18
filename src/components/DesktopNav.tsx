import { Home, BookOpen, Briefcase } from "lucide-react";

const DesktopNav = () => {
  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services/", label: "Services", icon: Briefcase },
    { href: "/posts/", label: "Blog Posts", icon: BookOpen },
  ];

  return (
    <nav className="hidden items-center space-x-1 md:flex">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.href}
            href={item.href}
            className="text-primary-foreground/86 hover:border-primary-foreground/12 hover:bg-primary-foreground/8 flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-white hover:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.08)]"
          >
            <IconComponent className="h-4 w-4" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
