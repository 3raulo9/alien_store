import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemsAsync, removeFromCartAsync, checkoutAsync, selectCartItems, selectCartLoading, selectCartError } from '../reducers/cartSlice';
import { selectToken } from '../reducers/loginSlice';
import { Row, Col, ListGroup, Image, Button, Card, Modal } from 'react-bootstrap';
import NoToken from '../components/NoToken';
import Pay from '../components/Pay';
import withTranslation from '../hoc/withTranslation';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const token = useSelector(selectToken);
  const [showModal, setShowModal] = useState(false);
  const [subtotalItems, setSubtotalItems] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartItemsAsync());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const price = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
    setSubtotalItems(items);
    setSubtotalPrice(price);
  }, [cartItems]);

  const removeFromCartHandler = async (_id) => {
    await dispatch(removeFromCartAsync(_id));
    dispatch(fetchCartItemsAsync()); // Refresh the cart items
  };

  const handleCheckout = () => {
    dispatch(checkoutAsync());
    setShowModal(false);
  };

  const handleProceedToCheckout = () => {
    setShowModal(true);
  };

  if (!token) {
    return <NoToken />;
  }

  return (
    <div>
      <h1 style={{ color: 'green' }}>Shopping Cart</h1>
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
                <ListGroup.Item>
                  <p>Your cart is empty</p>
                </ListGroup.Item>
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
          <Pay />
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

export default withTranslation(CartScreen);
