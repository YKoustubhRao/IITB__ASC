const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/register").get(async (req, res) => {
      console.log("kolpoopopop");

      const cid = req.query.cid;
      const id = req.query.id;
      const sid = req.query.sid;
      console.log(id);
      console.log(cid);
      console.log(sid);
        try {
            var dummy = 0;
            console.log("jo");
            console.log(req.query.cid);
            const nam = await pool.query(
            "Select exists ((Select time_slot_id from section where course_id = $1 and sec_id = $2) except (Select time_slot_id from takes, section where ID = $3 and (takes.year, takes.semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1) and takes.course_id = section.course_id and takes.sec_id = section.sec_id and takes.year = section.year and takes.semester = section.semester))",[cid,sid,id]
          );
          console.log(nam.rows[0].exists);
          if(nam.rows[0].exists){
            console.log("hi1");
            dummy = 1;
            const nam1 = await pool.query(
              "Select exists ((Select prereq_id from prereq where course_id = $1) except (Select course_id from takes where ID = $2 and (year, semester) not in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1)))",[cid,id]
            );
            var cont = !nam1.rows[0].exists;
            const nam4 = await pool.query(
              "Select prereq_id from prereq where course_id = $1",[cid]
            );
            console.log("lkjhgf");
            if(nam4.rowCount == 0) cont = true;
            if(cont){
              dummy = 2;
              console.log("hi2");
              const nam2 = await pool.query(
                "Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1"
              );
              console.log(nam2);
              const nam3 = await pool.query(
                "Insert into takes(ID, course_id, sec_id, semester, year, grade) values ($1, $2, $3, $4, $5, 'NA')",[id,cid,sid,nam2.rows[0].semester,nam2.rows[0].year]
              );
            }
            else{
              console.log("Prerequisite need to be filled dear");
            }
          }
          else{
            console.log("slot clash dear");
          }
          console.log("bye");
          res.status(201).json({
            dum : dummy
          });
        } catch (error) {
            console.log(error);
        }
});





module.exports = router;
