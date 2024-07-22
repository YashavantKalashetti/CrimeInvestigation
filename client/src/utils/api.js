import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const submitComplaint = async (complaintData) => {
  try {
    const response = await api.post('/complaints', complaintData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if(response.status !== 200){
      throw new Error('Complaint submission failed. Please try again.');
    }
    return response.data;
  } catch (error) {
    if(error.response.status === 401){
      throw new Error('Unauthorized Access. Only Users can create a complaint.');
    }
    throw error.response.data;
  }
};

export const fetchComplaints = async () => {
  try {
    const response = await api.get('/complaints');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchComplaintDetails = async (complaintId) => {
  try {
    const response = await api.get(`/complaints/${complaintId}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }, 
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateComplaintStatus = async (complaintId, status) => {
  try {
    const response = await api.put(`/complaints/${complaintId}`, { status }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const addPoliceOfficer = async (officerData) => {
  try {
    const response = await api.post('/police', officerData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchPoliceOfficers = async () => {
  try {
    const response = await api.get('/police');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};