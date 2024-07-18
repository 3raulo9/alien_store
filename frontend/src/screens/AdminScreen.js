import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, ListGroup, Row, Col, Image, Alert } from 'react-bootstrap';
import { fetchProductsAsync, addProductAsync, updateProductAsync, deleteProductAsync, selectProducts } from '../reducers/productSlice';
import { selectToken } from '../reducers/loginSlice';
import { fetchUser, selectUser } from '../reducers/getUserSlice';
import { register } from '../reducers/registerSlice';
import NoToken from '../components/NoToken';
import withTranslation from '../hoc/withTranslation';

const AdminScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    category: '',
    countInStock: '',
    image: null,
  });

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    is_staff: false,
  });

  const [editProductId, setEditProductId] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const [productAlert, setProductAlert] = useState({ show: false, message: '', variant: '' });
  const [userAlert, setUserAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user && user.is_staff) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUserChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
  };

  if (!user || !user.is_staff) {
    return (
      <div>
        <NoToken />
        If you have already logged in, please note that only staff members can enter this page.
      </div>
    );
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await dispatch(addProductAsync(data)).unwrap();
      setProductAlert({ show: true, message: 'Product added successfully!', variant: 'success' });
      resetForm();
    } catch (error) {
      setProductAlert({ show: true, message: 'Failed to add product.', variant: 'danger' });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await dispatch(updateProductAsync({ id: editProductId, product: data })).unwrap();
      setProductAlert({ show: true, message: 'Product updated successfully!', variant: 'success' });
      resetForm();
    } catch (error) {
      setProductAlert({ show: true, message: 'Failed to update product.', variant: 'danger' });
    }
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(userData)).unwrap();
      setUserAlert({ show: true, message: 'User registered successfully!', variant: 'success' });
      resetUserForm();
    } catch (error) {
      setUserAlert({ show: true, message: 'Failed to register user.', variant: 'danger' });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      brand: '',
      category: '',
      countInStock: '',
      image: null,
    });
    setEditProductId(null);
    setOriginalImage(null);
  };

  const resetUserForm = () => {
    setUserData({
      username: '',
      email: '',
      password: '',
      is_staff: false,
    });
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
      image: null,
    });
    setOriginalImage(product.image);
    setEditProductId(product._id);
  };

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProductAsync(productId)).unwrap();
      setProductAlert({ show: true, message: 'Product deleted successfully!', variant: 'success' });
    } catch (error) {
      setProductAlert({ show: true, message: 'Failed to delete product.', variant: 'danger' });
    }
  };

  const isFormComplete = () => {
    return (
      formData.name &&
      formData.price &&
      formData.description &&
      formData.brand &&
      formData.category &&
      formData.countInStock &&
      formData.image
    );
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col md={6}>
          <h2 style={{ color: 'green' }}>Product Management</h2>
          {productAlert.show && (
            <Alert variant={productAlert.variant} onClose={() => setProductAlert({ show: false, message: '', variant: '' })} dismissible>
              {productAlert.message}
            </Alert>
          )}
          <Form onSubmit={editProductId ? handleUpdateProduct : handleAddProduct}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="brand" className="mt-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="countInStock" className="mt-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="image" className="mt-3">
              <Form.Label>Image</Form.Label>
              {originalImage && (
                <div className="mb-3">
                  <Image src={originalImage} alt="Product Image" fluid />
                </div>
              )}
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Button
              type="submit"
              className="mt-3"
              disabled={!isFormComplete()}
            >
              {editProductId ? 'Update Product' : 'Add Product'}
            </Button>
            {editProductId && (
              <Button
                variant="secondary"
                className="mt-3 ms-2"
                onClick={resetForm}
              >
                Go Back
              </Button>
            )}
          </Form>
        </Col>
        <Col md={6}>
          <h2 style={{ color: 'green' }}>Products</h2>
          <ListGroup>
            {products.map((product) => (
              <ListGroup.Item key={product._id}>
                <Row>
                  <Col>{product.name}</Col>
                  <Col>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product._id)}
                      className="ms-2"
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={6}>
          <h2 style={{ color: 'green' }}>Register New User</h2>
          {userAlert.show && (
            <Alert variant={userAlert.variant} onClose={() => setUserAlert({ show: false, message: '', variant: '' })} dismissible>
              {userAlert.message}
            </Alert>
          )}
          <Form onSubmit={handleRegisterUser}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={userData.username}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Form.Group controlId="is_staff" className="mt-3">
              <Form.Check
                type="checkbox"
                name="is_staff"
                label="Register as staff"
                checked={userData.is_staff}
                onChange={handleUserChange}
              />
            </Form.Group>
            <Button type="submit" className="mt-3">
              Register User
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation(AdminScreen);
