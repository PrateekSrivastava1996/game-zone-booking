import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FinalCheckModal from "./FinalCheckModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const locations = [
    {
      Id: 1,
      name: "Baghajatin, Kolkata, WB",
      Distance: "10",
    },
    { Id: 2, name: "Garia, Kolkata, WB", Distance: "20" },
    { Id: 3, name: "Sealdaha, Kolkata, WB", Distance: "15" },
    { Id: 4, name: "Jadavpur, Kolkata, WB", Distance: "25" },
  ];
  const paymethod = ["cod", "credit-card", "upi"];
  const [details, setDetails] = useState({
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    setupDate: "",
    setupTime: "",
    location: "",
    payment: "",
  });
  const {
    startTime,
    endTime,
    startDate,
    endDate,
    setupDate,
    setupTime,
    location,
    payment,
  } = details;
  const [date, setDate] = useState("");
  const [error, setError] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    toast.success("Success");
    setTimeout(() => {
      setShow(false);
      setDetails({});
      navigate("/dashboard");
      localStorage.removeItem("count");
      localStorage.removeItem("cartItems");
    }, 1000);
  };
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    // perform checkout process
    if (validation()) {
      handleShow();
    }
  };
  const validation = () => {
    let err = {};
    let isValid = true;
    if (!startDate) {
      isValid = false;
      err["startDate"] = "required**";
    } else if (!startTime) {
      isValid = false;
      err["startTime"] = "required**";
    } else if (!endDate) {
      isValid = false;
      err["endDate"] = "required**";
    } else if (!endTime) {
      isValid = false;
      err["endTime"] = "required**";
    } else if (!setupDate) {
      isValid = false;
      err["setupDate"] = "required**";
    } else if (
      setupDate &&
      startDate &&
      setupDate.split("-")[2] < startDate.split("-")[2] - 1
    ) {
      isValid = false;
      err["setupDate"] =
        "Please choose set-up time before the start time NNDNJDFNJF";
    } else if (!setupTime) {
      isValid = false;
      err["setupTime"] = "required**";
    } else if (
      setupTime &&
      startTime &&
      setupDate == startDate &&
      setupTime > startTime
    ) {
      isValid = false;
      err["setupTime"] = "Please choose set-up time before the start time";
    } else if (!location) {
      isValid = false;
      err["location"] = "required**";
    } else if (!payment) {
      isValid = false;
      err["payment"] = "required**";
    }
    setError(err);
    return isValid;
  };
  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    setDate(today);
  }, []);
  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            min={date}
            value={startDate}
            onChange={(e) =>
              setDetails({ ...details, startDate: e.target.value })
            }
          />
          <p style={{ color: "red" }}>{error?.startDate}</p>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) =>
              setDetails({ ...details, startTime: e.target.value })
            }
          />
          <p style={{ color: "red" }}>{error?.startTime}</p>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="date"
            min={startDate}
            value={endDate}
            onChange={(e) =>
              setDetails({ ...details, endDate: e.target.value })
            }
          />
          <p style={{ color: "red" }}>{error?.endDate}</p>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>End Time:</Form.Label>
          <Form.Control
            type="time"
            value={endTime}
            onChange={(e) =>
              setDetails({ ...details, endTime: e.target.value })
            }
          />
          <p style={{ color: "red" }}>{error?.endTime}</p>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Setup Date:</Form.Label>
          <Form.Control
            type="date"
            min={date}
            max={startDate}
            value={setupDate}
            onChange={(e) =>
              setDetails({ ...details, setupDate: e.target.value })
            }
          />
          <p style={{ color: "red" }}>{error?.setupDate}</p>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Setup Time:</Form.Label>
          <Form.Control
            type="time"
            value={setupTime}
            onChange={(e) =>
              setDetails({ ...details, setupTime: e.target.value })
            }
          />
          <p style={{ color: "red" }}>{error?.setupTime}</p>
        </Form.Group>
        <Form.Select
          controlId="location"
          value={location}
          onChange={(e) => setDetails({ ...details, location: e.target.value })}
        >
          <option value="">select location</option>
          {locations.map((item, index) => (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <p style={{ color: "red" }}>{error?.location}</p>
        <Form.Group controlId="payment">
          <Form.Label>Payment method:</Form.Label>
          <div className="mb-3 ">
            {paymethod?.map((pay, index) => (
              <>
                <input
                  name="payment"
                  value={pay}
                  type="radio"
                  key={index}
                  onChange={(e) =>
                    setDetails({ ...details, payment: e.target.value })
                  }
                />
                <label for="html">{pay}</label>
              </>
            ))}
          </div>
          <p style={{ color: "red" }}>{error?.payment}</p>
        </Form.Group>
        <Button variant="primary" type="submit">
          Checkout
        </Button>
      </Form>
      <FinalCheckModal
        handleClose={handleClose}
        show={show}
        details={details}
        locations={locations}
      />
    </>
  );
};

export default CheckoutPage;
