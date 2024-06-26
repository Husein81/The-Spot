import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavBar from "../../components/OtherComponents/NavBar"
import Footer from "../../components/OtherComponents/Footer"


function App() {

  return (
    <Box>
      <NavBar/>
      <Container>
        <Outlet/>
      </Container>
      <Footer/>
    </Box>
  )
}

export default App
