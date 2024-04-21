import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import {  
  Box,
  Container,
  CssBaseline, 
} from "@mui/material";

function App() {

  return (
    <>
      <CssBaseline/>
      <Box  sx={{ display:{sm: 'flex' }}}> {/* Disable container max-width */}
            <Sidebar />
            <Container sx={{mt:3}}>
              <Outlet />
            </Container>
      </Box>
    </>
  )
}

export default App;
