import { cn } from "@/lib/utils"
import { IconCrown, IconUserCog, IconUserStar } from "@tabler/icons-react"
import React from "react"

export type Role = "ADMIN" | "STAFF" | "SUPERADMIN" | string

interface RoleBadgeProps {
	role: Role
	className?: string
	size?: "sm" | "default"
}

export function RoleBadge({
	role,
	className,
	size = "default",
}: RoleBadgeProps) {
	const roleConfig = (
		{
			ADMIN: {
				label: "Admin",
				icon: <IconUserCog className="text-primary" />,
			},
			STAFF: {
				label: "Staff",
				icon: <IconUserStar className="text-primary" />,
			},
			SUPERADMIN: {
				label: "Super Admin",
				icon: <IconCrown className="text-primary" />,
			},
		} as const
	)[role] || {
		label: role || "Unknown",
		icon: <IconUserStar className="text-muted-foreground" />,
	}

	const sizeClasses = size === "sm"
		? "text-xs gap-1.5"
		: "text-sm gap-2"

	return (
		<div
			className={cn(
				"inline-flex items-center justify-start text-foreground w-full",
				sizeClasses,
				className,
			)}
		>
			{React.cloneElement(roleConfig.icon, {
				className: cn(
					roleConfig.icon.props.className,
					"shrink-0",
					size === "sm" ? "size-3.5" : "size-4"
				),
				stroke: 2,
			})}
			<span className="capitalize text-sm text-left w-full">{roleConfig.label}</span>
		</div>
	)
}