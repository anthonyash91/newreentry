const express = require("express");

const {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse
} = require("../controllers/courseController");

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);
router.patch("/:id", updateCourse);

module.exports = router;
