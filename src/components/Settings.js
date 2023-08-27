import React, { useEffect, useContext } from 'react';
import NameUpdater from './nameUpdator';
import PasswordUpdater from './passwordUpdator';
import placeholder from '../assets/placeholder.png';
import CloudinaryUploadWidget from './cloudinaryUpload';
import { useNavigate } from 'react-router-dom/dist';
import contextValue from "../context/User/userContext.js";


const Settings = () => {
  const navigate = useNavigate();
  const context = useContext(contextValue);

  const { userData, setUserData, getuserinfo } = context;

  useEffect(() => {
    getuserinfo();
  }, [getuserinfo]);

  const handleclick= (e) => {
    setUserData({});
    navigate("/");
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ( event.key === 'Escape') {
        event.preventDefault();
        navigate("/");
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
   
  return (
    <>
  <div className='my-[50px] w-full relative'></div>
  <div className='flex flex-row justify-center items-start gap-11'>
    <div className='overflow-y-auto h-screen scroll-auto  mx-5 my-3'>
    <h1 className='semi-bold font-mono text-white text-[40px] flex gap-2'>Hello, <p className='font-bold'> {userData.name}</p>!</h1>
    <h3 className='font-mono text-white text-[17px] mt-1'>You can personalize yourself here..</h3>

          <div className="container my-5 text-white gap-2 font-mono">
          <NameUpdater />
          <PasswordUpdater />
          </div>
  
      <h3 className='text-[24px] text-white font-bold mx-3 my-2'>Profile Picture</h3>
      
      <div className="relative inline-block rounded-full overflow-hidden h-[300px] w-[300px]">
      <img alt="avatar" src={userData?.image || placeholder} sizes="(max-width: 640px) 100vw, 640px"/>
      </div>
        <div className='my-3 mx-[100px]'>
        <CloudinaryUploadWidget />
      </div>
      <div className='w-full h-[150px]'></div>
    </div>
    <div className='w-[380px] h-[400px] bg-[#e49012c8]/10 my-11 rounded-lg ring-2 ring-[#e49012c8] flex flex-col justify-center items-center gap-1 mt-[8vh] relative'>
    <div className='absolute right-[-6vh] top-[-7vh] my-3 mx-3 z-5'>
            <button type="button" className='text-white hover:scale-125 rounded-full bg-[#e49012c8]/20 transition ease-in-out transition-500' onClick={handleclick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 p-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
  </div>
    <img alt="avatar" src={userData?.image || placeholder} sizes="(max-width: 640px) 100vw, 640px" className='rounded-full w-[250px] h-[250px]'/>
    <p className='text-white font-mono font-bold text-[30px] mt-7'>{userData.name}</p>
    <p className='text-white/80 font-mono text-[15px]'>{userData.email}</p>
    </div>
    
  </div>
   </>
  )
}

export default Settings;
