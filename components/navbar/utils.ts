import { Role } from "@/lib/generated/prisma/enums";
import type { MenuItem } from "./types";

const isInternalUrl = (url: string) => url.startsWith("/");

const getInitials = (name?: string | null, email?: string | null) => {
  const source = name?.trim() || email?.trim();

  if (!source) {
    return "U";
  }

  return source
    .split(" ")
    .filter(Boolean)
    .map((value) => value[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getMenuItems = (
  menu: MenuItem[],
  signinUrl: string,
  role?: string | null,
) => {
  const baseMenuItems = role
    ? menu.filter((item) => item.url !== signinUrl)
    : menu;

  if (
    role === Role.ADMIN &&
    !baseMenuItems.some((item) => item.url === "/dashboard")
  ) {
    return [...baseMenuItems, { title: "Dashboard", url: "/dashboard" }];
  }

  return baseMenuItems;
};

export { getInitials, getMenuItems, isInternalUrl };
