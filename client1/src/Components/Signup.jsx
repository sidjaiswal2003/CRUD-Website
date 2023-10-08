import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, FormGroup } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 'Male',
    howDidYouHear: [],
    city: 'Mumbai',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    

    if (type === 'checkbox') {
      let updatedHowDidYouHear = [...formData.howDidYouHear];
      if (checked) {
        updatedHowDidYouHear.push(value);
      } else {
        updatedHowDidYouHear = updatedHowDidYouHear.filter((item) => item !== value);
      }

      setFormData({
        ...formData,
        howDidYouHear: updatedHowDidYouHear,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your signup logic here
    const {name,email,password,phone,gender,howDidYouHear,city,state}=formData
    const response = await fetch(`http://localhost:2000/register`, {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
  
        },
        body: JSON.stringify({name,email,password,phone,gender,howDidYouHear,city,state})
      });
    
    if (response.ok) {
        const json = await response.json();
        localStorage.setItem('token', json.authToken);
        navigate('/');
        props.showAlert("Account Created", "success");
      } else {
        console.log("Error response status:", response.status);
        const errorData = await response.json();
        console.log("Error data:", errorData);
        props.showAlert("Invalid Credential", "danger");
      }
          
      
      
    
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                //pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.cpassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
         

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                //pattern="[0-9]+"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <FormGroup>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Others"
                  name="gender"
                  value="Others"
                  checked={formData.gender === 'Others'}
                  onChange={handleChange}
                />
              </FormGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>How did you hear about this?</Form.Label>
              <FormGroup>
                <Form.Check
                  type="checkbox"
                  label="LinkedIn"
                  name="howDidYouHear"
                  value="LinkedIn"
                  checked={formData.howDidYouHear.includes('LinkedIn')}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Friends"
                  name="howDidYouHear"
                  value="Friends"
                  checked={formData.howDidYouHear.includes('Friends')}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Job Portal"
                  name="howDidYouHear"
                  value="Job Portal"
                  checked={formData.howDidYouHear.includes('Job Portal')}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Others"
                  name="howDidYouHear"
                  value="Others"
                  checked={formData.howDidYouHear.includes('Others')}
                  onChange={handleChange}
                />
              </FormGroup>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type='text'
                placeholder="Enter state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              //  pattern="[A-Za-z\s]+"
                required
              > 

              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Signup
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
