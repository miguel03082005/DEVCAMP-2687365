const express = require("express");
const mongoose = require("mongoose");
const coursesModel = require("../models/coursesModel");
const Bootcamp = require("../models/bootcampModel");
const Review = require("../models/reviewModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const curso = await coursesModel.find({}); // No filtering by bootcamp_id

    res.status(200).json({
      success: true,
      data: curso,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `error interno del servisio: ${error.message}`,
    });
  }
});

router.get("/:id/", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        msg: `Invalid ID`,
      });
    }

    const curso = await coursesModel.findById(req.params.id);

    if (!curso) {
      return res.status(400).json({
        success: false,
        msg: "curso not found",
      });
    }

    const bootcamp = await Review.find({ bootcamp_id: req.params.id });

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `error unterno del servisio: ${error.message}`,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const new_curso = await coursesModel.create(req.body);

    res.status(201).json({
      success: true,
      data: new_curso,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  const course_id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
      res.status(400).json({
        success: false,
        msg: `Invalid ID`,
      });
    }else{
      const actualizar_curso = await coursesModel.findByIdAndUpdate(
        course_id,
        req.body,
        {new: true}
      );
  
      if (!actualizar_curso) {
        res.status(400).json({
          success: false,
          msg: `curso with ID ${course_id} not found`,
        });
      }else{
        res.status(200).json({
          success: true,
          data: actualizar_curso,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Internal server error: ${error.message}`,
    });
  }
});

module.exports = router;
