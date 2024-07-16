import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import { fetchPoliceOfficers, addPoliceOfficer } from '../utils/api';

const AddedPoliceOfficerDetails = () => {
  const [officers, setOfficers] = useState([]);
  const [newOfficer, setNewOfficer] = useState({
    name: '',
    badge: '',
    _rank: '',
    station: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const getOfficers = async () => {
      try {
        const data = await fetchPoliceOfficers();
        setOfficers(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching police officers');
      }
    };

    getOfficers();
  }, []);

  const handleInputChange = (e) => {
    setNewOfficer({ ...newOfficer, [e.target.name]: e.target.value });
  };

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    try {
      const addedOfficer = await addPoliceOfficer(newOfficer);
      setOfficers([...officers, addedOfficer]);
      setNewOfficer({ name: '', badge: '', _rank: '', station: '' });
      setError('');
      alert('Police officer added successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while adding the police officer');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Police Officer Details
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Add New Officer</Typography>
        <form onSubmit={handleAddOfficer} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <TextField
            label="Name"
            value={newOfficer.name}
            onChange={handleInputChange}
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Badge Number"
            value={newOfficer.badge}
            onChange={handleInputChange}
            name="badge"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rank"
            value={newOfficer._rank}
            onChange={handleInputChange}
            name="_rank"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Station"
            value={newOfficer.station}
            onChange={handleInputChange}
            name="station"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Add Officer
          </Button>
        </form>
      </Box>
      
      <Typography variant="h5" sx={{ mb: 2 }}>Existing Officers</Typography>
      <Box sx={{ mb: 4 }}>
        {officers.map((officer) => (
          <Box key={officer.id} sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 2, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Name: {officer.name}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Badge Number: {officer.badge}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>Rank: {officer._rank}</Typography>
            <Typography variant="body2">Station: {officer.station}</Typography>
          </Box>
        ))}
      </Box>
      
      {/*  */}
    </Container>
  );
};

export default AddedPoliceOfficerDetails;
