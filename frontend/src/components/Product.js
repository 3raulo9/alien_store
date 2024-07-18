import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import withTranslation from "../hoc/withTranslation";


const Product = ({ product }) => {
  const [translatedName, setTranslatedName] = useState(product.name);
  const [translatedPrice, setTranslatedPrice] = useState(`$ ${product.price}`);
  const [translatedReviews, setTranslatedReviews] = useState(`${product.numReviews} reviews`);
  const [loading, setLoading] = useState(false);

  
  return (
    <Card
      className="my-4 p-2"
      style={{
        backgroundColor: "#0c0c0c",
        color: "#b3b3b3",
        border: "2px solid #21d07a",
        borderTopLeftRadius: "80px",
        borderTopRightRadius: "30px",
        borderBottomRightRadius: "20",
        borderBottomLeftRadius: "20",
      }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          style={{
            borderTopLeftRadius: "80px",
            borderTopRightRadius: "30px",
            borderBottomRightRadius: "20",
            borderBottomLeftRadius: "20",
          }}
        />
      </Link>
      <hr className="hr hr-blurry" />
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "#b3b3b3" }}
        >
          <Card.Title as="div">
            <strong>{loading ? 'Translating...' : translatedName}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">
          <Rating
            value={product.rating}
            color={"#21d07a"}
          />
          <br />
          <Card.Title as="div">
            <strong>{loading ? 'Translating...' : translatedReviews}</strong>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" height="30" width="30" id="Ethereum--Streamline-Core">
              <desc>Ethereum Streamline Icon: https://streamlinehq.com</desc>
              <g id="ethereum--crypto-circle-payment-blokchain-finance-ethereum-eth-currency">
                <path id="Subtract" stroke="#2eff99" strokeLinecap="round" strokeLinejoin="round" d="m15.3656 1.2268 10.1517 13.7839-10.1517 13.7838-10.1526-13.7837L15.3656 1.2268Z" strokeWidth="1"></path>
                <path id="Subtract_2" stroke="#2eff99" strokeLinecap="round" strokeLinejoin="round" d="M25.5169 15.011 15.3654 18.3825 5.2128 15.011" strokeWidth="1"></path>
              </g>
            </svg>
          </Card.Title>
        </Card.Text>
        <hr className="hr hr-blurry" />
        <Card.Text as="h3">{loading ? 'Translating...' : translatedPrice}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default withTranslation(Product);
