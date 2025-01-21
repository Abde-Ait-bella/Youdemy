import React, { useState, useEffect } from 'react';
import DataTable from '../components/Table';
import DataForm from '../components/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/tags', { params: { id } });
      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingTag) {
        await axios.put('/tags', data);
      } else {
        await axios.post('/tags', data);
      }
      setEditingTag(null);
      fetchTags();
    } catch (error) {
      console.error('Error saving tag:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h1>Tags</h1>
          <DataTable
            headers={['ID', 'Name']}
            data={tags}
            onEdit={setEditingTag}
            onDelete={handleDelete}
          />
        </Col>
        <Col md={4}>
          <h2>{editingTag ? 'Edit Tag' : 'Add Tag'}</h2>
          <DataForm
            fields={[
              { label: 'Name', name: 'name' },
            ]}
            data={editingTag}
            onSubmit={handleSubmit}
          />
          {editingTag && (
            <Button variant="secondary" className="mt-3" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Tags;
