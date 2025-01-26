

import {  Route, Routes } from "react-router-dom";
import TaskList from "./task/TaskList";
import FeedList from "./feed/FeedList";
import MakeSidebar from "../component/SideBar";

export default function index() {
  return (


    <div className="flex flex-row flex-1">

    <MakeSidebar/>
    <div className="flex flex-1 ">
    <Routes>
    <>
    <Route path="/" element={<TaskList/>}/>
    <Route path="/task" element={<TaskList/>}/>
    <Route path="/feed" element={<FeedList/>}/>
    {/* <Route path="/passwordchange" element={<ForgetPassword/>}/> */}

    </>
  </Routes>
    </div>
    
    </div>
  
)
}
