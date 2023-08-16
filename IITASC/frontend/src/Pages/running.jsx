import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import UniNavbar from './UniNavbar';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { DataGrid,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";


const Running = () => {
  console.log("hello");
  const id = localStorage.userToken;
  // var param = useParams();
  // var course_id = Object.values(param)[0];
  //let instructor_id = '10101';
  // console.log(course_id);
  // console.log(localStorage.userToken);
  const [run,setRun] = useState([]);
//   const [credits,setCredits] = useState([]);
//   const [prereq,setPrereq] = useState([]);
//   const [inst,setInstructor] = useState([]);

//   const navigate = useNavigate();

//   function goCourse(e){
//     //const course_id = 'BIO-101';
//     navigate(`/course/${e.target.id}`);
//   }

  function goDepartment(e){
    //const course_id = 'BIO-101';
    console.log(e.target.id);
    const input = '/course/running/' + e.target.id;
    console.log(input);
    window.location.replace(input);
    //console.log("babes");
  }

//   function Running(e){
//     console.log("opl");
//     navigate(`/home`);
//   }


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

        const res = await fetch(`http://localhost:4000/run/running`);
        const dat = await res.json();
        console.log(dat);
        setRun(dat.run);
        // setCredits(dat.credits[0].credits);
        // setPrereq(dat.prereq);
        // setInstructor(dat.instructors);
        // console.log("special");
  

      }catch(err){
        console.log(err.message);
      }


    };

    getResult();

  },[]);
  
  console.log("hope");

  
  return (
    <div>
      <UniNavbar />
      <h2>Departments Offering Course This Semester</h2>
        <table>
          <tbody>
        <tr>
          <th>Department Name</th>
          <th>Visit</th>
        </tr>
        {run.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.dept_name}</td>
              <td><button id={val.dept_name} type="button" onClick={goDepartment}>GoTo</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default Running;