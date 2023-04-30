import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      toast.success("Success");
      setTimeout(() => {
        const user = { firstName, lastName, email, password };
        const jsonData = JSON.stringify(user);
        localStorage.setItem("userData", jsonData);
        navigate("/login");
      }, 1000);
    } else {
      toast.error("something went wrong");
    }
  };

  const validation = () => {
    let err = true;
    const emailregex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const pwd = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    );
    if (!firstName || firstName.trim() == "") {
      setError({ firstName: "Required firstname" });
      return (err = false);
    }
    if (!lastName || lastName.trim() == "") {
      setError({ lastName: "Required lastname" });
      return (err = false);
    }
    if (!email || email.trim() == "") {
      setError({ email: "Required valid email address" });
      return (err = false);
    } else if (!emailregex.test(email)) {
      setError({ email: "Not a valid email address" });
      return (err = false);
    }
    if (!password || password.trim() == "") {
      setError({ password: "Required password" });
      return (err = false);
    } else if (!pwd.test(password)) {
      setError({
        password:
          "Your password should have at least one special charachter, digits, uppercase and lowercase character, Length: 8+ character.",
      });
      return (err = false);
    }
    if (!confirmPassword) {
      setError({ confirmPassword: "Required confirm-password" });
      return (err = false);
    } else if (password !== confirmPassword) {
      setError({ confirmPassword: "Passwords does not match" });
      return (err = false);
    }
    return err;
  };
  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error?.firstName}</p>}

        <Form.Group controlId="email">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error?.lastName}</p>}

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error?.email}</p>}

        <Form.Group controlId="email">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error?.password}</p>}

        <Form.Group controlId="email">
          <Form.Label> Confirm-Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: "red" }}>{error?.confirmPassword}</p>}
        <Button type="submit">Signup</Button>
      </Form>
    </>
  );
}

export default SignupForm;
