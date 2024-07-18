import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, selectProducts, selectProductLoading, selectProductError } from '../reducers/productSlice';
import withTranslation from "../hoc/withTranslation";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);


  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);


  return (
    <div>
      <div style={{ fontSize: "50px" }}>PRODUCTS</div>
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default withTranslation(HomeScreen);
