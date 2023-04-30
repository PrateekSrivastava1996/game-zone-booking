import { useState, useEffect, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const FinalCheckModal = ({ handleClose, show, details, locations }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const duration = new Date(details?.endDate) - new Date(details?.startDate);
    const daysDuration = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hoursDuration = Math.floor((duration / (1000 * 60 * 60)) % 24);
    setDays(daysDuration);
    setHours(hoursDuration);
  }, [details]);

  let data = locations.filter((loc) => loc.name == details.location);
  let totalDistance = data && data[0] && data[0]?.Distance;
  const handleTransportCost = () => {
    let distance = parseInt(totalDistance) + parseInt(totalDistance);
    let dis = 1500;
    if (distance > 30) {
      let calc = distance - 30;
      return (calc *= 50) + dis;
    }
    return dis;
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      {/* <Modal.Header closeButton> */}
      <Modal.Title>Order Details</Modal.Title>
      {/* </Modal.Header> */}
      <Modal.Body>
        <ul>
          <li>Event Start date:- {details?.startDate}</li>
          <li>
            Event Start time:-
            {details?.startTime}
          </li>
          <li> Event End date:- {details?.endDate}</li>
          <li>
            Event End time:-
            {details?.endTime}
          </li>
          <li>Setup date:- {details?.setupDate}</li>
          <li>Setup time:- {details?.setupTime}</li>
          <li> Event Location:- {details?.location}</li>
          <li>Transport charge:- {handleTransportCost()}</li>
          <li>Total Distance of your selected location:- {totalDistance} km</li>
          <li>Days the event is going on:- {days} days</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinalCheckModal;
