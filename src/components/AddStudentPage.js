
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import './AddStudentPage.css'; // Import your custom CSS here

function AddStudentPage() {
  // Your existing useState hooks and handleSubmit function remain unchanged
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mentorId, setMentorId] = useState(''); // Add state for mentor ID

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure all states are properly set before making the request
    if (!studentName || !rollNumber || !email || !mentorId) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-student`, {
        studentName,
        rollNumber,
        email,
        mentorId, // Pass mentorId to the request
      });

      // Assuming the server responds with a success message
      alert(response.data.message || 'Student added successfully!');
      // Reset form fields
      setStudentName('');
      setRollNumber('');
      setEmail('');
      setMentorId('');
    } catch (error) {
      // Handle specific error response if available, or a generic error message
      alert(error.response?.data?.message || 'The student is already assigned to another mentor or limit exceeded for the mentor.');
      console.error('Error adding student:', error.response?.data || error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 container-custom">
      <Card className="card-custom">
      <Card.Body className="card-body-custom">
  <h3 className="text-center title-custom">Add Student</h3> {/* Title with custom dark shade */}
  <Form onSubmit={handleSubmit}>
    {/* Student Name with grey shade label */}
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Student Name</Form.Label>
      <Form.Control 
        className="form-control-custom" // Custom styling for form control
        type="text" 
        value={studentName} 
        onChange={e => setStudentName(e.target.value)} 
        placeholder="Enter student's name" 
        required />
    </Form.Group>
    
    {/* Roll Number with grey shade label */}
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Roll Number</Form.Label>
      <Form.Control 
        className="form-control-custom" // Custom styling for form control
        type="text" 
        value={rollNumber} 
        onChange={e => setRollNumber(e.target.value)} 
        placeholder="Enter roll number" 
        required />
    </Form.Group>
    
    {/* Email with grey shade label */}
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Email</Form.Label>
      <Form.Control 
        className="form-control-custom" // Custom styling for form control
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Enter student's email" 
        required />
    </Form.Group>
    
    {/* Mentor ID with grey shade label */}
    <Form.Group className="mb-3">
      <Form.Label className="label-custom">Mentor ID</Form.Label>
      <Form.Control 
        className="form-control-custom" // Custom styling for form control
        type="number" 
        value={mentorId} 
        onChange={e => setMentorId(e.target.value)} 
        placeholder="Enter mentor ID" 
        required />
    </Form.Group>
    
    {/* Submit Button with custom styling */}
    <Button variant="primary" type="submit" className="w-100 button-custom">Add Student</Button>
  </Form>
</Card.Body>

      </Card>
    </Container>
  );
}

export default AddStudentPage;
