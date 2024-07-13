// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, saveProfile, selectProfile, selectProfileLoading, selectProfileError } from '../reducers/profileSlice';
import { selectToken } from '../reducers/loginSlice';
import { fetchUser, selectUser, selectStatus, selectError } from '../reducers/getUserSlice';
import NoToken from '../components/NoToken';
import AdminScreen from './AdminScreen';

const ProfileScreen = () => {
  const { user_id } = useParams(); // Get the user_id from the URL parameters
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const status = useSelector(selectStatus);
  const fetchUserError = useSelector(selectError);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    profilePicture: null,
  });

  useEffect(() => {
    // Fetch the user data if not already available
    if (!user && token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (status === 'succeeded' && user) {
      console.log('Fetched user data:', user);
    } else if (fetchUserError) {
      console.error('Error fetching user data:', fetchUserError);
    }
  }, [status, user, fetchUserError]);

  useEffect(() => {
    if (user_id || user) {
      const id = user_id || user.id;
      console.log('Fetching profile for user id:', id);
      dispatch(getProfile(id));
    }
  }, [dispatch, user_id, user]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        name: profile.name || '',
        email: profile.email || '',
        profilePicture: profile.profilePicture || null,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.profilePicture) {
      data.append('profilePicture', formData.profilePicture);
    }
    dispatch(saveProfile({ id: user_id || user.id, profileData: data, token }));
  };

  const purchaseHistory = [
    { id: 1, item: 'Alien thing 1', date: '2023-01-01', amount: '$50' },
    { id: 2, item: 'Alien thing 2', date: '2023-02-15', amount: '$30' },
    { id: 3, item: 'Alien thing 3', date: '2023-03-05', amount: '$20' }
  ];

  if (!token) {
    return <NoToken />;
  }

  return ( 
    <div className="container mt-5">
      <AdminScreen></AdminScreen>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <Image
                  src={profile?.profilePicture || 'https://via.placeholder.com/150'}
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
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="textInputWrapper mt-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="textInputWrapper mt-3">
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
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
      )}
    </div>
  );
};

export default ProfileScreen;
