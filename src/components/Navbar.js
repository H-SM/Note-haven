// import React, {useEffect} from 'react';

import React, { useEffect, useState } from 'react';
import { Link , useLocation , useNavigate } from "react-router-dom";
import placeholder from '../assets/placeholder.png';
const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handlelogout= () =>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  // useEffect(() => {
  //   // Google Analytics
  //   // ga('send', 'pageview');
  //   console.log(location.pathname);
  // }, [location]);

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
    navigate("/about");
}
  return (
<>
<nav className='bg-zinc-800 w-full'>
    <div className='pl-[0.5rem] pr-[0.5rem] max-w-[80rem] ml-auto mr-auto '>
      <div className='justify-between items-center h-[6rem] flex relative'>
        {/* <div className='flex items-center pl-[0.5rem] pr-[0.5rem]'>
            <div className='shrink-0'>
             <p className='text-white'>HI</p>
            </div>
        </div> */}
        <div className='pl-[0.5rem] pr-[0.5rem] justify-start flex flex-grow flex-shrink flex-0'>
            <div className='max-w-[32rem] w-full '>
                <label for="search" className='absolute w-1 h-1 p-0 m-n1 overflow-hidden whitespace-nowrap border-0'>Search</label>
                <div className='relative'>
                    <div className='pl-[0.75rem] items-center flex flex-row left-0 top-0 bottom-0 absolute pointer-events-none text-white-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    </div>
                    <input id='search' name="search"  type="search" className='text-[#ffffff] pr-[1rem] pl-[2.75rem] pt-[0.375rem] pb-[0.375rem]   bg-[#e49012c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8] w-full block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300' placeholder='Search'/>
                </div>
            </div>
        </div>
        <div className='flex flex-row justify-center items-center'>
        <div className='flex flex-col justify-end items-end px-1 mx-2'>
        <p className='text-white font-bold font-mono text-[20px]'>{userData.name}</p>
        <p className='text-white/50 font-mono mt-[-0.375rem]'>{userData.email}</p>
        </div>
        <img alt="avatar" src={userData?.image || placeholder} className='w-[5rem] h-[5rem] rounded-full'/>
        </div>
      </div>
    </div>
</nav>
</>
  )
}

export default Navbar
