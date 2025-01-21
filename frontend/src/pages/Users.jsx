import React, { useState, useEffect } from 'react';
import DataTable from '../components/Table';
import DataForm from '../components/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/users', { params: { id } });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingUser) {
        await axios.put('/users', data);
      } else {
        await axios.post('/users', data);
      }
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h1>Users</h1>
          <DataTable
            headers={['ID', 'Name', 'Email', 'Role', 'Status']}
            data={users}
            onEdit={setEditingUser}
            onDelete={handleDelete}
          />
        </Col>
        <Col md={4}>
          <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
          <DataForm
            fields={[
              { label: 'Name', name: 'name' },
              { label: 'Email', name: 'email', type: 'email' },
              {
                label: 'Role',
                name: 'role',
                type: 'select',
                options: [
                  { value: 'student', label: 'Student' },
                  { value: 'teacher', label: 'Teacher' },
                  { value: 'admin', label: 'Admin' },
                ],
              },
              {
                label: 'Status',
                name: 'status',
                type: 'select',
                options: [
                  { value: '1', label: 'Active' },
                  { value: '0', label: 'Inactive' },
                ],
              },
              { label: 'Password', name: 'password', type: 'password' },
            ]}
            data={editingUser}
            onSubmit={handleSubmit}
          />
          {editingUser && (
            <Button variant="secondary" className="mt-3" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
