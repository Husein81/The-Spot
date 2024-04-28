import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import {  
  Box,
  Container,
  CssBaseline,
  ThemeProvider, 
} from "@mui/material";
import { ColorModeContext, useMode } from "../../Theme";
import HomePage from "./HomePage";

function App() {
  const [theme, colorMode] = useMode()
  return (
    <>
    {location.pathname === "/" ? <HomePage/> : (
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
    )}
    </>
  )
}

export default App;
