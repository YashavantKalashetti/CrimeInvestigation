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
    const response = await api.post('/complaints', complaintData);
    return response.data;
  } catch (error) {
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
    const response = await api.get(`/complaints/${complaintId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateComplaintStatus = async (complaintId, status) => {
  try {
    const response = await api.put(`/complaints/${complaintId}`, { status });
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