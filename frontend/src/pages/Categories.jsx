import React, { useState, useEffect } from 'react';
import DataTable from '../components/Table';
import DataForm from '../components/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/categories', { params: { id } });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingCategory) {
        await axios.put('/categories', data);
      } else {
        await axios.post('/categories', data);
      }
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h1>Categories</h1>
          <DataTable
            headers={['ID', 'Name']}
            data={categories}
            onEdit={setEditingCategory}
            onDelete={handleDelete}
          />
        </Col>
        <Col md={4}>
          <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
          <DataForm
            fields={[
              { label: 'Name', name: 'name' },
            ]}
            data={editingCategory}
            onSubmit={handleSubmit}
          />
          {editingCategory && (
            <Button variant="secondary" className="mt-3" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;
