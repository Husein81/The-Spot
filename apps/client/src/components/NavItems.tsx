import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Icon } from "@repo/ui";
import Link from "next/link";
import ProfileButton from "./ProfileButton";

type NavItem = {
  href?: string;
  icon: string;
};

const NavItems = () => {
  const navItems: NavItem[] = [
    {
      href: "/",
      icon: "House",
    },
    {
      icon: "Bell",
    },
    {
      icon: "ShoppingCart",
    },
  ];
  return (
    <ul className="flex items-center gap-6">
      {navItems.map(({ href, icon }) => (
        <li key={icon}>
          {href ? (
            <Link href={href} className="flex items-center gap-2">
              <Icon name={icon} className={"size-5 text-gray-600"} />
            </Link>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer">
              <Icon name={icon} className={"size-5 text-gray-600"} />
            </div>
          )}
        </li>
      ))}
      <li>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ProfileButton />
        </SignedIn>
      </li>
    </ul>
  );
};

export default NavItems;
