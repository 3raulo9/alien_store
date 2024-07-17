import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, ListGroup, Row, Col, Image, Alert } from 'react-bootstrap';
import { fetchProductsAsync, addProductAsync, updateProductAsync, deleteProductAsync, selectProducts } from '../reducers/productSlice';
import { selectToken } from '../reducers/loginSlice';
import { fetchUser, selectUser } from '../reducers/getUserSlice';
import { register } from '../reducers/registerSlice';
import NoToken from '../components/NoToken';

import "../assets/css/Forms.css";
import "../assets/css/ButtonForAll.css";
import "../assets/css/Loader.css";
import "../assets/css/AdminScreen.css"; // Custom CSS for AdminScreen

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
          <div className="form-wrapper">
            <p className="title">Product Management</p>
            {productAlert.show && (
              <Alert variant={productAlert.variant} onClose={() => setProductAlert({ show: false, message: '', variant: '' })} dismissible>
                {productAlert.message}
              </Alert>
            )}
            <form onSubmit={editProductId ? handleUpdateProduct : handleAddProduct} className="form">
              <div className="textInputWrapper">
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  className="textInput"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Price"
                  type="number"
                  name="price"
                  className="textInput"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="textInputWrapper">
                <textarea
                  placeholder="Description"
                  name="description"
                  className="textInput"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Brand"
                  type="text"
                  name="brand"
                  className="textInput"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Category"
                  type="text"
                  name="category"
                  className="textInput"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Count In Stock"
                  type="number"
                  name="countInStock"
                  className="textInput"
                  value={formData.countInStock}
                  onChange={handleChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Image"
                  type="file"
                  name="image"
                  className="textInput"
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="buttonSpecial"
                disabled={!isFormComplete()}
              >
                {editProductId ? 'Update Product' : 'Add Product'}
              </button>
              {editProductId && (
                <button
                  type="button"
                  className="buttonSpecial secondary"
                  onClick={resetForm}
                >
                  Go Back
                </button>
              )}
            </form>
          </div>
          <div className="form-wrapper mt-5">
            <p className="title">Register New User</p>
            {userAlert.show && (
              <Alert variant={userAlert.variant} onClose={() => setUserAlert({ show: false, message: '', variant: '' })} dismissible>
                {userAlert.message}
              </Alert>
            )}
            <form onSubmit={handleRegisterUser} className="form">
              <div className="textInputWrapper">
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  className="textInput"
                  value={userData.username}
                  onChange={handleUserChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="textInput"
                  value={userData.email}
                  onChange={handleUserChange}
                />
              </div>
              <div className="textInputWrapper">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="textInput"
                  value={userData.password}
                  onChange={handleUserChange}
                />
              </div>
              <div className="checkthing">
                <label className="form-check">
                  <input
                    type="checkbox"
                    name="is_staff"
                    className="form-check-input"
                    checked={userData.is_staff}
                    onChange={handleUserChange}
                  />
                  Register as staff
                </label>
              </div>
              <button type="submit" className="buttonSpecial">
                Register User
              </button>
            </form>
          </div>
        </Col>
        <Col md={6}>
          <div className="form-wrapper">
            <p className="title">Products</p>
            <ListGroup className="product-list">
              {products.map((product) => (
                <ListGroup.Item key={product._id} className="product-item">
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
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminScreen;
