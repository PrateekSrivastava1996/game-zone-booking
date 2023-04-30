import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./HOC/privateRoutes";
import ProtectedRoutes from "./HOC/protectedRoutes";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import DashBoard from "./components/DashBoard";
import CheckoutPage from "./components/CheckoutPage";
import CartPage from "./components/CartPage";
import { CheckoutData } from "./components/context";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Signup />
            </ProtectedRoutes>
          }
          exact
        />
        <Route
          path="/login"
          element={
            <ProtectedRoutes>
              <Login />
            </ProtectedRoutes>
          }
          exact
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <DashBoard />
            </PrivateRoutes>
          }
          exact
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoutes>
              <CheckoutPage />
            </PrivateRoutes>
          }
          exact
        />
        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <CartPage />
            </PrivateRoutes>
          }
          exact
        />
      </Routes>
    </Router>
  );
};

export default App;
