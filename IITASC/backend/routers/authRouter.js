const express = require("express");
const validateForm = require("../controllers/validateForm");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");



router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.id) {
      res.json({ loggedIn: true, id: req.session.user.id });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validateForm(req, res);

    const potentialLogin = await pool.query(
      "SELECT ID, hashed_password FROM user_password u WHERE u.ID=$1",
      [req.body.id]
    );

    const secret_key = "tubh";
    console.log(req.body.password);


    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password+secret_key,
        potentialLogin.rows[0].hashed_password
      );
      if (isSamePass) {
        req.session.user = {
          id: potentialLogin.rows[0].id,
        };
        res.json({ loggedIn: true, id: req.body.id });
      } else {
        res.json({ loggedIn: false, status: "Wrong id or password!" });
        console.log("not good");
      }
    } else {
      console.log("not good");
      res.json({ loggedIn: false, status: "Wrong id or password!" });
    }
  });



module.exports = router;
