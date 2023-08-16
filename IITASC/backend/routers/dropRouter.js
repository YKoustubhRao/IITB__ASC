const express = require("express");
const router = express.Router();
const pool = require("../db");
;



router.route("/drop").get(async (req, res) => {
      console.log("kolpoop");

      const cid = req.query.cid;
      const id = req.query.id;
      console.log(id);
      console.log(cid);
        try {
            const dummy = 0;
            console.log("jo");
            console.log(req.query.cid);
            const nam = await pool.query(
            "Delete from takes where course_id = $1 and ID = $2 and (year, semester) in (Select year, semester from reg_dates where CURRENT_TIMESTAMP >= start_time ORDER BY start_time DESC limit 1)",[cid, id]
          );
          console.log("bye");
          res.status(201).json({
            dum : dummy
          });
        } catch (error) {
            console.log(error);
        }
});





module.exports = router;
