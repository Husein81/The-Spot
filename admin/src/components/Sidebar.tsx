/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Box,   
    Drawer,   
    IconButton, 
    List, 
    ListItem, 
    ListItemText,
    Typography,
    useTheme, 
    
} from "@mui/material";
import { 
    AccountCircle, 
    AddShoppingCart, 
    Category, 
    DarkModeOutlined, 
    Home, 
    LightModeOutlined, 
    Logout, 
    ShoppingCart 
} from "@mui/icons-material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import { ColorModeContext, token } from "../Theme";
import { useLogoutApiCallMutation } from "../app/redux/slices/userApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/redux/slices/authSlice";
interface Item{
    name: string,
    path?: string,
    icon?: React.ComponentType<any>,
    onClick?: () => void
}

const Sidebar = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const { userInfo} = useSelector((state: any) => state.auth);

    const [logoutApiCall] = useLogoutApiCallMutation();

    const handleLogout = async () =>{
        
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/")
        }catch(error){
            console.log(error);
        }
    }
    const dataItems: Item[] = [
        {name:'Products', path:'/products', icon: AddShoppingCart},
        {name:'Categries', path:'/categories', icon: Category},
        {name:'Orders', path:'/orders', icon: ShoppingCart},
        {name:'Profile',path:'/profile', icon: AccountCircle},
    ];
    const content = (
        <Box>
        <Link to="/dashboard">
            <Box sx={{display:'flex', gap:1, alignItems:'center', px:8,py:1,mt:2,'&:hover':{bgcolor:colors.greenAccent[500]}, 
                transition:'all ease .3s', }}>
            <Home/>
            <ListItemText sx={{fontscolor:{xs:'#aeaeae',sm:'#eee'}}} primary={'Dashboard'}/>
            </Box>
        </Link>
        <List 
        sx={{py:2, textAlign:'center'}}
        >
            <Typography variant="h6" sx={{color:colors.grey[400]}}>Data</Typography>
            {dataItems.map((item) => (
                <ListItem  button key={item.name}
                sx={{
                    '&:hover':{bgcolor:colors.greenAccent[500]}, 
                    transition:'all ease .3s', 
                    py:1,
                    px:8,
                    textAlign:'center'
                }} 
                onClick={() => navigate(item.path || '')}>
                    {item.icon ? (<item.icon/>) : ''}
                    <ListItemText sx={{fontscolor:{xs:'#aeaeae',sm:'#eee'}}} primary={item.name}/>
                </ListItem>
            ))}
                <ListItem button  
                    sx={{
                        '&:hover':{bgcolor:colors.greenAccent[500]}, 
                        transition:'all ease .3s', 
                        py:1,
                        px:8,
                        textAlign:'center'
                    }}  onClick={handleLogout}>
                    <Logout/>
                    <ListItemText sx={{fontscolor:{xs:'#aeaeae',sm:'#eee'}}} primary={'Logout'}/>
                </ListItem>
        </List>
        
        </Box>
    )
    const navigate = useNavigate();
  return (
    <>
        <Drawer 
        variant={"permanent"}
        sx={{ width:230, flexShrink:0, 
            '& .MuiDrawer-paper':{width:230, bgcolor:colors.primary[400]}}}
        >
        <Box 
        display={'flex'} 
        flexDirection={'row'} 
        justifyContent={'space-between'} 
        alignItems={'center'}
        pt={2} px={3}>
        <Typography   variant="h4" color={'white'}>
            <Link to={'/'}>
                <StoreIcon sx={{fontSize:24}}/> The Spot
            </Link>
        </Typography>
        <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? 
            (
                <DarkModeOutlined htmlColor="white" />
            ) : (
                <LightModeOutlined htmlColor="white"/>
            )}
        </IconButton>
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} pt={1} gap={1}>
            <img src={userInfo.avatar} style={{borderRadius:50, width:54, height:54 ,cursor:'pointer'}} />
            <Typography variant="h5">{userInfo.username}</Typography>
        </Box>
            {content}
        </Drawer>
    </>
  )
}
export default Sidebar