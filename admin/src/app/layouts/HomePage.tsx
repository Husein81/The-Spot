/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography, useTheme } from "@mui/material"
import { token } from "../../Theme";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const navigate = useNavigate();
    const { userInfo} = useSelector((state: any) => state.auth);
    console.log(userInfo)
    const handleNavigation = () => {
      if(userInfo){
        navigate("/dashboard");
      }
      navigate('/login')
    }
  return (
    <Box className="home" sx={{display:'flex',flexDirection:'column',justifyContent:'center',color:'white', alignItems:'center'}} >
        <Typography variant="h4">The Spot</Typography>
        <Typography variant="h5">Welcome To My Dashboard</Typography>
        <Button variant="outlined"onClick={handleNavigation} sx={{borderColor:colors.grey[900],color:colors.grey[900]}} >Login</Button>
    </Box>
  )
}
export default HomePage