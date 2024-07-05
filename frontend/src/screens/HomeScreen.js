// src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import { fetchProducts } from '../APIS/productAPI';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function getProducts() {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <div style={{ fontSize: "50px" }}>PRODUCTS</div>
      <br />
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
