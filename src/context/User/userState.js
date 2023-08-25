import React, { useState } from "react";
import userContext from "./userContext";

const UserState = (props) =>{
    const host = "http://localhost:5000";
    const userInitial = [];
    const [userData, setUserData] = useState(userInitial);

    const getuserinfo = async () => {
      try{
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'GET',
          headers: {
            'auth-token' : localStorage.getItem("token")
          },
          })
          const json = await response.json();
          setUserData(json);
      }catch(error){
        console.error('Error fetching user data:', error);
      }
    }

    const changename = async (namer) => {
      try{
    const response = await fetch(`${host}/api/auth/settings/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify(namer)
      });
      const updatedUser = await response.json();
      return updatedUser;
    }catch(error){
      console.error('Error fetching user data:', error);
    }
    }

    const changepassword = async (password) => {
    try{
    const response = await fetch(`${host}/api/auth/settings/pw`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify(password)
      });
      const updatedUser = await response.json();
      return updatedUser;
    }catch(error){
      console.error('Error fetching user data:', error);
    }
    }
    
    const changeimage = async (url) => {
      try{
      const response = await fetch(`${host}/api/auth/settings/pfp`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("token")
          },
          body: JSON.stringify({"image" : url})
        });
        const updatedUser = await response.json();
        return updatedUser;
      }catch(error){
        console.error('Error fetching user data:', error);
      }
      }

    const login = async ({email , password}) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email , password}) 
            });
        const json = await response.json();
        return json;
    }

    const signin = async ({ name, email, password }) => {
        const req = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name , email ,password })
            });
        const response = await req.json();
        return response;
    }
    return (
        <userContext.Provider value={{userData,setUserData,getuserinfo,changename, login, signin, changepassword, changeimage }}>
            {props.children}
        </userContext.Provider>
        );

};

export default UserState;

