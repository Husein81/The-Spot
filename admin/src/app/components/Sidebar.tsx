/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    AppBar,
    Box,   
    IconButton, 
    List, 
    ListItem, 
    ListItemText,
    Typography,
    useTheme, 
    
} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
import { ColorModeContext, token } from "../../Theme";
import { Category, DarkModeOutlined, Home, LightModeOutlined, ShoppingCart } from "@mui/icons-material";
interface Item{
    name: string,
    path: string,
    icon?: React.ComponentType<any>
}

const Sidebar = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const dataItems: Item[] = [
        {name:'Products', path:'/products', icon: ShoppingCart},
        {name:'Categries', path:'/categories', icon: Category},
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
            onClick={() => navigate(item.path)}>
                {item.icon ? (<item.icon/>) : ''}
                <ListItemText sx={{fontscolor:{xs:'#aeaeae',sm:'#eee'}}} primary={item.name}/>
            </ListItem>
        ))}
        </List>
        <List>
        </List>
        </Box>
    )
    const navigate = useNavigate();
  return (
    <>
    <AppBar position="static"
     sx={{  
        width: 230,  
        bgcolor:colors.primary[400],
        display:'block',
        minHeight:'100vh'
        }}>
        <Box 
        display={'flex'} 
        flexDirection={'row'} 
        justifyContent={'space-between'} 
        alignItems={'center'}
        pt={2} px={3}>
        <Typography   variant="h4" color={'white'}>
            <StoreIcon sx={{fontSize:24}}/> The Spot
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
       {content}
    </AppBar>
    </>
  )
}
export default Sidebar