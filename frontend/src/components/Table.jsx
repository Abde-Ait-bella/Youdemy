import React from 'react';
import { Table, Button } from 'react-bootstrap';

const DataTable = ({ headers, data, onEdit, onDelete }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        {headers.map((header, index) => <th key={index}>{header}</th>)}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {headers.map((header, idx) => <td key={idx}>{item[header.toLowerCase()]}</td>)}
          <td>
            <Button variant="primary" size="sm" className="me-2" onClick={() => onEdit(item)}>Edit</Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(item.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DataTable;
