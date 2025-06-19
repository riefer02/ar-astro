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
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-stone-100 transition-colors duration-200 hover:bg-stone-500/20"
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
