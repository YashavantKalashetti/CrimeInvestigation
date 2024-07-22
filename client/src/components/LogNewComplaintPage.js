import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { submitComplaint } from '../utils/api';
import { message } from 'antd';

import { useNavigate } from 'react-router-dom';

const LogNewComplaintPage = () => {
  const navigate = useNavigate();
  const [type_of_crime, setTypeOfCrime] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/user-login');
    }
  },[]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : null;
      const formattedTime = time ? dayjs(time).format('HH:mm:ss') : null;
      await submitComplaint({ type_of_crime, date: formattedDate, time: formattedTime, location, description });
      setTypeOfCrime('');
      setDate(null);
      setTime(null);
      setLocation('');
      setDescription('');
      setError('');
      message.success('Complaint created successfully');
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the complaint');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Log New Complaint
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <TextField
          label="Type of Crime"
          value={type_of_crime}
          onChange={(e) => setTypeOfCrime(e.target.value)}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(date) => setDate(date)}
            renderInput={(params) => <TextField {...params} required />}
            inputFormat="YYYY-MM-DD"
          />
          <TimePicker
            label="Select Time"
            value={time}
            onChange={(time) => setTime(time)}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <Button variant="contained" color="primary" type="submit" style={{marginTop:"5px"}}>
          Submit Complaint
        </Button>
      </Box>
    </Container>
  );
};

export default LogNewComplaintPage;
