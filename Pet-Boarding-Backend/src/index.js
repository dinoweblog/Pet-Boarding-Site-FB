const express = require("express");
const cors = require("cors");
const { register, login } = require("./controllers/auth.controller");
const petController = require("./controllers/pet.controller");
const userPetController = require("./controllers/user.pet.controller");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.post("/register", register);
app.post("/login", login);

app.use("/", petController);

app.use("/pets", userPetController);

module.exports = app;
