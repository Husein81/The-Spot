import { 
    AppBar,
    Box, 
    Drawer, 
    IconButton, 
    List, 
    ListItem, 
    ListItemText,
    Typography, 
    
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreIcon from '@mui/icons-material/Store';
interface Item{
    name: string,
    path: string,
}

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleClose = () => {
        setMobileOpen(false);
    }
    const handleOpen = () => {
        setMobileOpen(true);
    }
    const menuItems: Item[] = [
        {name:'Home', path:'/'},
        {name:'Products', path:'/products'},
        {name:'Categries', path:'/categories'},
    ];
    const content = (
        <List 
        sx={{py:2}}
        >
        {menuItems.map((item) => (
            <ListItem  button key={item.name}
            sx={{
                '&:hover':{bgcolor:'#abc4ff'}, 
                transition:'all ease .3s', 
                py:1,
                px:8
            }} 
            onClick={() => navigate(item.path)}>
                <ListItemText sx={{color:{xs:'#aeaeae',sm:'#eee'}, '&:hover':{color:'white'}}} primary={item.name}/>
            </ListItem>
        ))}
        </List>
    )
    const navigate = useNavigate();
  return (
    <>
    <AppBar position="static"
     sx={{  
        width: 260,  
        bgcolor:'#333',
        display:{xs:'none',sm:'block'},
        minHeight:'100vh'
        }}>
        <Typography px={3} pt={3} variant="h6" color={'white'}>
            <StoreIcon/>The Spot
        </Typography>
       {content}
    </AppBar>

    <Box>
        <IconButton onClick={handleOpen} sx={{display:{xs:'block',sm:'none'}}}>
            <MenuIcon/>
        </IconButton>
    <Drawer 
    variant="temporary"
    open={mobileOpen}
    onClose={handleClose}
    sx={{
        display:{xs:'block', sm:'none'},
        '& .MuiDrawer-paper': { width: 240, background: "#333"   },
    }}

    >
    <Typography sx={{p:2, color:'#aeaeae'}}variant="h6">
        <StoreIcon/>The Spot
    </Typography>
      {content}
    </Drawer>
    </Box>
    </>
  )
}
export default Navbar