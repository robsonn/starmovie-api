const express = require("express");
const routes = express.Router();
const PlanetController = require("../controllers/PlanetController");

routes.get("/", (req, res) => {
     return res.json({ message:"Welcome...try api/planet"})
 });
 
 routes.get("/planet", PlanetController.index); 

 routes.get("/planet/:id", PlanetController.show); 
 
 routes.post("/planet", PlanetController.save);
 
 routes.put("/planet/:id", PlanetController.update);
 
 routes.delete("/planet/:id", PlanetController.delete);
 
 module.exports = routes;