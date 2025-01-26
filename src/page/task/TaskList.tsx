import { useContext, useEffect, useState } from "react";
import { TaskComponent } from "./TaskComponent";
import { DragDropContext } from 'react-beautiful-dnd';
import Modal from "../../component/Model";
import axios from "axios";
import { TASK_URL } from "../../config/URL";
import { ToastContainer, toast } from 'react-toastify';
import { authContext } from "../../App";



export default function TaskList() {

const auth:any= useContext(authContext)

  const [title, settitle] = useState<String|undefined>(undefined)
  const [description, setdescription] = useState<String|undefined>(undefined)
  //pending
  const [list1, setList1] = useState([])
  //Completed
  const [list2, setList2] = useState([])
  //Done
  const [list3, setList3] = useState([])
  const [taskCreateModel, settaskCreateModel] = useState(false)



useEffect(()=>{
fetchTask()
},[])



async function fetchTask(){
  try {
 const res:any= await  axios.get(TASK_URL+`/${auth?.user?._id}`)
 if(res.data.success){
  console.log("pending",res?.data?.task?.filter((i:any)=>i?.Status==="Pending"))
  setList1(res?.data?.task?.filter((i:any)=>i?.Status==="Pending"))
  setList3(res?.data?.task?.filter((i:any)=>i?.Status==="Completed"))
  setList2(res?.data?.task?.filter((i:any)=>i?.Status==="Done"))
 }
  } catch (error) {
   console.log(error)
   toast("Something went worng")

  }
 }

 async function updateTaskStatus(taskId,status){

  // enum : ['Pending','Completed','Done',"Delete"],

try {
  let payload={
    Status:status
  }
  const res:any= await  axios.patch(TASK_URL+`/${taskId}`,payload)
  if(res?.data?.success){
    fetchTask()
    toast("Status update successfully")
  }

} catch (error) {
  console.log(error)
}

 }



  const deleteItem = (list: any, index: any) => {
    return list.splice(index, 1)
  }

  // Function called when Drag Ends
  const onDragEnd = (result: any) => {
    // getting the source and destination object
    const { source, destination } = result
    if (!destination)
      return;
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "Pending_drop_area") {
        let tempList = list1
        const removed = deleteItem(tempList, source.index)
        tempList.splice(destination.index, 0, removed)
        setList1(tempList)
      } else if (source.droppableId === "Completed_drop_area") {
        let tempList = list3
        const removed = deleteItem(tempList, source.index)
        tempList.splice(destination.index, 0, removed)
        setList3(tempList)
      }
      else {
        let tempList = list2
        const removed = deleteItem(tempList, source.index)
        tempList.splice(destination.index, 0, removed)
        setList2(tempList)
      }
      fetchTask()
    } else {
      let tempList1 = list1
      let tempList2 = list2
      let tempList3 = list3

      if (source.droppableId === "Pending_drop_area") {
        const removed = deleteItem(tempList1, source.index)
        console.log("removed",removed)
        if (destination.droppableId === "Completed_drop_area") {
          updateTaskStatus(removed?.[0]._id,"Completed")
          tempList3.splice(destination.index, 0, removed)
        } else {
          updateTaskStatus(removed?.[0]._id,"Done")
          tempList2.splice(destination.index, 0, removed)
          
        }
        setList1(tempList1)
        setList2(tempList2)
        setList3(tempList3)
      } else if (source.droppableId === "Completed_drop_area") {
        const removed = deleteItem(tempList3, source.index)
        if (destination.droppableId === "Pending_drop_area") {
          updateTaskStatus(removed?.[0]._id,"Pending")

          tempList1.splice(destination.index, 0, removed)
        } else {
          updateTaskStatus(removed?.[0]._id,"Done")

          tempList2.splice(destination.index, 0, removed)
        }
        setList1(tempList1)
        setList2(tempList2)
        setList3(tempList3)
      } else {
        const removed = deleteItem(tempList2, source.index)
        if (destination.droppableId === "Pending_drop_area") {
          updateTaskStatus(removed?.[0]._id,"Pending")

          tempList1.splice(destination.index, 0, removed)
        } else {
          updateTaskStatus(removed?.[0]._id,"Completed")

          tempList3.splice(destination.index, 0, removed)
        }
        setList1(tempList1)
        setList2(tempList2)
        setList3(tempList3)

      }
    }
  }




  async function createTask(){
   try {
  let payload={title,description,Status:"Pending",userId:auth?.user?._id}
  const res:any= await  axios.post(TASK_URL,payload)
  if(res.data.success){
    toast("Task Create succesfully")
    settaskCreateModel(false)
    fetchTask()
  }else{
    toast("Something went worng")
  }
   } catch (error) {
    console.log(error)
    toast("Something went worng")

   }
  }


  return (

    <div className="flex flex-col w-full" >
                <ToastContainer />

      <div className="text-center mt-5 font-bold text-3xl">
        Task Management
      </div>
      <div className="flex w-full justify-end mb-10 ">
        <button
          className="flex w-50  bg-blue-400 justify-center rounded-3xl p-2 mr-2 "
          onClick={() => {
            settaskCreateModel(true)
          }}
        >
          Create Task
        </button>
      </div>




      {taskCreateModel && (
        <Modal
          isOpen={taskCreateModel}
          onClose={() => settaskCreateModel(false)}
          children={
            <div className="flex  flex-1 flex-col">
              <h2 className="text-center">Create Task </h2>
              <input placeholder="Title" className='border-2 rounded-xl flex-1 p-1 h-18 mt-5 text-center'
              onChange={(e)=>{
                settitle(e.target.value)
              }}
              />
              <input placeholder="Description" className='border-2 rounded-xl flex-1 p-1 h-18 mt-5 text-center' 
                onChange={(e)=>{
                  setdescription(e.target.value)
                }}
              />
              <div className="ml-10 mr-10 flex justify-center mt-10 ">
                <button onClick={createTask} className="bg-blue-400 rounded-2xl p-3 flex-1"><p className="font-bold"> Submit</p></button>
              </div>

            </div>
          }
        >
        </Modal>
      )}

      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="">
            <header className="">
           <TaskComponent pending={list1} done={list2} completed={list3} updateTaskStatus={updateTaskStatus}/>
            </header>
          </div>
        </DragDropContext>
      </>
    </div>
  )
}
