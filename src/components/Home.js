import React, { useContext, useEffect } from 'react'
import Notes from './NOtes'
import UserContextValue from "../context/User/userContext.js";

const Home = (props) => {
  const {showAlert} = props;
  const userContext = useContext(UserContextValue);
  const { getuserinfo } = userContext;

  useEffect(() => {
    getuserinfo();
  }, []);

  return (
      <Notes showAlert={showAlert}/>
  )
}

export default Home
