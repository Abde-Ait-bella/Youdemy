import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const DataForm = ({ fields, data, onSubmit }) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <Form.Group className="mb-3" key={index}>
          <Form.Label>{field.label}</Form.Label>
          {field.type === 'textarea' ? (
            <Form.Control
              as="textarea"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              rows={field.rows || 3}
            />
          ) : field.type === 'select' ? (
            <Form.Select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            >
              <option value=""></option>
              {field.options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          ) : (
            <Form.Control
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder || ''}
            />
          )}
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DataForm;
