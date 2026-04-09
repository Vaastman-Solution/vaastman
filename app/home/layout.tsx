import { Navbar1 } from "@/components/navbar"

export default function NavbarLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="mx-auto w-[90%]">
			<Navbar1 />
			{children}
		</div>
	)
}