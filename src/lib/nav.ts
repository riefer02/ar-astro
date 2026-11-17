import { Home, BookOpen, Mail } from "lucide-react";

export const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/posts/", label: "Writing", icon: BookOpen },
  { href: "/contact/", label: "Contact", icon: Mail },
] as const;
