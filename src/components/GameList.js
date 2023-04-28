import React from "react";
import { Card, Button } from "react-bootstrap";

const GameList = ({ games, addToCart, items }) => {
  const handleCart = (game) => {
    // addToCart(game);
    const existingItem = items.find((item) => item?.title === game?.title);
    if (existingItem) {
      const updatedItems = items.map((item) => {
        if (item?.title === game?.title) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      addToCart(updatedItems);
    } else {
      addToCart([...items, { game }]);
    }
  };
  return (
    <>
      {" "}
      {games.map((game, index) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={game.poster}
            style={{ height: "100px", width: "150px" }}
          />
          <Card.Body>
            <Card.Title>{game.title}</Card.Title>
            <Card.Text>
              <div className="image-container d-flex justify-content-start m-3">
                <p>{game.price}</p>
              </div>
            </Card.Text>
            <Button variant="primary" onClick={() => handleCart(game)}>
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
