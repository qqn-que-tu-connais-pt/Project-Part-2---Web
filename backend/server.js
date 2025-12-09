// server.js

const express = require("express");
const cors = require("cors");
const data = require("./data/items");

const app = express();
app.use(cors());

// index courant
let currentIndex = 0;

// Helpers
function buildResponse() {
  return {
    index: currentIndex,
    item: data[currentIndex],
    total: data.length
  };
}

// GET /item → item actuel
app.get("/item", (req, res) => {
  res.json(buildResponse());
});

// GET /item/next → avance
app.get("/item/next", (req, res) => {
  currentIndex = (currentIndex + 1) % data.length; // boucle
  res.json(buildResponse());
});

// GET /item/prev → recule
app.get("/item/prev", (req, res) => {
  currentIndex = (currentIndex - 1 + data.length) % data.length; // boucle
  res.json(buildResponse());
});

// GET /item/:id → accès direct (optionnel)
app.get("/item/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= data.length) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  currentIndex = id;
  res.json(buildResponse());
});

// Lancer le serveur
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
