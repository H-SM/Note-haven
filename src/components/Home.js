import React, { useContext, useEffect } from 'react'
import Notes from './Notes';
import UserContextValue from "../context/User/userContext.js";
import Background from './background';

const Home = (props) => {
  const {showAlert} = props;
  const userContext = useContext(UserContextValue);
  const { getuserinfo } = userContext;

  useEffect(() => {
    getuserinfo();
  }, []);

  return (
    <>
      <Notes showAlert={showAlert}/>
      <Background/>
    </>
  )
}

export default Home
