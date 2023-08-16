const express = require("express");
const router = express.Router();
const pool = require("../db");

router
  .route("/")
  .get(async (req, res) => {
    try {
        const resulltQuery = await pool.query(
        "select * from student s inner join course_enrollment e using (reg_no) inner join section se using (section_id) inner join course c using (course_id) order by s.reg_no"
      );
      res.status(200).json({
        result : resulltQuery.rows
      });
    } catch (error) {
        console.log(error);
    }
  })
  .post(async (req, res) => {
    
  });

  module.exports = router;