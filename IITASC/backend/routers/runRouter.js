const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/running").get(async (req, res) => {
      console.log("kolp");

        try {
            console.log("jo");
            const nam = await pool.query(
            "Select distinct dept_name from course, teaches where (year, semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and teaches.course_id = course.course_id"
          );
          console.log(nam.rows);
          console.log("bye");
          res.status(201).json({
            run : nam.rows
          });
        } catch (error) {
            console.log(error);
        }
});





module.exports = router;
