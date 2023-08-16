
import React,{useState,useEffect} from 'react'
import UniNavbar from './UniNavbar';
import ScheduleFinder from '../components/api/ScheduleFinder';
import { Chart } from "react-google-charts";
import 'bootstrap/dist/css/bootstrap.css';
const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [
  [
    "CSE350",
    "Project Work",
    "Gallery-2-IICT",
    new Date(2014, 2, 22,10,0),
    new Date(2014, 2, 22,11,0),
    null,
    0,
    null,
  ],
  [
    "IPE250",
    "Engineering Graphics",
    "302-A",
    new Date(2014, 2, 22,11,0),
    new Date(2014, 2, 22,12,0),
    null,
    0,
    null,
  ],
  [
    "CSE333",
    "Database Systems",
    "331-IICT",
    
    new Date(2014, 2, 22,12,0),
    new Date(2014, 2, 22,13,0),
    null,
    0,
    null,
  ],
  [
    "CSE310",
    "Operating Systems",
    "104-IICT",
    new Date(2014, 2, 22,13,0),
    new Date(2014, 2, 22,13,30),
    null,
    0,
    null,
  ],
  [
    "BUS204D",
    "Accounting",
    "201-D",
    new Date(2014, 2, 22,13,30),
    new Date(2014, 2, 22,14,0),
    null,
    0,
    null,
  ],
  [
    "PHY301D",
    "Non-Linear Optics",
    "105-B",
    new Date(2014, 2, 22,14,0),
    new Date(2014, 2, 22,14,30),
    null,
    0,
    null,
  ],
  [
    "EEE201D",
    "Digital Logic Design",
    "405-IICT",
    
    new Date(2014, 2, 22,14,30),
    new Date(2014, 2, 22,15,0),
    null,
    0,
    null,
  ],
  [
    "CSE133",
    "Data Structures",
    "105-IICT",
    new Date(2014, 2, 22,15,0),
    new Date(2014, 2, 22,15,30),
    null,
    0,
    null,
  ],
];

export const data = [columns, ...rows];

export const options = {
  height: 400,
  gantt: {
    trackHeight: 30,
  },
};

const Schedules = () => {
  const dateHelper = (date,start)=>{
    let d = date.toISOString()
    let year = d.slice(0,4)
    let mon = d.slice(5,7)
    let day = d.slice(9,11)
    let s = start.toString()
    let sHour = s.slice(0,3)
    let sMin = s.slice(4,6)
    console.log({s,d,sHour,sMin})
    let  result =  new Date(parseInt(year),parseInt(mon),parseInt(day),parseInt(sHour)+6,parseInt(sMin))
  
    return result.toString()
  }
   const [tableData, setTableData] = useState([])
   const [rows1, setRows1] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let array = [];
      const URL_STRING = "/" + localStorage.userToken.toString();
      const response = await ScheduleFinder.get(URL_STRING);
      
      for (let x of response.data.result){
        console.log('loop')
        const {course_id, time_slot_id,date,classroom_id,start_time, end_time} = x;
        let d = new Date(date)
        d = d.toISOString()
        let year = d.slice(0,4)
        let mon = d.slice(5,7)
        let day = d.slice(9,11)
        let s = start_time.toString()
        let sHour = s.slice(0,3)
        let sMin = s.slice(4,6)
        let e = end_time.toString()
        let eHour = e.slice(0,3)
        let eMin = e.slice(4,6)
        let temp = [time_slot_id.toString(),course_id, classroom_id,new Date(parseInt(year),parseInt(mon),parseInt(day),parseInt(sHour),parseInt(sMin)),
          new Date(parseInt(year),parseInt(mon),parseInt(day),parseInt(eHour),parseInt(eMin)),null,0,null];
        setRows1(oldArray => [...oldArray,temp] )
        
      }
    }
    fetchData();
  }, []);
console.log(rows1)

  return (

    <div>
      <UniNavbar/>
      
      <div class="p-5">
        <h2>Class Schedules</h2>
        <hr/>
        <Chart
          chartType="Gantt"
          width="100%"
          height="50%"
          data={ [columns, ...rows1]}
          options={options}
        />
      </div>
      
    </div>
  )
}

export default Schedules