import React, { useContext, useEffect } from 'react'
import Notes from './NOtes'
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
      <div className='z-10 '>
      <Notes showAlert={showAlert}/>
      </div>
      <Background/>
    </>
  )
}

export default Home
