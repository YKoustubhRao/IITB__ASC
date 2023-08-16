const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/guess/:input").get(async (req, res) => {
      console.log("koustubh");

      let {input} = req.params;
      console.log(input);
        try {
            console.log(input);
            console.log("jo");
            const nam = await pool.query(
              "Select teaches.course_id, title, sec_id from teaches, course where (year, semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and teaches.course_id =  course.course_id and (teaches.course_id ilike $1 or title ilike $1) ORDER BY teaches.course_id, sec_id DESC",['%'+input+'%']
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
