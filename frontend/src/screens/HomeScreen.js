import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, selectProducts, selectProductLoading, selectProductError } from '../reducers/productSlice';
import { translateBatch } from "../reducers/translatorSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const { selectedLanguage, translatedTexts } = useSelector((state) => state.translator);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLanguage) {
      const textsToTranslate = Array.from(document.body.querySelectorAll('*'))
        .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3)
        .map(el => el.innerText);

      dispatch(translateBatch({ texts: textsToTranslate, language: selectedLanguage }));
    }
  }, [selectedLanguage, dispatch]);

  useEffect(() => {
    if (translatedTexts.length > 0) {
      const textElements = Array.from(document.body.querySelectorAll('*'))
        .filter(el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3);

      textElements.forEach((el, index) => {
        el.innerText = translatedTexts[index] || el.innerText;
      });
    }
  }, [translatedTexts]);

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

export default HomeScreen;
