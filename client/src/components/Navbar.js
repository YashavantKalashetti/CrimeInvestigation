import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Crime Investigation System
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/user-login">User Login</Button>
        <Button color="inherit" component={Link} to="/official-login">Official Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;