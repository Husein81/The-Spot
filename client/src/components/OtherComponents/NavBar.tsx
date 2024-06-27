import { 
    AppBar, 
    Box, 
    Drawer, 
    Hidden, 
    IconButton, 
    List, 
    ListItem, 
    ListItemText,  
    styled, 
    Toolbar, 
    Typography 
} from "@mui/material";
import { Store, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Item {
    name: string;
    path: string;
}
const NavBar = () => {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    }
    const menuItems: Item[] = [
        {name: "Home", path: ""},
        {name: "Shop", path: "products"},
        {name: "Contact", path: "contact"},
    ]
    const contents = (menuItems.map((item, index) => (
            <ListItem button key={index}>
                <Link to={item.path}>
                    <ListItemText primary={item.name} className="hover:scale-105 transition-transform ease-in-out" />
                </Link>
            </ListItem>
    )));
    const ToolbarStyled = styled(Toolbar)({
        display: 'flex',
        justifyContent: 'space-between',
    });
    const AppBarStyled = styled(AppBar)({
        backgroundColor: '#242424',
        padding:'4px 0'
    })

    const drawerContent = (
        <Drawer
            open={open}
            variant="temporary"
            anchor="left"
            onClose={handleDrawer}
            sx={{
                '& .MuiDrawer-paper': { 
                    width: 240,
                    p:2,
                    backgroundColor: '#242424',
                    color: '#fff',
                },
            }}
        >
            <Typography variant="h6" component="div" className="items-center gap-1 flex">
                <Store/>The Spot
            </Typography>
            <List>
                {contents}
            </List>
        </Drawer>
    )
  return (
    <Box>
    <AppBarStyled>
        <ToolbarStyled >
            <Typography variant="h6" component="div" className="items-center gap-1 flex">
                <Store/>The Spot
            </Typography>
        <Hidden mdDown>
            <List component="nav" sx={{display:'flex'}}>
                {contents}
            </List>
        </Hidden>
        <Hidden mdUp>
            <IconButton sx={{color:'#fefefe'}} onClick={handleDrawer}>
                <Menu />
            </IconButton>   
        </Hidden>
        </ToolbarStyled>
    </AppBarStyled>
        {drawerContent}
    </Box>
  )
}
export default NavBar