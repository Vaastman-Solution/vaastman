import Link from "next/link";
import type { NavbarLogo } from "./types";

interface NavbarLogoLinkProps {
  logo: NavbarLogo;
  showTitle?: boolean;
}

function NavbarLogoLink({ logo, showTitle = true }: NavbarLogoLinkProps) {
  return (
    <Link href={logo.url} className="flex items-center gap-2">
      <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
      {showTitle ? (
        <span className="text-lg font-semibold tracking-tighter">
          {logo.title}
        </span>
      ) : null}
    </Link>
  );
}

export { NavbarLogoLink };
