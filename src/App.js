import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./HOC/privateRoutes";
import ProtectedRoutes from "./HOC/protectedRoutes";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <>
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
              <ProtectedRoutes>
                <DashBoard />
              </ProtectedRoutes>
            }
            exact
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
