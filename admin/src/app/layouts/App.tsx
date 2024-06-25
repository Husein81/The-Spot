import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../../components/Sidebar";
import {  
  Box,
  Container,
  CssBaseline,
  ThemeProvider, 
} from "@mui/material";
import { ColorModeContext, useMode } from "../../Theme";
import HomePage from "./HomePage";
import LoginForm from "../../components/User/LoginForm";
import RegisterForm from "../../components/User/RegisterForm";


function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
 

  if (location.pathname === '/') {
    return <HomePage />;
  } else if (location.pathname === '/login') {
    return <LoginForm />;
  } else if (location.pathname === '/register') {
    return <RegisterForm />;
  } 

   return (
     <>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Box sx={{ display:{sm: 'flex' }}}> {/* Disable container max-width */}
            <Sidebar />
            <Container disableGutters maxWidth={false} sx={{mt:3}}>
              <Outlet />
            </Container>
          </Box>
          </ThemeProvider>
      </ColorModeContext.Provider>
      </>
    )
}  
export default App;
