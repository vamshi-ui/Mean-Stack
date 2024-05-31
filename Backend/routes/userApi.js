const express = require("express");
const router = express.Router();
const { User } = require("../models/userSchema");
// const mongoose = require('mongoose');
const connection = require("../connection");
require("dotenv").config();
const multer = require("multer");

//Image File storage configuration
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invlid Image Type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/userprofiles");
  },
  filename: function (req, file, cb) {
    const fName = file.originalname.split(" ").join("-");
    const fileName = fName.split(".")[0];
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/getAllUsers", async (req, res) => {
  const users = await User.find();
  if (users.length > 0) {
    res.status(200).send({
      message: "success",
      data: users,
    });
  } else {
    res.status(200).send({
      message: "no users found",
      data: [],
    });
  }
});

router.post("/register", uploadOptions.single("image"), async (req, res) => {
  const newUser = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).send({
      message: "No Image was found in request",
    });
  }

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/userprofiles/`;

  const user = new User({
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    password: newUser.password,
    address: newUser.address,
    email: newUser.email,
    mobile: newUser.mobile,
    image: `${basePath}${fileName}`
  });

  const registedUser = await user.save();
  if (registedUser) {
    res.status(200).send({
      message: "success",
      data: registedUser,
    });
  } else {
    res.status(200).send({
      message: "something went wrong...",
      data: [],
    });
  }
});

module.exports = router;
