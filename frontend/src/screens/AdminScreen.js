// src/screens/AdminScreen.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, ListGroup, Row, Col, Image } from 'react-bootstrap';
import { fetchProductsAsync, addProductAsync, updateProductAsync, deleteProductAsync, selectProducts } from '../reducers/productSlice';
import { selectToken } from '../reducers/loginSlice';
import { fetchUser, selectUser } from '../reducers/getUserSlice';

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
  const [editProductId, setEditProductId] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

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

  useEffect(() => {
    console.log(user, token);
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  if (!user || !user.is_staff) {
    return <div>Access Denied</div>;
  }

  const handleAddProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    dispatch(addProductAsync(data));
    resetForm();
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    dispatch(updateProductAsync({ id: editProductId, product: data }));
    resetForm();
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

  const handleDelete = (productId) => {
    dispatch(deleteProductAsync(productId));
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
          <Form>
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
            {editProductId ? (
              <>
                <Button
                  type="submit"
                  className="mt-3"
                  onClick={handleUpdateProduct}
                  disabled={!isFormComplete()}
                >
                  Update Product
                </Button>
                <Button
                  variant="secondary"
                  className="mt-3 ms-2"
                  onClick={resetForm}
                >
                  Go Back
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                className="mt-3"
                onClick={handleAddProduct}
                disabled={!isFormComplete()}
              >
                Add Product
              </Button>
            )}
          </Form>
        </Col>
        <Col md={6}>
          <h2 style={{ color: 'white' }}>Products</h2>
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
    </div>
  );
};

export default AdminScreen;
