const express = require("express");

const AllPets = require("../models/user.pet.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.get("/all/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pets = await AllPets.find({ user_id: id })
      .sort({ updatedAt: -1 })
      .lean()
      .exec();

    return res.send(pets);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const pets = await AllPets.find().sort({ updatedAt: -1 }).lean().exec();

    return res.send(pets);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "/create",
  authenticate,
  authorise(["admin", "user"]),
  async (req, res) => {
    try {
      const pet = await AllPets.create(req.body);

      return res.send({ pet });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get(
  "/:id",
  authenticate,
  authorise(["admin", "user"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const pets = await AllPets.findById(id).lean().exec();

      return res.send(pets);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

module.exports = router;
