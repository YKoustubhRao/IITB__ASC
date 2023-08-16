const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/rund/:dept_name").get(async (req, res) => {
      console.log("kolp");
      console.log(req.params);
      let id = req.params.dept_name;
      console.log(id);
      console.log("loppoo");

        try {
            console.log("jo");
            const nam = await pool.query(
            "Select teaches.course_id, title from course, teaches where (year, semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and course.course_id=teaches.course_id and course.dept_name like $1",[id]
          );
          console.log(nam.rows);
          console.log("bye");
          res.status(201).json({
            runc : nam.rows
          });
        } catch (error) {
            console.log(error);
        }
});





module.exports = router;
