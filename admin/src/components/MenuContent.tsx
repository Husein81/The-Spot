import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  MessageCircleMore,
  ChartBarStacked,
  LogIn,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";

type Item = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const MenuContent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems: Item[] = [
    { href: "Home", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "products", label: "Products", icon: <Store /> },
    { href: "orders", label: "Orders", icon: <ShoppingBag /> },
    { href: "categories", label: "Categories", icon: <ChartBarStacked /> },
    { href: "chat", label: "Chats", icon: <MessageCircleMore /> },
  ];

  const navigationHandler = (href: string) => {
    navigate(href);
  };

  const list = menuItems.map((item) => (
    <li
      className="flex gap-4 text-gray-600 p-2 hover:bg-gray-100 hover:w-4/5 cursor-pointer"
      key={item.href}
      onClick={() => navigationHandler(item.href)}
    >
      <span>{item.icon}</span>
      <p>{item.label}</p>
    </li>
  ));

  return (
    <div className="flex flex-col flex-grow px-4 pt-2 justify-between">
      <ul>{list}</ul>
      <ul className="mb-4">
        {user ? (
          <li className="flex gap-4 text-gray-600 p-2 hover:bg-gray-100  cursor-pointer">
            <LogOut />
            <p>logout</p>
          </li>
        ) : (
          <li className="flex gap-4 text-gray-600 p-2 hover:bg-gray-100 cursor-pointer">
            <LogIn />
            <p>login</p>
          </li>
        )}
      </ul>
    </div>
  );
};
export default MenuContent;
