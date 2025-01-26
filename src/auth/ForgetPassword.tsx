import axios from "axios";
import { useNavigate } from "react-router-dom"
import {CHANGEPASSWORD_URL} from "./../config/URL"
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";


export default function ForgetPassword() {

  const navigate= useNavigate();
  const [email, setEmail] = useState<String|undefined>(undefined)
  const [password, setPassword] = useState<String|undefined>(undefined)
  const [loader, setloader] = useState(false)



  async function ChangePasswordHandler(){
    try {
      const payload={
        email,password
      }
      setloader(true)
      const res= await  axios.post(CHANGEPASSWORD_URL,payload)
      setloader(false)
      if(res?.data?.success){
        setPassword("")
        setEmail("")
        toast.success("update password Successfully.")
        navigate("/")
      }else{
        toast.error(res.data.message||"Something went worng.")
      }
    } catch (error) {
      toast.error("Something went worng.")
    
      
    }
    
    }
    
    return (
      <div className='flex flex-1 bg-gray-500 h-screen w-screen justify-center items-center'>
  
        <div className=' flex flex-col w-130 h-150 bg-indigo-100 rounded-2xl '>
          <p className='text-center font-bold mt-15 text-3xl'> Password Change</p>
  
          <div className="flex border-t border-gray-400 mt-5"></div>
  
          <div className="flex flex-col">
          <div className='ml-10 mr-10 mt-10 flex flex-row '>
            <input placeholder="Email" className='border-2 rounded-xl flex-1 p-1 h-12 text-center' 
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            />
          </div>
          <div className='ml-10 mr-10 mt-10 flex flex-row'>
            <input placeholder="New Password" className='border-2 rounded-xl flex-1 p-1 h-12 text-center'   onChange={(e)=>{
              setPassword(e.target.value)
            }}  />
          </div>
         
          <div className="ml-10 mr-10 flex justify-center mt-10 ">
          <button onClick={ChangePasswordHandler} className="bg-blue-400 rounded-2xl p-3 flex-1"><p className="font-bold"> Change Password</p></button>
          </div>
          <div className="mt-5">
          <p className="text-center">Not a member? <a onClick={()=>navigate("/signup")} href="" >Signup</a></p>
          </div>
          </div>
        </div>
      </div>
    )
  }
  