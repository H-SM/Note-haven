import React, { useState, useRef, useEffect } from 'react';
import NameUpdater from './nameUpdator';
import PasswordUpdater from './passwordUpdator';
import placeholder from '../assets/placeholder.png';
import CloudinaryUploadWidget from './cloudinaryUpload';
import { useNavigate } from 'react-router-dom/dist';

const Settings = () => {
  const closeRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({}); // Store user data here
  const host = "http://localhost:5000";

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem("token")
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data); // Store the user data in the state
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleclick= (e) => {
    setUserData({});
    navigate("/");
    }

  const handleUploadSuccess = (updatedImage) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        image: updatedImage
      }));
      console.log("I changed up the userData dynamically as:",userData)
    };
  
  const handleUploadNameSuccess = (updatedName) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: updatedName
      }));
      console.log("I changed up the userData dynamically as:",userData);
  };
  
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
  <div className='my-[50px] w-full'></div>
  <div className='flex flex-row justify-center items-start gap-11'>
    <div className=' mx-5 my-3'>
    <h1 className='font-bold font-mono text-white text-[40px]'>Hello, {userData.name}</h1>
    <h3 className='font-mono text-white text-[17px] mt-1'>You can personalize yourself here..</h3>
      <div>
          <div className="container my-5 text-white gap-2 font-mono">
          <NameUpdater handleUploadNameSuccess={handleUploadNameSuccess} />
          <PasswordUpdater />
          </div>
        {/* <button type="button" className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group" onClick={handleclick}>
        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span class="relative text-[14px]">
          Close
        </span>
        </button> */}
      </div>
      
      <h3 className='text-[24px] text-white font-bold mx-3 my-2'>Profile Picture</h3>
      
      <div className="relative inline-block rounded-full overflow-hidden h-[300px] w-[300px]">
      <img alt="avatar" src={userData?.image || placeholder} sizes="(max-width: 640px) 100vw, 640px"/>
      </div>
        <div className='my-3 mx-[100px]'>
        <CloudinaryUploadWidget handleUploadSuccess={handleUploadSuccess}/>
      </div>
    </div>
    <div className='w-[380px] h-[400px] bg-[#e49012c8]/10 my-11 rounded-lg ring-2 ring-[#e49012c8] flex flex-col justify-center items-center gap-1 mt-[8vh]'>
    <img alt="avatar" src={userData?.image || placeholder} sizes="(max-width: 640px) 100vw, 640px" className='rounded-full w-[250px] h-[250px]'/>
    <p className='text-white font-mono font-bold text-[30px] mt-7'>{userData.name}</p>
    <p className='text-white/80 font-mono text-[15px]'>{userData.email}</p>
    </div>
  </div>
   </>
  )
}

export default Settings;
