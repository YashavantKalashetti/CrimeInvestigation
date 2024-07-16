import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: 'background.paper',
        width: '100%',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0', // Optional: Adds a border at the top
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Crime Investigation System
      </Typography>
    </Box>
  );
};

export default Footer;
