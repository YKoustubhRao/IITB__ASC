import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import UniNavbar from './UniNavbar';
import Box from "@mui/material/Box";
import { DataGrid,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

//let navigate = useNavigate(); 


const Instructor = () => {
  console.log("hello");
  const id = localStorage.userToken;
  let instructor_id = Object.values(useParams())[0];
  //let instructor_id = '10101';
  console.log(instructor_id);
  console.log(localStorage.userToken);
  const [name,setName] = useState([]);
  const [dept,setDept] = useState([]);
  const [curc,setCurc] = useState([]);
  const [oldc,setOldc] = useState([]);

  function handler(e) {
    e.preventDefault();
    console.log("Hope this ");
    console.log(e.target.id);
    const input = '/course/'+e.target.id;
    window.location.replace(input);

    //navigate('/registration', { state: input });
    //window.location.reload(false);
  };

  useEffect(() => {

    const getResult = async () => {
      console.log("hello");

      try{

        console.log("Called");
        console.log(instructor_id);
        const res = await fetch(`http://localhost:4000/instructor/instructor/${instructor_id}`);
        const dat = await res.json();
        console.log(dat);
        console.log("special");
        setName(dat.name[0].name);
        setDept(dat.dept[0].dept_name);
        // setTotalcreds(dat.totcred[0].tot_cred);
        setCurc(dat.curc);
        setOldc(dat.oldc);
  

      }catch(err){
        console.log(err.message);
      }


    };

    getResult();

  },[]);

  
  return (
    <div>
      <UniNavbar />

      <div className="container">
        <div className="row">
          <div className="my-5">
            <h3>Instructor Information</h3>
            <hr />
          </div>
          <Box sx={{ height: 150, width: "100%" }}>
          <h2>Instructor Name: {name}</h2>
          <h2>Department Name: {dept}</h2>
          </Box>
        </div>
      <h2>Current Courses</h2>
      <table>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
          <th>GOTO</th>
        </tr>
        {curc.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.course_id}</td>
              <td>{val.title}</td>
              <button id={val.course_id} type="button" onClick={handler}>GoTo</button>
            </tr>
          )
        })}
      </table>
      <p><br></br></p>
        <h2>Old Courses</h2>
          <table>
        <tr>
        <th>Course ID</th>
          <th>Title</th>
          <th>GOTO</th>
        </tr>
        {oldc.map((val, key) => {
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
    </div>
  );
}


export default Instructor;