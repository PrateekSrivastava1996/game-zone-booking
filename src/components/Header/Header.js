import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Header = ({ count }) => {
  return (
    <>
      <FaShoppingCart />
      <span>{count}</span>
    </>
  );
};

export default Header;
