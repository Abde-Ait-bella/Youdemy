import React, { useState, useEffect } from 'react';
import DataTable from '../components/Table';
import DataForm from '../components/Form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await axios.get('/courses', user.role === 'admin' ? {} : { params: { teacher_id: user.id } });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      const options = response.data.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(options);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/users?role=teacher');
      const options = response.data.map((teacher) => ({
        value: teacher.id,
        label: teacher.name,
      }));
      setTeachers(options);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/courses', { params: { id } });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingCourse) {
        await axios.put('/courses', data);
      } else {
        await axios.post('/courses', data);
      }
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h1>Courses</h1>
          <DataTable
            headers={['ID', 'Title', 'Category', 'Teacher']}
            data={courses}
            onEdit={setEditingCourse}
            onDelete={handleDelete}
          />
        </Col>
        <Col md={4}>
          <h2>{editingCourse ? 'Edit Course' : 'Add Course'}</h2>
          <DataForm
            fields={[
              { label: 'Title', name: 'title' },
              { label: 'Description', name: 'description', type: 'textarea' },
              { label: 'Content', name: 'content' },
              {
                label: 'Category',
                name: 'category_id',
                type: 'select',
                options: categories,
              },
              {
                label: 'Teacher',
                name: 'teacher_id',
                type: 'select',
                options: teachers,
              },
            ]}
            data={editingCourse}
            onSubmit={handleSubmit}
          />
          {editingCourse && (
            <Button variant="secondary" className="mt-3" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Courses;
