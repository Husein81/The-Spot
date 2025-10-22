import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary grid rounded-md grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
      {/* Col 1 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
            className="size-8 object-cover"
          />
          <h2 className="text-sm text-white font-semibold">
            <span className="text-orange-400">The</span> Spot
          </h2>
        </div>
        <span className="pl-4 text-sm text-gray-200">
          &copy; {year} The Spot
        </span>
        <span className="pl-4 text-sm text-gray-200">All rights reserved</span>
      </div>

      {/* Col 2 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-semibold">Links</h3>
        <ul className="flex flex-col gap-4 text-gray-200 text-sm">
          <li>Home</li>
          <li>Contact</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      {/* Col 3 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-semibold">Links</h3>
        <ul className="flex flex-col gap-4 text-gray-200 text-sm">
          <li>All Products</li>
          <li>Contact</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      {/* Col 4 */}
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-semibold">Links</h3>
        <ul className="flex flex-col gap-4 text-gray-200 text-sm">
          <li>About us</li>
          <li>Contact</li>
          <li>Blog</li>
          <li>Affiliate Progress</li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
