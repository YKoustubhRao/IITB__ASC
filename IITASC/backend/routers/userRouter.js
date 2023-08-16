const express = require("express");

const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");


router.route("/edit/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {name,dept_id,session,address,contact,email} = req.body.userData;
    console.log(req.body);
    const updateStudentTableData = await pool.query(
      "UPDATE student SET name = $1,dept_id = $2,session = $3,address = $4 WHERE reg_no = $5",
      [name,dept_id,session,address,id]
    );
    const updateStudentContactTableData = await pool.query(
      "UPDATE student_contact SET contact = $1 WHERE reg_no = $2",
      [contact, id]
    );
    const updateStudentEmailTableData = await pool.query(
      "UPDATE student_email SET email = $1 WHERE reg_no = $2",
      [email, id]
    );
    res.status(201).json({
      updateStudentTableData: updateStudentTableData,
      updateStudentContactTableData: updateStudentContactTableData,
      updateStudentEmailTableData: updateStudentEmailTableData
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.route("/:id").get(async (req,res) => {
  try{
    let {id} =req.params ;
    id=parseInt(id);

    const getStudentInfo = await pool.query(
      `SELECT * FROM student 
       JOIN student_contact USING (reg_no)
       JOIN student_email USING(reg_no) WHERE reg_no  = $1`,[id]
    );
    res.status(201).json({
      userData: getStudentInfo.rows,

    });
  }
  catch(err){
    res.status(400).json({
      error:err
    })
    console.log(err.message);
  }
});




router.route("/course_registration").post(async (req,res) => {

  try{


    const { usn } = req.body;
    const { courseIDs } = req.body;
    const {reg_no} = req.body ;
    console.log(req.body)
    console.log(usn);
    console.log(courseIDs);
    console.log(reg_no);

    for( const x of courseIDs ){
      const insertData = await pool.query(
        `INSERT INTO course_enrollment 
        (section_id,course_id,reg_no,grade) VALUES ($1,$2,$3,0)`,
        [usn,x,reg_no]
      ); 
    }
    console.log("successful course_enrollment");

    res.status(201).json({
      ok: "ok"
    });

  }catch(err){
    res.status(400).json({
      error: err,
    });
    console.log(err.message);
  }

});


router.route("/result/:id").get(async (req,res) => {


  let {id} = req.params;
  id = parseInt(id);

  try{

    const getAllResult = await pool.query(
      `SELECT course_id,name,semester,credit,grade FROM 
        section JOIN course_enrollment USING(section_id,course_id)
        JOIN course  USING (course_id) WHERE reg_no = $1 AND grade>0`,
      [id]
    );

    res.status(201).json({
      resultData:  getAllResult.rows,
    });
    console.log(getAllResult.rows);

  }catch(err){
    res.status(400).json({error: err});
    console.log(err.message);
  }

});



module.exports=router;