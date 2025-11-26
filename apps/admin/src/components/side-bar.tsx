import { Icon, Shad } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  const items: { url: string; title: string; icon: string }[] = [
    { url: "/", title: "Dashboard", icon: "House" },
    { url: "/products", title: "Products", icon: "Box" },
    { url: "/orders", title: "Orders", icon: "Receipt" },
    { url: "/customers", title: "Customers", icon: "Users" },
  ];
  return (
    <Shad.Sidebar>
      <Shad.SidebarHeader>
        <div className="flex gap-2 items-center px-4 py-3">
          <Image src="/logo.png" alt="Logo" width={28} height={28} />
          <h2 className="text-xl font-medium">Admin Panel</h2>
        </div>
      </Shad.SidebarHeader>
      <Shad.SidebarContent>
        <Shad.SidebarMenu className="space-y-2">
          {items.map((item) => (
            <Shad.SidebarMenuItem key={item.title}>
              <Shad.SidebarMenuButton asChild>
                <Link href={item.url} className="flex items-center">
                  <Icon className="mx-2 text-base" name={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Shad.SidebarMenuButton>
            </Shad.SidebarMenuItem>
          ))}
        </Shad.SidebarMenu>
      </Shad.SidebarContent>
    </Shad.Sidebar>
  );
};
export default SideBar;
