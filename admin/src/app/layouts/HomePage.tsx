/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {

    const { userInfo } = useSelector((state: any) => state.auth);
    return (
      <Box className="home" sx={{display:'flex',flexDirection:'column',justifyContent:'center',color:'white', alignItems:'center'}} >
          <Typography variant="h4">The Spot</Typography>
          <Typography variant="h5">Welcome To My Dashboard</Typography>
          <Box sx={{border:1, borderRadius:1, px:2, py:1,m:1}}>
           {userInfo ? 
           <Link to={"/dashboard"}>Go to Dashboard</Link>
            :
            <Link to={"/login"}>Login</Link>}
          </Box>
      </Box>
    )
}
export default HomePage