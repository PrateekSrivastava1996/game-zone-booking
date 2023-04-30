import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const CartPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("count")));

  console.log(count, ":::cx");
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-summary">
        <p>Total available cart items: {count || 0}</p>
        <h4>{!count ? "Cart is empty" : null}</h4>

        {!count ? (
          <Button onClick={() => navigate("/dashboard")}>
            Add items to cart
          </Button>
        ) : (
          <Button onClick={() => navigate("/checkout")}>Next Page</Button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
