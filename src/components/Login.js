import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const validation = () => {
    let err = true;
    const emailregex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const pwd = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    );

    if (!email || email.trim() == "") {
      setError({ email: "Required valid email address" });
      return (err = false);
    } else if (!emailregex.test(email)) {
      setError({ email: "Not a valid email address" });
      return (err = false);
    }
    if (!password || password.trim() == "") {
      setError({ password: "Required valid password" });
      return (err = false);
    } else if (!pwd.test(password)) {
      setError({
        password:
          "Your password should have at least one special charachter, digits, uppercase and lowercase character, Length: 8+ character.",
      });
      return (err = false);
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedData = localStorage.getItem("userData");
      const userData = JSON.parse(storedData);
      const { email: savedEmail, password: savedPassword } = userData;
      if (validation()) {
        if (email == savedEmail && password == savedPassword) {
          toast.success("Login Successfully");
          navigate("/dashboard");
        } else {
          toast.error("email/password is incorrect");
        }
        setError({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          {<p style={{ color: "red" }}>{error?.email}</p>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {<p style={{ color: "red" }}>{error?.password}</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login <FaUser />
        </Button>
      </Form>
      Don't have an account ? <Link to="/">Sign-up</Link>
    </>
  );
};

export default Login;
