import { Box, Container, ThemeProvider } from "@mui/material"
import SideBar from "../../components/Others/SideBar"
import { Outlet, useLocation } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ModalContainer from "../../components/Modal/ModalContainer";
import Home from "./Home";
import { useMode } from "../theme/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const App = () => {
  const location = useLocation();
  const [theme] = useMode();

  const { user} = useSelector((state:RootState) => state.auth);
  console.log(user);
  return (
    <Box>
      <ThemeProvider theme={theme}>

      <ModalContainer/>
      {location.pathname === '/' ? <Home/> : 
      <Box display={'flex'}>
        <SideBar/>
        <Container>
          <Outlet/>
        </Container>
      </Box>
      }
      </ThemeProvider>
    </Box>
  )
}
export default App