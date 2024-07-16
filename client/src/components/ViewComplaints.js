import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Typography, Button, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { formatDate } from './utils'; // Assuming you have a utility function for date formatting

const API_BASE_URL = 'http://localhost:8000';

const fetchComplaints = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/complaints`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch complaints. Please try again later.');
        setLoading(false);
      }
    };

    getComplaints();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Type of Crime',
      dataIndex: 'type_of_crime',
      key: 'type_of_crime',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => date, // Format date using a utility function
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: status === 'Resolved' ? 'green' : status === 'Pending' ? 'orange' : 'red',
          fontWeight: 'bold'
        }}>{status}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/complaint-details/${record.id}`}>
            <Button type="link" icon={<EditOutlined />} />
          </Link>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </span>
      ),
    },
  ];

  const handleDelete = async (id) => {
    // Implement delete functionality

    const del = window.confirm("Are you sure you want to delete this complaint?");

    if(!del) return;

    try {
      await axios.delete(`${API_BASE_URL}/complaints/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Update state or refresh data after successful delete
      setComplaints(complaints.filter(complaint => complaint.id !== id));
    } catch (error) {
      console.error('Failed to delete complaint:', error);
      // Handle error
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return <Typography.Text type="danger">{error}</Typography.Text>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Typography.Title level={2} style={{ marginBottom: '1rem' }}>View Complaints</Typography.Title>
      <Table
        dataSource={complaints}
        columns={columns}
        bordered
        pagination={false}
        responsive="true"
        style={{ marginBottom: '1rem' }}
      />
      <Button type="primary" style={{ marginBottom: '1rem' }}>
        <Link to="/log-complaint">Log New Complaint</Link>
      </Button>
    </div>
  );
};

export default ViewComplaints;
