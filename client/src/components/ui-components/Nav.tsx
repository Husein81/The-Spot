import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Icon } from ".";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

const Nav = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <nav className="flex items-center justify-between shadow-md border-b p-4">
      <div className="">
        <h2 className="text-2xl font-bold">{t("welcome")}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Icon name="Search" />
        </Button>
        <Button variant="outline" size="icon">
          <Icon name="ShoppingCart" />
        </Button>
        <ModeToggle />
        {user ? (
          <div className="flex items-center gap-2">
            <Icon name="User" />
            <span>{user.name}</span>
          </div>
        ) : (
          <Button variant="outline" onClick={() => navigate({ to: "/login" })}>
            {t("login.button")}
          </Button>
        )}
      </div>
    </nav>
  );
};
export default Nav;
