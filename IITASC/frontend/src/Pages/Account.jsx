import React from "react";
import { useState,useEffect } from "react";
import UniNavbar from "./UniNavbar";
import "../Assets/css/account.css"


const Account = () => {

 

  useEffect(() => {
     const getUserInfo = async () => {
       try {
         const response = await fetch(
           `http://localhost:4000/user/${localStorage.userToken}`
         );

         const userData= await response.json();
         const user = userData.userData[0];
         console.log(user)
         setUserData(user)
       } catch (err) {
         console.log(err.message);
       }
     };


     const getAllDepartmentInfo  = async () =>{

        try {
          const getAllDepartment = await fetch(
            `http://localhost:4000/department/all`
          );
          const departmentData =await getAllDepartment.json();
          const department = departmentData.department;
          console.log(department);

          setDepartmentData(department);

        } catch (err) {
          console.log(err.message);
        }

     };

    getAllDepartmentInfo();
    getUserInfo();
    

  },[]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dept_id: "select your Department",
    session: "",
    address: "",
    contact: "",
  });


  const [departmentData, setDepartmentData] = useState([]);


  const handleNameChange = (event) =>{
    setUserData({...userData,name:event.target.value});
  }
  const handleDepartmentChange = (event) => {
    setUserData({ ...userData, dept_id: event.target.value });
  };
  const handleEmailChange = (event) => {
    setUserData({ ...userData, email: event.target.value });
  };
  const handleSessionChange = (event) => {
    setUserData({ ...userData, session: event.target.value });
  };
  const handleContactChange = (event) => {
    setUserData({ ...userData, contact: event.target.value });
  };
  const handleAddressChange = (event) => {
    setUserData({ ...userData, address: event.target.value });
  };

  const handleChange = async (event) =>{
    event.preventDefault();
    
    try{
      
      const id=localStorage.userToken;
      const body = {userData};
      const response = await fetch(`http://localhost:4000/user/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response)
      
    }catch(err){
      console.log(err.message);
    }
  };

  return (
    <div>
      <UniNavbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="my-5">
              <h3>Profile</h3>
              <hr />
            </div>
            <form onSubmit={handleChange}>
              <div className="row mb-5 gx-5">
                <div className="col-xxl-8 mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Personal Details</h4>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Full Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          value={userData.name}
                          onChange={handleNameChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Email
                        </label>
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          value={userData.email}
                          onChange={handleEmailChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Registration Number
                        </label>
                        <input
                          name="reg"
                          type="number"
                          className="form-control"
                          value={localStorage.userToken}
                          disabled
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Department
                        </label>

                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={userData.dept_id}
                          onChange={handleDepartmentChange}
                        >
                          <option value="select department">
                            select department
                          </option>
                          {departmentData.map((data) => (
                            <option value={data.dept_id}>{data.dept_id}</option>
                          ))}

                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Session
                        </label>
                        <input
                          name="session"
                          type="text"
                          className="form-control"
                          value={userData.session}
                          onChange={handleSessionChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Address
                        </label>
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          value={userData.address}
                          onChange={handleAddressChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="">
                          Phone Number
                        </label>
                        <input
                          name="contact"
                          type="number"
                          className="form-control"
                          value={userData.contact}
                          onChange={handleContactChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-6">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="my-4">Change Password</h4>
                      <div className="col-md-6">
                        <label htmlFor="old_password" className="form-label">
                          Old Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="old_password"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="new_password" className="form-label">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="new_password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-md-flex justify-content-md-center text-center btnContainer">
                <button type="submit" className="btn btn-primary btn-lg subBtn">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
