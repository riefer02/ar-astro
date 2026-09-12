import { Home, BookOpen, Briefcase, Mail } from "lucide-react";

export const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "https://riefproductions.com/", label: "Services", icon: Briefcase },
  { href: "/posts/", label: "Writing", icon: BookOpen },
  { href: "/#connect", label: "Contact", icon: Mail },
] as const;
