import { Breadcrumbs } from "@mui/material";
import SearchInput from "./SearchInput";
import { useLocation } from "react-router-dom";
import MenuButton from "./MenuButton";
import { Button } from "./ui/button";
import { Bell, Calendar, ChevronRight, Menu } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  return (
    <div className="w-full sm:flex  justify-between pt-2 sm:items-center items-start max-w-screen-2xl">
      <Breadcrumbs separator={<ChevronRight fontSize="small" />}>
        <h2>Dashboard</h2>
        <h2 className="capitalize">
          {location.pathname === "/" ? "" : pathName}
        </h2>
      </Breadcrumbs>
      <div className="sm:hidden flex">
        <Menu />
      </div>
      <div className="gap-4 flex flex-row text-gray-500">
        <SearchInput />
        <Button variant="outline" className="h-10">
          <Calendar />
          {new Date().toLocaleDateString("en-US", {
            year: "numeric" as const,
            month: "long" as const,
            day: "numeric" as const,
          })}
        </Button>
        <MenuButton
          showBadge
          sx={{
            border: 1,
            borderRadius: 2,
            borderColor: "#e1e1e1",
            elevation: 3,
          }}
        >
          <Bell />
        </MenuButton>
      </div>
    </div>
  );
};
export default Header;
