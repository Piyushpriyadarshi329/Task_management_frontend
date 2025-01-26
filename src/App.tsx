


import { BrowserRouter as Router, } from "react-router-dom";
import Auth from "./auth";
import Routes from "./page"
import { createContext, useContext, useEffect, useReducer } from 'react';

export const authContext = createContext(null);

export default function App() {

  const initialTodos =
  {
    user: {},
    isLogin: false
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("user",JSON.stringify(action?.payload))
        return {
          user: action?.payload,
          isLogin: true
        }
      case "LOGOUT":
        localStorage.removeItem("user")
        return {
          user: {},
          isLogin: false
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialTodos);


  useEffect(()=>{
    fetchUser()
  },[])


  async function fetchUser(){
    try {
      let user= await localStorage.getItem("user")
      console.log("user localstorage",user)
      if(user){
        user= JSON.parse(user)
        dispatch({type:"LOGIN",payload:user})

      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <Router>
      <authContext.Provider value={{ ...state, dispatch }}>
        {state.isLogin ? (
          <Routes />
        ) : (
          <Auth />
        )}
      </authContext.Provider>
    </Router>
  )
}
