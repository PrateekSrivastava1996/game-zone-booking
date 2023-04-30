import React from "react";
import { Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GameList = ({ games, addToCart, items }) => {
  const handleCart = (game) => {
    toast.success("Added Successfully");
    setTimeout(() => {
      addToCart(game);
    }, 1000);
  };
  return (
    <>
      <ToastContainer />{" "}
      {games.map((game, index) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={game.poster}
            style={{ height: "100px", width: "150px" }}
          />
          <Card.Body>
            <Card.Title>Title: {game.title}</Card.Title>
            <Card.Text>
              <div className="image-container d-flex justify-content-start m-3">
                <p>$Price: {game.price}</p>
              </div>
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => handleCart(game)}
              style={{ cursor: "pointer" }}
            >
              Add to Cart
            </Button>
          </Card.Body>
          <hr />
        </Card>
      ))}
    </>
  );
};

export default GameList;
