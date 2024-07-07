import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemsAsync, removeFromCartAsync, checkoutAsync, selectCartItems, selectCartLoading, selectCartError } from '../reducers/cartSlice';
import { Row, Col, ListGroup, Image, Button, Card, Modal } from 'react-bootstrap';
import Pay from '../components/Pay';
import translationAPI from '../APIS/translationAPI';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const { selectedLanguage } = useSelector((state) => state.translation);
  const [showModal, setShowModal] = useState(false);
  const [translations, setTranslations] = useState({
    cartTitle: 'Shopping Cart',
    emptyCartMessage: 'Your cart is empty',
    subtotalText: `Subtotal (${cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items`,
    totalPriceText: `Total price: $${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}`,
    proceedToCheckoutText: 'Proceed To Checkout'
  });

  useEffect(() => {
    dispatch(fetchCartItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    const translateContent = async () => {
      if (selectedLanguage) {
        const textsToTranslate = [
          'Shopping Cart',
          'Your cart is empty',
          `Subtotal (${cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items`,
          `Total price: $${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}`,
          'Proceed To Checkout'
        ];
  
        try {
          const translatedTexts = await translationAPI.translateBatch(textsToTranslate, selectedLanguage);
          document.querySelector('h1').textContent = translatedTexts[0];
          document.querySelector('.empty-cart-message').textContent = translatedTexts[1];
          document.querySelector('.cart-subtotal').textContent = translatedTexts[2];
          document.querySelector('.total-price').textContent = translatedTexts[3];
          document.querySelector('.checkout-button').textContent = translatedTexts[4];
        } catch (error) {
          console.error("Error translating text:", error.message);
        }
      }
    };
  
    translateContent();
  }, [cartItems, selectedLanguage]);
  

  const removeFromCartHandler = useCallback((_id) => {
    dispatch(removeFromCartAsync(_id));
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(checkoutAsync());
    setShowModal(false);
  };

  const handleProceedToCheckout = () => {
    setShowModal(true);
  };

  const subtotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  return (
    <div>
      <h1>{translations.cartTitle}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>Error: {error}</p>
          {console.error(`Error: ${error}`)}
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.length === 0 ? (
                <p className="empty-cart-message">{translations.emptyCartMessage}</p>
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
                <ListGroup.Item className="cart-subtotal">
                  <h2>{translations.subtotalText}</h2>
                  ${subtotalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="button" className="checkout-button btn-block" disabled={cartItems.length === 0} onClick={handleProceedToCheckout}>
                    {translations.proceedToCheckoutText}
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
          <p className="total-price">{translations.totalPriceText}</p>
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

export default CartScreen;
