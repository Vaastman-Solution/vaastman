"use client"
import { LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { RoleBadge, type Role } from "./role-badge"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import React from "react"
import { ModeToggle } from "@/components/mode-toggle"

interface MenuItem {
	title: string
	url: string
	description?: string
	icon?: React.ReactNode
	items?: MenuItem[]
}

interface Navbar1Props {
	logo?: {
		url: string
		src: string
		alt: string
		title: string
	}
	menu?: MenuItem[]
	auth?: {
		signin: {
			title: string
			url: string
		}
	}
}

const Navbar1 = ({
	logo = {
		url: "https://www.vaastman.com/",
		src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
		alt: "logo",
		title: "Vaastman",
	},
	menu = [
		{ title: "Candidate Registration", url: "/add/candidate" },
		// {
		//   title: "Products",
		//   url: "#",
		//   items: [
		//     {
		//       title: "Blog",
		//       description: "The latest industry news, updates, and info",
		//       icon: <Book className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//     {
		//       title: "Company",
		//       description: "Our mission is to innovate and empower the world",
		//       icon: <Trees className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//     {
		//       title: "Careers",
		//       description: "Browse job listing and discover our workspace",
		//       icon: <Sunset className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//     {
		//       title: "Support",
		//       description:
		//         "Get in touch with our support team or visit our community forums",
		//       icon: <Zap className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//   ],
		// },
		// {
		//   title: "Resources",
		//   url: "#",
		//   items: [
		//     {
		//       title: "Help Center",
		//       description: "Get all the answers you need right here",
		//       icon: <Zap className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//     {
		//       title: "Contact Us",
		//       description: "We are here to help you with any questions you have",
		//       icon: <Sunset className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//     {
		//       title: "Status",
		//       description: "Check the current status of our services and APIs",
		//       icon: <Trees className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//     {
		//       title: "Terms of Service",
		//       description: "Our terms and conditions for using our services",
		//       icon: <Book className="size-5 shrink-0" />,
		//       url: "#",
		//     },
		//   ],
		// },
		// {
		// 	title: "New Staff",
		// 	url: "/staff",
		// },
		// {
		//   title: "Blog",
		//   url: "#",
		// },
	],
	auth = {
		signin: { title: "Sign In", url: "/signin" },
	},
}: Navbar1Props) => {
	// const { data: session } = authClient.useSession()

	// const handleLogout = async () => {
	// 	await authClient.signOut({
	// 		fetchOptions: {
	// 			onSuccess: () => {
	// 				window.location.href = "/signin"
	// 			},
	// 		},
	// 	})
	// }

	// const getInitials = (name?: string) => {
	// 	if (!name) {
	// 		return "U"
	// 	}
	// 	return name
	// 		.split(" ")
	// 		.map((n) => n[0])
	// 		.join("")
	// 		.toUpperCase()
	// 		.slice(0, 2)
	// }

	return (
		<section className="mx-auto w-[90%] py-4">
			<div className="container">
				{/* Desktop Menu */}
				<nav className="hidden items-center lg:flex">
					<div className="flex-1">
						{/* Logo */}
						<a href={logo.url} className="flex items-center gap-2">
							<img
								src={logo.src}
								className="max-h-8 dark:invert"
								alt={logo.alt}
							/>
							<span className="text-lg font-semibold tracking-tighter">
								{logo.title}
							</span>
						</a>
					</div>

					<div className="flex-none">
						<NavigationMenu>
							<NavigationMenuList className="gap-3">
								{menu.map((item) => renderMenuItem(item))}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="flex flex-1 items-center justify-end gap-2">
						<ModeToggle />
						{/* {session && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-10 w-10 rounded-full"
									>
										<Avatar className="h-10 w-10">
											<AvatarImage
												src={session.user.image || ""}
												alt={session.user.name || "User"}
											/>
											<AvatarFallback>
												{getInitials(session.user.name)}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuLabel className="font-normal">
										<div className="flex flex-col space-y-1">
											<p className="text-sm leading-none font-medium">
												{session.user.name}
											</p>
											<p className="text-muted-foreground text-xs leading-none">
												{session.user.email}
											</p>
										</div>
									</DropdownMenuLabel>
									{session.user.role && (
										<>
											<DropdownMenuSeparator />
											<div className="px-2 py-1.5">
												<RoleBadge
													role={session.user.role}
													size="sm"
													className="w-full justify-center"
												/>
											</div>
										</>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem
										variant="destructive"
										onClick={handleLogout}
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)} */}
					</div>
				</nav>

				{/* Mobile Menu */}
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<a href={logo.url} className="flex items-center gap-2">
							<img
								src={logo.src}
								className="max-h-8 dark:invert"
								alt={logo.alt}
							/>
						</a>
						<div className="flex items-center gap-2">
							<ModeToggle />
							{/* {session && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="relative h-8 w-8 rounded-full"
										>
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={session.user.image || ""}
													alt={session.user.name || "User"}
												/>
												<AvatarFallback>
													{getInitials(session.user.name)}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56" align="end" forceMount>
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col space-y-1">
												<p className="text-sm leading-none font-medium">
													{session.user.name}
												</p>
												<p className="text-muted-foreground text-xs leading-none">
													{session.user.email}
												</p>
											</div>
										</DropdownMenuLabel>
										{session.user.role && (
											<>
												<DropdownMenuSeparator />
												<div className="px-2 py-1.5">
													<div className="flex flex-col">
														<span className="text-sm font-medium">
															{session.user.name || session.user.email}
														</span>
														<RoleBadge
															role={session.user.name}
															size="sm"
															className="mt-1"
														/>
													</div>
												</div>
											</>
										)}
										<DropdownMenuSeparator />
										<DropdownMenuItem
											variant="destructive"
											onClick={handleLogout}
										>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Log out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)} */}
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" size="icon">
										<Menu className="size-4" />
									</Button>
								</SheetTrigger>
								<SheetContent className="overflow-y-auto">
									<SheetHeader>
										<SheetTitle>
											<a href={logo.url} className="flex items-center gap-2">
												<img
													src={logo.src}
													className="max-h-8 dark:invert"
													alt={logo.alt}
												/>
											</a>
										</SheetTitle>
									</SheetHeader>
									<div className="flex flex-col gap-6 p-4">
										<Accordion
											type="single"
											collapsible
											className="flex w-full flex-col gap-4"
										>
											{menu.map((item) => renderMobileMenuItem(item))}
										</Accordion>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const isInternalUrl = (url: string) => url.startsWith("/")

const renderMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<NavigationMenuItem key={item.title}>
				<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
				<NavigationMenuContent className="bg-popover text-popover-foreground">
					{item.items.map((subItem) => (
						<NavigationMenuLink asChild key={subItem.title} className="w-80">
							<SubMenuLink item={subItem} />
						</NavigationMenuLink>
					))}
				</NavigationMenuContent>
			</NavigationMenuItem>
		)
	}

	return (
		<NavigationMenuItem key={item.title}>
			<NavigationMenuLink
				asChild
				className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
			>
				{isInternalUrl(item.url) ? (
					<Link href={item.url}>{item.title}</Link>
				) : (
					<a href={item.url}>{item.title}</a>
				)}
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}

const renderMobileMenuItem = (item: MenuItem) => {
	if (item.items) {
		return (
			<AccordionItem key={item.title} value={item.title} className="border-b-0">
				<AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
					{item.title}
				</AccordionTrigger>
				<AccordionContent className="mt-2">
					{item.items.map((subItem) => (
						<SubMenuLink key={subItem.title} item={subItem} />
					))}
				</AccordionContent>
			</AccordionItem>
		)
	}

	return (
		<Link key={item.title} href={item.url} className="text-md font-semibold">
			{item.title}
		</Link>
	)
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
	return (
		isInternalUrl(item.url) ? (
			<Link
				className="hover:bg-muted hover:text-accent-foreground flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
				href={item.url}
			>
				<div className="text-foreground">{item.icon}</div>
				<div>
					<div className="text-sm font-semibold">{item.title}</div>
					{item.description && (
						<p className="text-muted-foreground text-sm leading-snug">
							{item.description}
						</p>
					)}
				</div>
			</Link>
		) : (
			<a
				className="hover:bg-muted hover:text-accent-foreground flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
				href={item.url}
			>
				<div className="text-foreground">{item.icon}</div>
				<div>
					<div className="text-sm font-semibold">{item.title}</div>
					{item.description && (
						<p className="text-muted-foreground text-sm leading-snug">
							{item.description}
						</p>
					)}
				</div>
			</a>
		)
	)
}

export { Navbar1 }
