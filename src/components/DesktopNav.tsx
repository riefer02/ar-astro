import { navItems } from "@/lib/nav";

const DesktopNav = () => {
  return (
    <nav className="hidden items-center space-x-1 md:flex">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isExternal = item.href.startsWith("http");
        return (
          <a
            key={item.href}
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground/85 transition-all duration-200 hover:border-primary-foreground/10 hover:bg-primary-foreground/10 hover:text-primary-foreground"
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
