import React, { useState, useRef, useEffect } from 'react';
import NameUpdater from './nameUpdator';
import PasswordUpdater from './passwordUpdator';
import placeholder from '../assets/placeholder.png';
import CloudinaryUploadWidget from './cloudinaryUpload';

const About = () => {
  const closeRef = useRef(null);
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


  return (
    <>
      <div>
        <div className="modal-body">
          <div className="container my-3">
            <NameUpdater />
            <PasswordUpdater />
          </div>
        </div>
        <button type="button" className="mx-2 my-3 btn btn-secondary" data-bs-dismiss="modal" ref={closeRef}>
          Close
        </button>
      </div>

      <div className='container'>
        <CloudinaryUploadWidget />
      </div>
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
      <img alt="avatar" src={userData?.image || placeholder} sizes="(max-width: 640px) 100vw, 640px"/>

      </div>

   </>
  )
}

export default About;
