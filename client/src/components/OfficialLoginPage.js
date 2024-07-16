import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';

const OfficialLoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    officialId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginData, 'official');
      localStorage.setItem('token', response.token);
      navigate('/view-complaints');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Official Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="officialId" className="block mb-2">Official ID</label>
          <input
            type="text"
            id="officialId"
            name="officialId"
            value={loginData.officialId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
          Login
        </button>
      </form>
    </div>
  );
};

export default OfficialLoginPage;