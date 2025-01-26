

import {  Route, Routes } from "react-router-dom";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import Register from "./Register";

export default function index() {
  return (
    <Routes>
    <>
    <Route  path="/" element={<Login/>} /> 
    <Route path="/signup" element={<Register/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>

    </>
  </Routes>
)
}
