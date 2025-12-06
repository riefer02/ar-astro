import { Home, BookOpen } from "lucide-react";

const DesktopNav = () => {
  const menuItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/posts", label: "Blog Posts", icon: BookOpen },
  ];

  return (
    <nav className="hidden items-center space-x-1 md:flex">
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-stone-100 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <IconComponent className="h-4 w-4" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
