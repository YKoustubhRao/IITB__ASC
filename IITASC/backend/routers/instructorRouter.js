const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/instructor/:id").get(async (req, res) => {
      console.log("kolp");

      let {id} = req.params;
      console.log(id);
        try {
            console.log(id);
            console.log("jo");
            const nam = await pool.query(
            "select name from instructor s where s.ID=$1",[id]
          );
          const dep = await pool.query(
            "select dept_name from instructor s where s.ID=$1",[id]
          );
          console.log(dep);
          const cur = await pool.query(
            "Select teaches.course_id, title from teaches, course where teaches.course_id = course.course_id and (year, semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and teaches.ID = $1 ORDER BY teaches.course_id",[id]
          );
          console.log("god");
          console.log(cur);
          const old = await pool.query(
            "Select teaches.course_id, title from teaches, course where teaches.course_id = course.course_id and (year, semester) not in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and teaches.ID = $1 ORDER BY year, CASE WHEN semester ilike 'Fall' THEN 3 WHEN semester ilike 'Summer' THEN 2 WHEN semester ilike 'Spring' THEN 1 END, teaches.course_id DESC",[id]
            //"With running_sem(year, semester) as (Select TOP 1 year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC) Select teaches.course_id, title from teaches, course where teaches.course_id=course.course_id and (year, semester) in running_sem and teaches.ID = $1 ORDER BY teaches.course_id;",[id]
          );
          console.log(cur.rows);
          console.log("bye");
          res.status(201).json({
            name : nam.rows,
            dept: dep.rows,
            curc: cur.rows,
            oldc: old.rows
          });
        } catch (error) {
            console.log(error);
        }
     });



module.exports = router;
