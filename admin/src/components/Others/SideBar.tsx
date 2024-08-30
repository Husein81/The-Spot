import {
  Category,
  Login,
  Logout,
  People,
  Sell,
  ShoppingCart,
  Speed,
} from "@mui/icons-material";
import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { token } from "../../app/theme/Colors";
import { logout } from "../../app/redux/slice/authSlice";
import { RootState } from "../../app/redux/store";
import LoginForm from "../User/LoginForm";
import { openModal } from "../../app/redux/slice/modalSlice";
import { useLogoutUserMutation } from "../../app/redux/slice/userApi";

type Item = {
  name: string;
  path: string;
  icon: JSX.Element;
  onClick?: () => void;
};
const SideBar = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const [logoutUser] = useLogoutUserMutation({});
  const navigate = useNavigate();

  const onUserHandler = async () => {
    if (user) {
      await logoutUser({});
      dispatch(logout());
    } else {
      dispatch(openModal(<LoginForm />));
    }
  };
  const menuItems: Item[] = [
    { name: "dashboard", path: "/dashboard", icon: <Speed /> },
    { name: "orders", path: "/orders", icon: <ShoppingCart /> },
    { name: "products", path: "/products", icon: <Sell /> },
    { name: "categories", path: "/categories", icon: <Category /> },
    { name: "users", path: "/users", icon: <People /> },
  ];
  const list = menuItems.map((item, index) => (
    <ListItem key={index} button onClick={() => navigate(item.path)}>
      <Box
        display={"flex"}
        gap={1}
        alignItems={"center"}
        py={1}
        textTransform={"capitalize"}
      >
        {item.icon}
        <Typography variant="h5" sx={{ color: colors.white[500] }}>
          {item.name}
        </Typography>
      </Box>
    </ListItem>
  ));
  return (
    <Box
      sx={{
        width: 140,
        height: "100vh",
        backgroundColor: colors.black[500],
        color: "white",
        m: -1,
        elevation: 4,
        p: 2,
      }}
    >
      <Typography variant="h3" sx={{ color: colors.white[500] }}>
        The Spot
      </Typography>
      <List>
        {list}
        <ListItem button onClick={onUserHandler}>
          <Box
            display={"flex"}
            gap={1}
            alignItems={"center"}
            py={1}
            textTransform={"capitalize"}
          >
            {user ? <Logout /> : <Login />}
            <Typography variant="h5" sx={{ color: colors.white[500] }}>
              {user ? "logout" : "login"}
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};
export default SideBar;
