import { 
    AppBar, 
    List, 
    ListItem, 
    ListItemText, 
    styled, 
    Toolbar, 
    Typography 
} from "@mui/material";
import { Store } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Item {
    name: string;
    path: string;
}
const NavBar = () => {
    const menuItems: Item[] = [
        {name: "Home", path: ""},
        {name: "Products", path: "products"},
        {name: "Contact", path: "contact"},
    ]
    const contents = (menuItems.map((item, index) => (
            <ListItem button key={index}>
                <Link to={item.path}>
                    <ListItemText primary={item.name} />
                </Link>
            </ListItem>
    )));
    const ToolbarStyled = styled(Toolbar)({
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#242424',
    });
  return (
    <AppBar>
        <ToolbarStyled>
            <Typography variant="h6" component="div" className="items-center gap-1 flex">
                <Store/>The Spot
            </Typography>
            <List component="nav" sx={{display:'flex'}}>
                {contents}
            </List>
        </ToolbarStyled>
    </AppBar>
  )
}
export default NavBar