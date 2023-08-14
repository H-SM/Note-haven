// import React, {useEffect} from 'react';
import React from 'react';
import logo from '../assets/Logo.png';
const Sidenav = () => {

  return (
    <>
      <nav
              id="sidenav-3"
              className="left-0 top-0 h-screen w-[300px] lg:w-[400px] overflow-hidden bg-zinc-800 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]">
              {/* Side Navbar content */}
              <div className='flex flex-col h-full items-center '>
              
              <img src={logo} alt="logo"/>
              <div className='flex flex-col justify-between h-full items-center px-6 py-6'>
             
              <h1 className='text-secondary-white text-[34px]'>tags</h1>
              <h1 className='text-secondary-white text-[34px]'>recents</h1>
              <h1 className='text-secondary-white text-[34px]'>option menu</h1>
              </div>
              
              </div>
      </nav>
    </>
  )
}

export default Sidenav;
