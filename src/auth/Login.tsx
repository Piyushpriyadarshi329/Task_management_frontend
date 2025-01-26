import { useNavigate } from "react-router-dom"
import {LOGIN_URL} from "./../config/URL"
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useState } from "react";
import axios from "axios";
import {authContext} from "./../App"

export default function Login() {
 const navigate= useNavigate();
 const auth:any=  useContext(authContext)
 const [email, setEmail] = useState<String|undefined>(undefined)
  const [password, setPassword] = useState<String|undefined>(undefined)
  const [loader, setloader] = useState(false)



async function loginHandler(){
try {
  const payload={
    email,password
  }
  console.log("loader",loader)
  setloader(true)
  const res= await  axios.post(LOGIN_URL,payload)
  setloader(false)
  if(res?.data?.success){
    auth.dispatch({type:"LOGIN",payload:res.data?.user?.[0]})
    setPassword("")
    setEmail("")
    toast.success("User Create Successfully.")
  }else{
    toast.error(res.data.message||"Something went worng.")
  }
} catch (error) {
  toast.error("Something went worng.")

  
}

}


    return (
      <div className='flex flex-1 bg-gray-500 h-screen w-screen justify-center items-center'>
                  <ToastContainer />
        <div className=' flex flex-col w-130 h-150 bg-indigo-100 rounded-2xl '>
          <p className='text-center font-bold mt-15 text-3xl'> Login</p>
  
          <div className="flex border-t border-gray-400 mt-5"></div>
  
          <div className="flex flex-col">
          <div className='ml-10 mr-10 mt-10 flex flex-row '>
            <input  onChange={(e)=>{
              setEmail(e.target.value)
            }} placeholder="Email" className='border-2 rounded-xl flex-1 p-1 h-12 text-center' />
          </div>
          <div className='ml-10 mr-10 mt-10 flex flex-row'>
            <input  onChange={(e)=>{
              setPassword(e.target.value)
            }} placeholder="Password" className='border-2 rounded-xl flex-1 p-1 h-12 text-center' />
          </div>
          <div className="mt-5 ml-10">
            <p onClick={()=>(
             navigate("/forgetpassword")
            )} className="">Forget Password? </p>
          </div>
          <div className="ml-10 mr-10 flex justify-center mt-10 ">
          <button onClick={loginHandler} className="bg-blue-400 rounded-2xl p-3 flex-1"><p className="font-bold"> Login</p></button>
          </div>
          <div className="mt-5">
            <p className="text-center">Not a member? <a onClick={()=>navigate("/signup")} href="" >Signup</a></p>
          </div>
          </div>
        </div>
      </div>
    )
  }
  