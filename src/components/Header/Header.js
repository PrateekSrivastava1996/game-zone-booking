import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ count, setShow }) => {
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer />
      <div
        style={{
          cursor: "pointer",
          position: "relative",
          top: "-6px",
          right: "-1150px",
        }}
      >
        <FaShoppingCart onClick={() => navigate("/cart")} />
        <span> {count || 0}</span>
        <Button
          style={{ marginLeft: "20px" }}
          onClick={() => {
            toast.success("Logged out");
            setTimeout(() => {
              localStorage.clear();
              navigate("/login");
            }, 1000);
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default Header;
