import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemsAsync, removeFromCartAsync, checkoutAsync, selectCartItems, selectCartLoading, selectCartError } from '../reducers/cartSlice';
import { Row, Col, ListGroup, Image, Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pay from '../components/Pay';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch, refresh]);

  const removeFromCartHandler = (_id) => {
    dispatch(removeFromCartAsync(_id));
    setRefresh(!refresh);
  };

  const handleCheckout = () => {
    dispatch(checkoutAsync());
    setShowModal(false);
  };

  const handleProceedToCheckout = () => {
    setShowModal(true);
  };

  const subtotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  const token = localStorage.getItem('token');

  return (
    <div>
      <h1>Shopping Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>Error: {error.message || JSON.stringify(error)}</p>
          {console.error(`Error: ${error}`)}
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded style={{ maxHeight: '100px' }} />
                      </Col>
                      <Col md={3}>
                        <p>{item.name}</p>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <p>{item.quantity}</p>
                      </Col>
                      <Col md={2}>
                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}>
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal ({subtotalItems}) items
                  </h2>
                  ${subtotalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={handleProceedToCheckout}>
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Number of items: {subtotalItems}</p>
          <p>Total price: ${subtotalPrice}</p>
          <Pay></Pay>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartScreen;
