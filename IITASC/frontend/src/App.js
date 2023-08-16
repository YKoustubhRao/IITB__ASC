// import UserContext from "./components/AccountContext";
// import ToggleColorMode from "./components/ToggleColorMode";
// import Views from "./components/Views";
// import React from 'react';

// function App() {
//   return (
//     <UserContext>
//       <Views />
//        {/* <ToggleColorMode /> */}
//     </UserContext>
//   );
// }

import { Text } from "@chakra-ui/layout";
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
//import Switch from "react-router";
import { AccountContext } from "./components/AccountContext";
import Login from "./components/Login/Login";
import TestLogin from "./components/Login/TestLogin";
// import SignUp from "./Login/SignUp";
// import TestSignUp from "./Login/TestSignUp";
import PrivateRoutes from "./components/PrivateRoutes";
import Home from "./Pages/Home";
import Instructor from "./Pages/Instructor"
import Course from "./Pages/Course";
import Running from "./Pages/running";
import RunningD from "./Pages/runningd";
import Account from "./Pages/Account";
import CourseRegistration from "./Pages/CourseRegistration";
import Schedules from "./Pages/Schedules";

const { Outlet, Navigate } = require("react-router");

// const Views = () => {
//   const { user } = useContext(AccountContext);
//   return user.loggedIn === null ? (
//     <Text>Loading...</Text>
//   ) : (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/login" element={<TestLogin />} />
//       <Route element={<PrivateRoutes />}>
//         <Route path="/home" element={<Home />} />
//         <Route path="/instructor" element={<Instructor />} />
//         <Route path="/Results" element={<Result />} />
//         <Route path="/Account" element={<Account />} />
//         <Route path="/CourseRegistration" element={<CourseRegistration />} />
//         <Route path="/Schedules" element={<Schedules />} />
//       </Route>
//       <Route path="*" element={<TestLogin />} />
//     </Routes>
//   );
// };

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('logged');
    console.log(u);
    setLoggedIn(false);

    if (u =='true'){
      setLoggedIn(true);
    }

  }, [localStorage.getItem('userToken')]);

  console.log("kaprekar");
  console.log(loggedIn);
  console.log(Boolean(localStorage.getItem('logged')));
  //const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const loggedUser = user;
  //   setLoggedIn(Boolean(loggedUser));
  // }, []);

  return loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    loggedIn ? (
    <Routes>
      <Route path="/login" element={<TestLogin />} />
      <Route path="/instructor/:id" element={<Instructor />} />
      <Route path="/home" element={<Home />} />
      <Route exact path="/course/:id" element={<Course />} />
      <Route exact path="/course/running" element={<Running />} />
      <Route exact path="/course/running/:dept_name" element={<RunningD />} />
      <Route path="/Account" element={<Account />} />
      <Route exact path="/home/registration" element={<CourseRegistration />} />
      <Route path="/Schedules" element={<Schedules />} />
    </Routes>) : (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<TestLogin />} />
        <Route path="*" element={<TestLogin />} />
      </Routes>
    )
  );
};

//export default Views;


export default App;