import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, saveProfile, selectProfile, selectProfileLoading, selectProfileError } from '../reducers/profileSlice';
import { selectToken } from '../reducers/loginSlice';
import { fetchUser, selectUser, selectStatus, selectError } from '../reducers/getUserSlice';
import { fetchOrders, selectOrders, selectOrdersStatus, selectOrdersError } from '../reducers/ordersSlice';
import NoToken from '../components/NoToken';
import withTranslation from '../hoc/withTranslation';

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
  const ordersStatus = useSelector(selectOrdersStatus);
  const ordersError = useSelector(selectOrdersError);
  const [orders, setOrders] = useState([]); // Local state for orders
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

  useEffect(() => {
    const fetchOrderData = async () => {
      if (token) {
        try {
          const resultAction = await dispatch(fetchOrders());
          if (fetchOrders.fulfilled.match(resultAction)) {
            setOrders(resultAction.payload); // Set the orders data to local state
          } else {
            console.error('Failed to fetch orders:', resultAction.payload);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };
    fetchOrderData();
  }, [dispatch, token]);

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

  if (!token) {
    return <NoToken />;
  }

  return ( 
    <div className="container mt-5">
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
                {ordersStatus === 'loading' ? (
                  <div>Loading orders...</div>
                ) : ordersError ? (
                  <div>Error loading orders: {ordersError}</div>
                ) : (
                  <ListGroup>
                    {orders && orders.length > 0 ? (
                      orders.map((order) => (
                        <ListGroup.Item key={order.id}>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6>Order ID: {order.id}</h6>
                              <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
                              <p>Number of Items: {order.items.length}</p>
                            </div>
                            <div>
                              Total: ${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <div>No orders found</div>
                    )}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default withTranslation(ProfileScreen);
