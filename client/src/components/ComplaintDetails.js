import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Spin, Descriptions, Select, Button, message } from 'antd';
import { fetchComplaintDetails, updateComplaintStatus } from '../utils/api';

const { Title } = Typography;
const { Option } = Select;

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const getComplaintDetails = async () => {
      try {
        const data = await fetchComplaintDetails(id);
        setComplaint(data);
        setSelectedStatus(data.status); // Initialize selectedStatus with current status
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching complaint details');
        setLoading(false);
      }
    };

    getComplaintDetails();
  }, [id]);

  const handleStatusChange = async (value) => {
    try {
      setLoading(true);
      await updateComplaintStatus(id, value);
      message.success('Complaint status updated successfully');
      setSelectedStatus(value);
    } catch (err) {
      message.error('Failed to update complaint status');
      console.error('Failed to update complaint status:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2}>Complaint Details</Title>
      <Descriptions bordered column={1} style={{ backgroundColor: '#f1f1f1', padding: '1rem', borderRadius: '8px' }}>
        <Descriptions.Item label="Complaint ID">{complaint.id}</Descriptions.Item>
        <Descriptions.Item label="Type of Crime">{complaint.type_of_crime}</Descriptions.Item>
        <Descriptions.Item label="Date">{complaint.date}</Descriptions.Item>
        <Descriptions.Item label="Time">{complaint.time}</Descriptions.Item>
        <Descriptions.Item label="Location">{complaint.location}</Descriptions.Item>
        <Descriptions.Item label="Description">{complaint.description}</Descriptions.Item>
        <Descriptions.Item label="Status" style={{background:"#f2f2f3"}} span={2}>
          <Select value={selectedStatus} onChange={handleStatusChange} style={{ width: '100%' }}>
            <Option value="Pending">Pending</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ComplaintDetails;
