import React, { useEffect, useState } from 'react'
import  UniNavbar  from './UniNavbar'
import "../Assets/css/account.css";

import Box from "@mui/material/Box";
import { DataGrid,GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";


const columns = [
  {
    field: "course_id",
    headerName: "Course ID",
    width: 200,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "name",
    headerName: "Course Title",
    width: 380,
    sortable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "semester",
    headerName: "Semester",
    width: 150,
    type: "integer",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "credit",
    headerName: "Credit",
    type: "float",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "grade",
    headerName: "Grade",
    type: "float",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
];

// const rows = [
//   {
//     id: 0,
//     course_id: "CSE150",
//     name: "Competitive Programming",
//     semester: 1,
//     credit: 1.5,
//     grade: 3.5,
//     registration: 2018331002,
//   },
//   {
//     id: 1,
//     course_id: "CSE250",
//     name: "Project Work",
//     semester: 3,
//     credit: 1.5,
//     grade: 3.0,
//     registration: 2018331010,
//   },
//   {
//     id: 2,
//     course_id: "IPE150",
//     name: "Workshop",
//     semester: 2,
//     credit: 1.5,
//     grade: 2.5,
//     registration: 2018331020,
//   },
//   {
//     id: 3,
//     course_id: "IPE120",
//     name: "IPE Graphics",
//     semester: 3,
//     credit: 1.5,
//     grade: 3.25,
//     registration: 2018331050,
//   },
//   {
//     id: 4,
//     course_id: "CSE333",
//     name: "Database Systems",
//     semester: 5,
//     credit: 3,
//     grade: 4.0,
//     registration: 2018331054,
//   },
//   {
//     id: 5,
//     course_id: "CSE334",
//     name: "Database Systems Lab",
//     semester: 5,
//     credit: 1,
//     grade: 4.0,
//     registration: 2018331054,
//   },
//   {
//     id: 6,
//     course_id: "CSE327",
//     name: "Operating Systems",
//     semester: 5,
//     credit: 3,
//     grade: 3.75,
//     registration: 2018331002,
//   },
//   {
//     id: 7,
//     course_id: "CSE328",
//     name: "Operating Systems Lab",
//     semester: 5,
//     credit: 2,
//     grade: 3.25,
//     registration: 2018331090,
//   },
//   {
//     id: 8,
//     course_id: "CSE337",
//     name: "Operating Systems II",
//     semester: 5,
//     credit: 3,
//     grade: 3.75,
//     registration: 2018331002,
//   },
//   {
//     id: 9,
//     course_id: "CSE338",
//     name: "Operating Systems II Lab",
//     semester: 5,
//     credit: 2,
//     grade: 3.25,
//     registration: 2018331090,
//   },
//   {
//     id: 10,
//     course_id: "CSE347",
//     name: "Operating Systems III",
//     semester: 5,
//     credit: 3,
//     grade: 3.75,
//     registration: 2018331002,
//   },
//   {
//     id: 11,
//     course_id: "CSE348",
//     name: "Operating Systems III Lab",
//     semester: 5,
//     credit: 2,
//     grade: 3.25,
//     registration: 2018331090,
//   },
// ];




const Results = () => {

  const [rows,setRows] = useState([]);


  useEffect(() => {

    const getResult = async () => {

      try{

        console.log("Called");
        
        const response = await fetch(
          `http://localhost:4000/user/result/${localStorage.userToken}`
        );

        const data = await response.json();
        const {resultData} = data;

         console.log(resultData);
        resultData.forEach((x,i) => {
          x.id=i;
        });

        setRows(resultData);

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
            <h3>Result section</h3>
            <hr />
          </div>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              hideFooterPagination
              disableColumnFilter
              components={{
                Toolbar: () => {
                  return (
                    <GridToolbarContainer sx={{ justifyContent: "flex-end" }}>
                      <GridToolbarExport
                        printOptions={{ disableToolbarButton: true }}
                        csvOptions={{
                          fileName: "result",
                          delimiter: ";",
                          utf8WithBom: true,
                        }}
                      />
                    </GridToolbarContainer>
                  );
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Results;