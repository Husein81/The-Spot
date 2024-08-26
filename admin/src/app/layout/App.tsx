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


const App = () => {
  const location = useLocation();
  const [theme] = useMode();
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