import React, { useState } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    username: '',
    name: '',
    email: '',
    profilePicture: 'https://via.placeholder.com/150'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({
        ...profile,
        profilePicture: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  const purchaseHistory = [
    { id: 1, item: 'Alien thing 1', date: '2023-01-01', amount: '$50' },
    { id: 2, item: 'Alien thing 2', date: '2023-02-15', amount: '$30' },
    { id: 3, item: 'Alien thing 3', date: '2023-03-05', amount: '$20' }
  ];

  return (
    <div className="container mt-5">
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <Image
                src={profile.profilePicture}
                className="rounded-circle mb-3"
                alt="Profile"
                width="150"
                height="150"
              />
              <Card.Title>Update Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <input
                    type="file"
                    id="profilePicture"
                    className="d-none"
                    onChange={handleFileChange}
                  />
                  <Button 
                    className="buttonSpecial" 
                    onClick={() => document.getElementById('profilePicture').click()}
                  >
                    Choose Profile Picture
                  </Button>
                </Form.Group>
                <Form.Group className="textInputWrapper mt-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="textInputWrapper mt-3">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="textInputWrapper mt-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button className="buttonSpecial mt-4" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Purchase History</Card.Title>
              <ListGroup>
                {purchaseHistory.map((purchase) => (
                  <ListGroup.Item key={purchase.id}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6>{purchase.item}</h6>
                        <small>{purchase.date}</small>
                      </div>
                      <div>{purchase.amount}</div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileComponent;
