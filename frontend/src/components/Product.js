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
            <strong>{product.numReviews} reviews</strong>
          </Card.Title>
        </Card.Text>
        <hr class="hr hr-blurry" />
        <Card.Text as="h3">$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
