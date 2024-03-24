import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom"; // Import useParams
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from 'axios';

const ProductScreen = () => {
  const { id } = useParams(); // Accessing route parameters
  const [product, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(`/api/product/${id}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProducts();
  }, [id]); // Fetch products whenever id changes


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
              style={{
                backgroundColor: "#0c0c0c",
                color: "#b3b3b3",
                border: "2px solid #21d07a",
                borderTopLeftRadius: "80px",
                borderTopRightRadius: "30px",
              }}
            >
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#21d07a"}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col
          className="my-2 p-3 rounded"
          md={3}
        
        >
          <Card   style={{ borderTopLeftRadius: "80px", borderTopRightRadius: "30px" }}> 
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
                  <strong>${product.price}</strong>
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

              <ListGroup.Item
                style={{ backgroundColor: "white", color: "gray" }}
              >
                <button
                  className="buttonSpecial"
                  disabled={product.countInStock === 0}
                  type="button"
                >
                  Add to cart
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <hr class="hr hr-blurry" />{" "}
      <Link to="/">
        <button class="buttonSpecial">HOME</button>
      </Link>
    </div>
  );
};

export default ProductScreen;
