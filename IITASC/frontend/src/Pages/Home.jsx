import React from 'react';
import { useEffect, useState } from 'react';
import UniNavbar from './UniNavbar';
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import {userRef} from 'react';
import { DataGrid,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { lightBlue } from '@mui/material/colors';


const Home = () => {
  const [cours, setCours] = useState('');
  const [instru, setInstru] = useState('');
  console.log("hello");
  //const inputRef = userRef(null);
  var hope = "abc";
  var over = false;
  const id = localStorage.userToken;
  console.log(localStorage.userToken);

  const navigate = useNavigate();
  const [name,setName] = useState([]);
  const [dept,setDept] = useState([]);
  const [totcred,setTotalcreds] = useState([]);
  const [oldc,setOldc] = useState([]);
  const [curc,setCurc] = useState([]);

  const handleChange1 = (event) => {
    setInstru(event.target.value);
  };

  const handleChange2 = (event) => {
    setCours(event.target.value);
  };

  const goInstructor = () =>{
    //const instructor_id = '10101';
    navigate(`/instructor/${instru}`);
  }

  const goCourse = () =>{
    //const course_id = 'BIO-301';
    navigate(`/course/${cours}`);
  }

  const Registration = () =>{
    navigate(`registration`);
  }

  const Dropper = (ele) =>{
    console.log(ele);
    console.log(id);
    fetch(`http://localhost:4000/drop/drop?`+ new URLSearchParams({
      cid: ele,
      id:  id
    }));
    window.location.reload(false);
    console.log("opiuy");
  }

  //var hope ="abc";


  useEffect(() => {

    const getResult = async () => {
      console.log("hello");

      try{

        console.log("Called");
        const res = await fetch(`http://localhost:4000/student/home/${localStorage.userToken}`);
        const dat = await res.json();
        console.log(dat);
        console.log("special");
        setName(dat.name[0].name);
        setDept(dat.dept[0].dept_name);
        setTotalcreds(dat.totcred[0].tot_cred);
        setOldc(dat.oldc);
        setCurc(dat.curc);

      }catch(err){
        console.log(err.message);
      }


    };

    getResult();

  },[]);

  // const styles = {
  //   table: {
  //     border : 1 px solid,
  //   }
  // }

  return (
    <div>
      <UniNavbar />

      <div className="container">
        <div className="row">
          <div className="my-5">
            <h3>Student Information</h3>
            <hr />
          </div>
          <Box sx={{ height: 200, width: "100%" }}>
            <h3>Student ID: {id}</h3>
            <h3>Student Name: {name}</h3>
            <h3>Department Name: {dept}</h3>
            <h3>Total Credits: {totcred}</h3>
          </Box>
          <h1>Current Semester</h1>
          <table>
          <tbody>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
          <th>Section ID</th>
          <th>Semester</th>
          <th>Year</th>
          <th>Drop Button</th>
        </tr>
        {curc.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.course_id}</td>
              <td>{val.title}</td>
              <td>{val.sec_id}</td>
              <td>{val.semester}</td>
              <td>{val.year}</td>
              <td><button onClick={() => Dropper(val.course_id)}>Drop</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <h1>Previous Semester</h1>
          <table>
            <tbody>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
          <th>Section ID</th>
          <th>Grade</th>
          <th>Semester</th>
          <th>Year</th>
        </tr>
        {oldc.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.course_id}</td>
              <td>{val.title}</td>
              <td>{val.sec_id}</td>
              <td>{val.grade}</td>
              <td>{val.semester}</td>
              <td>{val.year}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
          <form>
            <label>
              Instructor ID:
              <input type="text" id ="id1" name="instructor_id" value={instru} onChange={handleChange1}/>
              <a>   </a>
              <button onClick={() => goInstructor()}>Instructor</button>
            </label>
          </form>
          <p></p>
          <form>
            <label>
              Course ID:
              <input type="text" id ="id2" name="course_id" value={cours} onChange={handleChange2}/>
              <a>   </a>
              <button onClick={() => goCourse()}>Course</button>
            </label>
          </form>
        </div>
        <br></br>
        <button onClick={() => Registration()}>Registration</button>
        <p></p>
      </div>
    </div>
  );
}


export default Home;