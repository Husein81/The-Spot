import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavItems from "./NavItems";

const NavBar = () => {
  return (
    <nav className="shadow-md h-16 flex justify-between py-1 px-4">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="The spot"
          width={36}
          height={36}
          className="size-8"
        />
        <h2 className="flex gap-1 items-center font-bold">
          <span className="text-orange-400">The</span>
          <span>Spot</span>
        </h2>
      </Link>

      {/* search bar */}
      <SearchBar />

      {/* nav items */}
      <NavItems />
    </nav>
  );
};

export default NavBar;
