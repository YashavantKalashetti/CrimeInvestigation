// File: src/pages/HomePage.js
import React from 'react';
import { Typography, Button, Grid, Paper, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <div >
      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
          backgroundImage: 'url(https://img.freepik.com/free-photo/still-life-with-scales-justice_23-2149776027.jpg)',
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          color: 'white',
          objectFit: "fill"
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Crime Investigation System
        </Typography>
        <Typography variant="body1" paragraph>
          Access various services and manage complaints efficiently.
        </Typography>
      </Paper>
      <Grid container spacing={3} sx={{ mt: 3 } }>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="primary" component={Link} to="/user-login">
            User Login
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="secondary" component={Link} to="/official-login">
            Official Login
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="success" component={Link} to="/signup">
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="warning" component={Link} to="/log-complaint">
            Log a Complaint
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="info" component={Link} to="/view-complaints">
            View Complaints
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="primary" component={Link} to="/police-login">
            Police Login
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="secondary" component={Link} to="/hq-login">
            HQ Login
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button fullWidth variant="contained" color="success" component={Link} to="/police-officer-details">
            Police Officer Details
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;