import { Separator, Shad } from "@repo/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarHeader = () => {
  const path = usePathname();

  const segments = path
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
      };
    });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Shad.SidebarTrigger />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Shad.Breadcrumb>
          <Shad.BreadcrumbList>
            {segments.map((segment) => (
              <Shad.BreadcrumbItem key={segment.href}>
                <Link href={segment.href}>{segment.label}</Link>
              </Shad.BreadcrumbItem>
            ))}
          </Shad.BreadcrumbList>
        </Shad.Breadcrumb>
      </div>
    </header>
  );
};
export default SidebarHeader;
