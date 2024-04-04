/* eslint-disable react/prop-types */

import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@mui/material';
import { useAuth } from '../context/authProvider'; // Replace with your auth context provider
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductsIcon from '@mui/icons-material/Store';
import { useCart } from '../context/CartContext';

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const { 
    cartItems,
  } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const userMenuItems = [
    currentUser ? (
      <MenuItem key="username" onClick={handleClose}>{currentUser.rest.username}</MenuItem>
    ) : (
      ''
    ),
    currentUser ? (
      <MenuItem key="sign-out" onClick={() => signOut()}>Sign Out</MenuItem>
    ) : (
      <MenuItem key="sign-in">
        <Link to="/sign-in">Sign In</Link>
      </MenuItem>
    ),
  ];

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon>
            <ProductsIcon />
          </ListItemIcon>
          <ListItemText primary="All Products" />
        </ListItem>
        <ListItem  component={Link} to={`/cart`}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={`Cart (${cartItems.length})`} />
        </ListItem>
        {currentUser ? (
          <ListItem button onClick={() => signOut()}>
            <ListItemIcon>
              <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary="Sign Out"/>
          </ListItem>
          ) : (
          <ListItem button component={Link} to={'/sign-in'}>
              <ListItemText primary="Sign In"/>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      sx={{
        backgroundColor: "#222",
        boxShadow: 0,
        position: 'relative',
      }}
    >
      <Toolbar
        sx={{
          display:'flex',
          justifyContent:'space-between',

        }}
      >
        { 
          <Hidden smUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        }

        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {title}
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {/* Search Bar (Desktop Only) */}
          <Box component={'form'} sx={{ mr: 1 }} onSubmit={handleSearchSubmit}>
            <TextField
              size="small"
              margin="normal"
              label="search"
              fullWidth
              className='border rounded outline-transparent bg-slate-300'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" size="small">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
              Home
            </Link>
            <Link to="/products" style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
              All Products
            </Link>
            <Link to={`/cart`} style={{ textDecoration: 'none', color: 'white', marginRight: 10 }}>
              Cart ({cartItems.length})
            </Link>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {userMenuItems}
        </Menu>
          </Box>
        </Box>

      </Toolbar>

      {/* Responsive Drawer */}
      <Hidden mdUp>
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="left"
          variant="temporary"
          sx={{
            '&.MuiDrawer-paper': {
              width: 250,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

export default Navbar;
