const express = require("express");
const router = express.Router();
const pool = require("../db");

router
  .route("/")
  .get(async (req, res) => {
    try {
        const resulltQuery = await pool.query(
        "select * from course_enrollment inner join time_slot using(section_id,course_id) where reg_no = $1 and grade = 0",
        [req.body.reg_no]
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

  router.route("/:reg_no").get(async (req, res) =>{
    try {
        const resulltQuery = await pool.query(
        "select * from course_enrollment inner join time_slot using(section_id,course_id) where reg_no = $1 and grade = 0",
        [req.params.reg_no]
      );
      res.status(200).json({
        result : resulltQuery.rows
      });
    } catch (error) {
        console.log(error);
    }
  });

  module.exports = router;