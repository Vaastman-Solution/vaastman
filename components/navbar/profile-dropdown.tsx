"use client";

import {
  IconLayoutDashboardFilled,
  IconLogout2,
  IconMailFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { RoleBadge } from "@/components/role-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@/lib/generated/prisma/enums";
import type { SessionData } from "./types";

interface ProfileDropdownProps {
  compact?: boolean;
  session: SessionData;
  isLoggingOut: boolean;
  label: string;
  onLogout: () => void;
  getInitials: (name?: string | null, email?: string | null) => string;
}

function ProfileDropdown({
  compact = false,
  session,
  isLoggingOut,
  label,
  onLogout,
  getInitials,
}: ProfileDropdownProps) {
  const name = session.user.name || "Unnamed User";
  const email = session.user.email || "No email";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={compact ? "gap-2 px-2.5" : "gap-3 px-3"}
        >
          <Avatar size={compact ? "sm" : "default"}>
            <AvatarImage src={session.user.image || ""} alt={name} />
            <AvatarFallback>
              {getInitials(session.user.name, session.user.email)}
            </AvatarFallback>
          </Avatar>
          {!compact ? <span className="max-w-32 truncate">{label}</span> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="px-3 py-3 text-foreground">
          <div className="flex items-start gap-3">
            <Avatar size="lg">
              <AvatarImage src={session.user.image || ""} alt={name} />
              <AvatarFallback>
                {getInitials(session.user.name, session.user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 space-y-1">
              <p className="truncate text-sm font-semibold">{name}</p>
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <IconMailFilled className="size-5" />
                <span className="truncate">{email}</span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session.user.role ? (
          <>
            <div className="px-3 py-2">
              <p className="mb-1 text-xs text-muted-foreground">Role</p>
              <RoleBadge role={session.user.role} size="sm" />
            </div>
            <DropdownMenuSeparator />
          </>
        ) : null}
        {session.user.role === Role.ADMIN ? (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <IconLayoutDashboardFilled className="size-5" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          variant="destructive"
          disabled={isLoggingOut}
          onClick={onLogout}
        >
          <IconLogout2 className="size-5" />
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileDropdown };
