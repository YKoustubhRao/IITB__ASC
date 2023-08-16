const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/course/:id").get(async (req, res) => {
      console.log("kolp");

      let {id} = req.params;
      console.log(id);
        try {
            console.log(id);
            console.log("jo");
            const nam = await pool.query(
            "select title from course s where s.course_id=$1",[id]
          );
          const cre = await pool.query(
            "select credits from course s where s.course_id=$1",[id]
          );
          const pre = await pool.query(
            "select prereq.prereq_id, course.title from course, prereq where prereq.course_id=$1 and prereq.prereq_id=course.course_id",[id]
          );
          const inst = await pool.query(
            "Select distinct teaches.ID, name from teaches, instructor where teaches.ID = instructor.ID and teaches.course_id = $1 and not exists ((Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) except (Select year, semester from teaches where course_id = $1))",[id]
          );
          console.log(nam.rows);
          console.log("bye");
          res.status(201).json({
            name : nam.rows,
            credits: cre.rows,
            prereq: pre.rows,
            instructors: inst.rows
          });
        } catch (error) {
            console.log(error);
        }
});





module.exports = router;
