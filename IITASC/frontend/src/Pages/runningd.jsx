import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import UniNavbar from './UniNavbar';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { DataGrid,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";


const RunningD = () => {
  console.log("hello");
  const id = localStorage.userToken;
  var param = useParams();
  var dept_name = Object.values(param)[0];
  console.log(dept_name);

  function handler(e) {
    e.preventDefault();
    console.log("Hope this ");
    console.log(e.target.id);
    const input = '/course/'+e.target.id;
    console.log(input);
    window.location.replace(input);

    //navigate('/registration', { state: input });
    //window.location.reload(false);
  };


  const [runc,setRunc] = useState([]);
//   const [credits,setCredits] = useState([]);


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

        const res = await fetch(`http://localhost:4000/rund/rund/${dept_name}`);
        const dat = await res.json();
        console.log(dat);
        setRunc(dat.runc);
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
      <h2>Running Courses This Semester</h2>
          <table>
        <tr>
        <th>Course ID</th>
          <th>Title</th>
          <th>GOTO</th>
        </tr>
        {runc.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.course_id}</td>
              <td>{val.title}</td>
              <button id={val.course_id} type="button" onClick={handler}>GoTo</button>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default RunningD;