import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import UniNavbar from './UniNavbar';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { DataGrid,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";


const Course = () => {
  console.log("hello");
  const id = localStorage.userToken;
  var param = useParams();
  var course_id = Object.values(param)[0];
  //let instructor_id = '10101';
  console.log(course_id);
  console.log(localStorage.userToken);
  const [name,setName] = useState([]);
  const [credits,setCredits] = useState([]);
  const [prereq,setPrereq] = useState([]);
  const [inst,setInstructor] = useState([]);

  const navigate = useNavigate();

  function goCourse(e){
    //const course_id = 'BIO-101';
    navigate(`/course/${e.target.id}`);
  }

  function goInstructor(e){
    //const course_id = 'BIO-101';
    navigate(`/instructor/${e.target.id}`);
  }

  function Running(e){
    console.log("opl");
    navigate(`/course/running`);
  }


  useEffect(() => {

    const getResult = async () => {
      console.log("hello");

      try{

        console.log("Called");
        

        // fetch(`http://localhost:4000/course/course/${course_id}`).then(res=>res.json()).then(res=>{
        //   console.log(res);
        //   const data = Object.values(res);
        //   console.log(data);
        // });

        const res = await fetch(`http://localhost:4000/course/course/${course_id}`);
        const dat = await res.json();
        console.log(dat);
        setName(dat.name[0].title);
        setCredits(dat.credits[0].credits);
        setPrereq(dat.prereq);
        setInstructor(dat.instructors);
        console.log("special");
  

      }catch(err){
        console.log(err.message);
      }


    };

    getResult();

  },[course_id]);
  
  console.log("hope");
  console.log(course_id);

 
  
  return (
    <div>
      <UniNavbar />

      <div className="container">
        <div className="row">
          <div className="my-5">
            <h3>Course Basic Information</h3>
            <hr />
          </div>
          <Box sx={{ height: 200, width: "100%" }}>
            <h2>Course ID: {course_id}</h2>
            <h2>Course Name: {name}</h2>
            <h2>Course Credits: {credits}</h2>
            <td><button type="button" onClick={Running}>Running</button></td>
          </Box>
        </div>
        <h2>Prerequisites</h2>
        <table>
          <tbody>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
        </tr>
        {prereq.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.prereq_id}</td>
              <td>{val.title}</td>
              <td><button id={val.prereq_id} type="button" onClick={goCourse}>GoTo</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <h2>Instructors</h2>
        <table>
          <tbody>
        <tr>
          <th>Instructor ID</th>
          <th>Instructor Name</th>
        </tr>
        {inst.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td><button id={val.id} type="button" onClick={goInstructor}>GoTo</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Course;