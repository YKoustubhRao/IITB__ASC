import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UniNavbar from "./UniNavbar";
import "../Assets/css/account.css";
import TextField from "../components/Login/TextField";


import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

//let navigate = useNavigate(); 


const columns = [
  {
    field: "course_id",
    headerName: "Course_id",
    width: 150,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    width: 360,
    editable: false,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "credit",
    headerName: "Credit",
    width: 170,
    type: "number",
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    headerName: "Type",
    width: 160,
    editable: false,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
];



const CourseRegistration = () => {


  const [input, setInput] = useState(["CS"]);
  const [runi,setRun] = useState([]);
  const id = localStorage.userToken;
  var ass = "Done";

  function handler() {
    console.log("Hope this passes");
    console.log(input);

    //navigate('/registration', { state: input });
    //window.location.reload(false);
  };

  const Registeration = async (ele) =>{
    document.getElementById("myForm").value = "";
    console.log(ele.c);
    console.log(ele.s);
    console.log(id);
    const result = await fetch(`http://localhost:4000/register/register?`+ new URLSearchParams({
      cid: ele.c,
      id:  id,
      sid: ele.s
    }));
    var kuh = await result.json();
    console.log(kuh.dum);
    if(kuh.dum == 0) ass = "Slot Clash";
    if(kuh.dum == 1) ass = "Prerequisites not met";
    window.location.reload(false);
    console.log("opiuy");
  };

  function handleChange(event){
    console.log(event.target.value);
    setInput(event.target.value);
    console.log(input);
    console.log("bitch");
  };



  useEffect(() => {

    const getResult = async () => {
      console.log("hello");

      try{

        console.log("Called");
        console.log(input);
        

        const res = await fetch(`http://localhost:4000/guess/guess/${input}`);
        const dat = await res.json();
        console.log(dat);
        setRun(dat.run);
        console.log("special");
  

      }catch(err){
        console.log(err.message);
      }


    };

    getResult();

  },[input]);






  return (
    <div>
    <div>
      <UniNavbar />
      <h1>Course Registration</h1>
      <h1>{input}</h1>
      <form>
            <label>
              Courses Offered Currently  
              <div>                     
              <input  name="Courses" id="myForm" onChange={handleChange}/>
              <button type="button" onClick={handler}>Search</button>
              </div>
            </label>
          </form> 
    </div>
    <table>
          <tbody>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
          <th>Section ID</th>
          <th>Register</th>
        </tr>
        {runi.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.course_id}</td>
              <td>{val.title}</td>
              <td>{val.sec_id}</td>
              <button onClick={() => Registeration({c:val.course_id, s:val.sec_id})}>Register</button>
            </tr>
          )
        })}
        </tbody>
      </table>
      <h1>{ass}</h1>
    </div>
  );
};

export default CourseRegistration;
