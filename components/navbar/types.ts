import type React from "react";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

interface NavbarAuth {
  signin: {
    title: string;
    url: string;
  };
}

interface Navbar1Props {
  logo?: NavbarLogo;
  menu?: MenuItem[];
  auth?: NavbarAuth;
}

interface SessionData {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export type { MenuItem, Navbar1Props, NavbarAuth, NavbarLogo, SessionData };
