

import {  Route, Routes } from "react-router-dom";
import TaskList from "./task/TaskList";
import FeedList from "./feed/FeedList";
import MakeSidebar from "./../component/Sidebar";

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

    </>
  </Routes>
    </div>
    
    </div>
  
)
}
