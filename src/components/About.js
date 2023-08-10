import React, { useState, useRef, useEffect } from 'react';
import NameUpdater from './nameUpdator';
import PasswordUpdater from './passwordUpdator';
import placeholder from '../assets/placeholder.png';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from './cloudinaryUpload';
// import { useContext } from 'react';
// import noteContext from '../context/Notes/noteContext'; 
const About = () => {
  const closeRef = useRef(null);

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
      {/* <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
                <Image alt="avatar" src={user?.image || placeholder} fill sizes="(max-width: 640px) 100vw, 640px"/>
      </div> */}

   </>
  )
}

export default About;
