import { Sell, Store } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { token } from "../../../app/theme/Colors";
import { useNavigate } from "react-router-dom";

type Item = {
  name: string;
  icon: JSX.Element;
  link: string;
};

type Props = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar: FC<Props> = ({ toggle, setToggle }) => {
  const colors = token();
  const navigate = useNavigate();
  const toggleHandler = () => {
    setToggle(!toggle);
  };
  const menuItems: Item[] = [
    { name: "Home", icon: <Store />, link: "/" },
    { name: "products", icon: <Sell />, link: "/products" },
  ];
  const navigateHandler = (link: string) => {
    navigate(link);
    setToggle(false);
  };
  const list = menuItems.map((item, index) => (
    <ListItem
      key={index}
      disablePadding
      sx={{
        color: colors.secondary[500],
        textTransform: "capitalize",
        fontFamily: "Roboto",
      }}
    >
      <ListItemButton
        sx={{ gap: 1 }}
        onClick={() => navigateHandler(item.link)}
      >
        {item.icon}
        {item.name}
      </ListItemButton>
    </ListItem>
  ));
  return (
    <Drawer
      open={toggle}
      onClose={toggleHandler}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          bgcolor: "#2e2e2e",
          boxSizing: "border-box",
        },
      }}
    >
      <Box mx={"auto"} pt={2}>
        <Typography variant="h6" color={colors.secondary[500]}>
          The Spot
        </Typography>
      </Box>
      <List>{list}</List>
    </Drawer>
  );
};
export default SideBar;
