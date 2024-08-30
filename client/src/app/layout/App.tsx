import { Box, ThemeProvider } from "@mui/material";
import Navbar from "../../components/Others/Bars/Navbar";
import { useMode } from "../theme/Colors";
import SideBar from "../../components/Others/Bars/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const theme = useMode();
  const [toggle, setToggle] = useState(false);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box sx={{ m: -1 }}>
          <Navbar setToggle={setToggle} />
          <SideBar toggle={toggle} setToggle={setToggle} />
          <Outlet />
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
