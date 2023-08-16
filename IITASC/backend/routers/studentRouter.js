const express = require("express");
const router = express.Router();
const pool = require("../db");



router.route("/home/:id").get(async (req, res) => {
      console.log("kolp");

      let {id} = req.params;
      console.log(id);
        try {
            console.log(id);
            console.log("jo");
            const nam = await pool.query(
            "select name from student s where s.ID=$1",[id]
          );
          const dep = await pool.query(
            "select dept_name from student s where s.ID=$1",[id]
          );
          const totcre = await pool.query(
            "select tot_cred from student s where s.ID=$1",[id]
          );
          const old = await pool.query(
            "With courses_taken(course_id, sec_id, semester, year, grade) as (Select course_id, sec_id, semester, year, grade from takes as T where T.ID = $1 and (T.year, T.semester) not in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time or CURRENT_TIMESTAMP < start_time ORDER BY start_time DESC limit 1)) Select courses_taken.course_id, title, sec_id, grade, semester, year from courses_taken, course where courses_taken.course_id = course.course_id ORDER BY year, CASE WHEN semester ilike 'Fall' THEN 3 WHEN semester ilike 'Summer' THEN 2 WHEN semester ilike 'Spring' THEN 1 END, courses_taken.course_id DESC",[id]
          );
          const cur = await pool.query(
            "With courses_taken(course_id, sec_id, year, semester) as (Select course_id, sec_id, year, semester from takes as T where (T.year, T.semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and T.ID = $1) Select course.course_id, title, sec_id, year, semester from courses_taken, course where courses_taken.course_id = course.course_id ORDER BY course.course_id DESC;",[id]
          );
          console.log(nam.rows);
          console.log("bye");
          res.status(201).json({
            name : nam.rows,
            dept: dep.rows,
            totcred: totcre.rows,
            oldc: old.rows,
            curc: cur.rows
          });
        } catch (error) {
            console.log(error);
        }
     });



module.exports = router;
