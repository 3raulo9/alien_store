import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
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
      <hr class="hr hr-blurry" />
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ textDecoration: "none", color: "#b3b3b3" }}
        >
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">
          <Rating
            value={product.rating}
            color={"#21d07a"}
          /><br />
          <Card.Title as="div">
            <strong>{product.numReviews} reviews</strong> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" height="30" width="30" id="Ethereum--Streamline-Core"><desc>Ethereum Streamline Icon: https://streamlinehq.com</desc><g id="ethereum--crypto-circle-payment-blokchain-finance-ethereum-eth-currency"><path id="Subtract" stroke="#2eff99" stroke-linecap="round" stroke-linejoin="round" d="m15.365635714285714 1.2268071428571428 10.15172142857143 13.783864285714285 -10.15172142857143 13.78375714285714 -10.152621428571429 -13.783735714285713L15.365635714285714 1.2268071428571428Z" stroke-width="1"></path><path id="Subtract_2" stroke="#2eff99" stroke-linecap="round" stroke-linejoin="round" d="M25.51692857142857 15.010992857142858 15.365378571428572 18.382457142857145 5.212757142857143 15.011014285714285" stroke-width="1"></path></g></svg>
          </Card.Title>
        </Card.Text>
        <hr class="hr hr-blurry" />
        <Card.Text as="h3">$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
