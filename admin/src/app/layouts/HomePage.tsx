import { Box, Button, Typography, useTheme } from "@mui/material"
import { token } from "../../Theme";

const HomePage = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);

  return (
    <Box id="home" sx={{zIndex:100,display:'flex',flexDirection:'column',justifyContent:'center',color:'white', alignItems:'center'}} >
        <Typography variant="h4">The Spot</Typography>
        <Typography variant="h5">Welcome To My Dashboard</Typography>
        <Button variant="outlined" href="/dashboard" sx={{borderColor:colors.grey[900],color:colors.grey[900]}} >Login</Button>
    </Box>
  )
}
export default HomePage