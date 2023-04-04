const express = require("express");

const Pet = require("../models/pet.model");
const AllPets = require("../models/user.pet.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 5;
    let search = req.query.search;

    const skip = (page - 1) * size;

    let pets, totalPages;
    if (!search) {
      pets = await Pet.find()
        .skip(skip)
        .sort({ updatedAt: -1 })
        .limit(size)
        .lean()
        .exec();

      totalPages = Math.ceil((await Pet.find().countDocuments()) / size);
    } else {
      pets = await Pet.find({ city: { $regex: search, $options: "i" } })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(size)
        .lean()
        .exec();
      totalPages = Math.ceil(pets.length / size);
    }

    return res.status(200).send({ pets, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post(
  "/listing/create",
  authenticate,
  authorise(["admin"]),
  async (req, res) => {
    try {
      const pet = await Pet.create(req.body);

      return res.send({ pet });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.get(
  "/listing/:id",

  async (req, res) => {
    try {
      const id = req.params.id;
      const pet = await Pet.findById(id).lean().exec();

      return res.send({ pet });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.patch(
  "/listing/update/:id",
  authenticate,
  authorise(["admin"]),
  async (req, res) => {
    try {
      const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();

      return res.status(201).send(pet);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

router.delete(
  "/listing/delete/:id",
  authenticate,
  authorise(["admin"]),
  async (req, res) => {
    try {
      const pet = await Pet.findByIdAndDelete(req.params.id);

      return res.status(201).send(pet);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

router.patch(
  "/status/:id",
  authenticate,
  authorise(["admin"]),
  async (req, res) => {
    try {
      const pet = await AllPets.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();

      if (pet) return res.status(400).send({ message: "Something went wrong" });

      return res.status(201).send(pet);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
);

module.exports = router;
