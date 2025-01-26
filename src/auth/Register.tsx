import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {SIGNUP_URL} from "./../config/URL"
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-js-loader";



export default function Register() {
  const navigate= useNavigate()
  const [name, setName] = useState<String|undefined>(undefined)
  const [email, setEmail] = useState<String|undefined>(undefined)
  const [password, setPassword] = useState<String|undefined>(undefined)
  const [loader, setloader] = useState(false)


  async function signupHandler(){
   try {

    const payload={
      name,email,password
    }
    setloader(true)
    const res= await  axios.post(SIGNUP_URL,payload)
    setloader(false)
    console.log("res",res)
    if(res?.data?.success){
      setName("")
      setPassword("")
      setEmail("")
      toast.success("User Create Successfully.")
      //navigate("/")
    }else{
      toast.error("Something went worng.")

    }
    
   } catch (error) {
    toast.error("Something went worng.")

    console.log(error)
    
   }


  }

    return (
      <div className='flex flex-1 bg-gray-500 h-screen w-screen justify-center items-center'>
          <ToastContainer />

        <div className=' flex flex-col w-130 h-150 bg-indigo-100 rounded-2xl '>
          <p className='text-center font-bold mt-15 text-3xl'> Create Account</p>
  
          <div className="flex border-t border-gray-400 mt-5"></div>
  
          <div className="flex flex-col">
          <div className='ml-10 mr-10 mt-10 flex flex-row '>
            <input placeholder="Name"  value={name} className='border-1 rounded-xl flex-1 p-1 h-12 text-center'
            onChange={(e)=>{
              setName(e.target.value)
            }}
            />
          </div>
          <div className='ml-10 mr-10 mt-10 flex flex-row '>
            <input placeholder="Email" value={email} className='border-1 rounded-xl flex-1 p-1 h-12 text-center'
             onChange={(e)=>{
              setEmail(e.target.value)
            }}
            />
          </div>
          <div className='ml-10 mr-10 mt-10 flex flex-row'>
            <input placeholder="Password" value={password}  type="password" className='border-1 rounded-xl flex-1 p-1 h-12 text-center'
             onChange={(e)=>{
              setPassword(e.target.value)
            }}
            />
          </div>
          
          <div className="ml-10 mr-10 flex justify-center mt-10 ">
          <button onClick={ loader?null:signupHandler}  className="bg-blue-400 rounded-2xl p-3 flex-1"><p className="font-bold"> {loader?(          <Loader type="spinner-default" bgColor={"blue"} color={"white"}  size={40} />):"Sign Up"} </p></button>

          </div>
          <div className="mt-5">
            <p className="text-center">Already Account? <a onClick={()=>navigate("/")} href="" >Login</a></p>
          </div>
          </div>
        </div>
      </div>
    )
  }
  