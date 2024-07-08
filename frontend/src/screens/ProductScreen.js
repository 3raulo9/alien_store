import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync } from '../reducers/cartSlice';
import { fetchProductAsync, selectProduct, selectProductLoading, selectProductError } from '../reducers/productSlice';
import Rating from '../components/Rating';
import translationAPI from '../APIS/translationAPI';

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [translatedProduct, setTranslatedProduct] = useState(null);
  const { selectedLanguage } = useSelector((state) => state.translation);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const storedProduct = localStorage.getItem(`product_${id}`);
        if (!storedProduct) {
          dispatch(fetchProductAsync(id));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [dispatch, id]);

  useEffect(() => {
    const translateProduct = async () => {
      if (selectedLanguage && product) {
        const textsToTranslate = [
          product.name,
          product.description,
          `Price: $${product.price}`,
          `${product.numReviews} reviews`,
          `Qty`
        ];

        try {
          const translatedTexts = await translationAPI.translateBatch(textsToTranslate, selectedLanguage);
          const [translatedName, translatedDescription, translatedPrice, translatedReviews, translatedQty] = translatedTexts;

          setTranslatedProduct({
            name: translatedName || product.name,
            description: translatedDescription || product.description,
            price: translatedPrice || `Price: $${product.price}`,
            reviews: translatedReviews || `${product.numReviews} reviews`,
            qty: translatedQty || `Qty`,
          });
        } catch (error) {
          console.error("Error translating text:", error);
        }
      }
    };

    translateProduct();
  }, [selectedLanguage, product]);

  const addToCartAsyncHandler = () => {
    dispatch(addToCartAsync({ id: id, quantity }));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div>
      <Row>
        <Col md={6} className="my-3 p-3 rounded">
          <Image
            src={product.image}
            alt={product.name}
            fluid
            style={{
              backgroundColor: "#0c0c0c",
              border: "2px solid #21d07a",
              borderTopLeftRadius: "80px",
              borderTopRightRadius: "30px",
            }}
          />
        </Col>

        <Col className="my-3 p-3 rounded" md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item
              className="product-name"
              style={{
                backgroundColor: "#0c0c0c",
                color: "#b3b3b3",
                border: "2px solid #21d07a",
                borderTopLeftRadius: "80px",
                borderTopRightRadius: "30px",
              }}
            >
              <h3>{translatedProduct ? translatedProduct.name : product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item className="product-reviews">
              <Rating
                value={product.rating}
                text={translatedProduct ? translatedProduct.reviews : `${product.numReviews} reviews`}
                color={"#21d07a"}
              />
            </ListGroup.Item>

            <ListGroup.Item className="product-price">Price: {translatedProduct ? translatedProduct.price : `Price: $${product.price}`}</ListGroup.Item>

            <ListGroup.Item className="product-description">Description: {translatedProduct ? translatedProduct.description : product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col className="my-2 p-3 rounded" md={3}>
          <Card style={{ borderTopLeftRadius: "80px", borderTopRightRadius: "30px" }}>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{
                  backgroundColor: "#0c0c0c",
                  color: "#b3b3b3",
                  border: "2px solid #21d07a",
                  borderTopLeftRadius: "80px",
                  borderTopRightRadius: "30px",
                }}
              >
                <Col>Price:</Col>
                <Col>
                  <strong>{translatedProduct ? translatedProduct.price : `Price: $${product.price}`}</strong>
                </Col>
              </ListGroup.Item>

              <ListGroup.Item
                style={{ backgroundColor: "white", color: "gray" }}
              >
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "in stock" : "Out of stock"}
                </Col>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item
                  style={{ backgroundColor: "white", color: "gray" }}
                >
                  <Row>
                    <Col className="qty-label">Qty</Col>
                    <Col>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item
                style={{ backgroundColor: "white", color: "gray" }}
              >
                <Button
                  className="buttonSpecial"
                  disabled={product.countInStock === 0}
                  type="button"
                  onClick={addToCartAsyncHandler}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <hr className="hr hr-blurry" />{" "}
      <Link to="/">
        <Button className="buttonSpecial">HOME</Button>
      </Link>

      <Alert show={showAlert} variant="success" className="mt-3">
        Item added to cart successfully!
      </Alert>
    </div>
  );
};

export default ProductScreen;