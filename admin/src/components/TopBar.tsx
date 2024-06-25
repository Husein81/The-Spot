/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Box, IconButton, InputBase, Toolbar, useTheme } from "@mui/material"
import { ColorModeContext, token } from "../Theme";
import { DarkModeOutlined, LightModeOutlined, NotificationsActiveOutlined, Search } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

const TopBar = () => {
    const theme = useTheme();
    const colors =  token(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { userInfo } = useSelector((state: any) => state.auth);

    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }
    const Icons = (
        <Box color={colors.primary[100]} display={'flex'} alignItems={'center'} gap={.5} >
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? 
            (
                <DarkModeOutlined  />
            ) : (
                <LightModeOutlined />
            )}
        </IconButton>
        <IconButton >
            <NotificationsActiveOutlined/>
        </IconButton>
        <IconButton >
            <img src={userInfo.avatar} alt={userInfo.username} style={{borderRadius:'50%',width:'24px', height:"24px" }}/>
        </IconButton>
        </Box>
    )
  return (
    <AppBar position="static" sx={{bgcolor:colors.primary[400],mt:-2}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
         <Box 
            display={'flex'}
            bgcolor={colors.primary[500]}
            borderRadius={'3px'}
            width={'fit-content'}
            my={1}>
                  <InputBase
                  sx={{bgcolor:colors.primary[500], color:'white',mx:2, flex:1}}
                  placeholder="Search"
                  name="searchTerm"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  />
                  <IconButton sx={{borderRadius:1, p:1, color:colors.greenAccent[500]}}>
                    <Search/>
                  </IconButton>
              </Box>
          {Icons}
        </Toolbar>
    </AppBar>
  )
}
export default TopBar