import React, { useRef } from 'react';
import NameUpdater from './nameUpdator';
import PasswordUpdater from './passwordUpdator';
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
   </>
  )
}

export default About;
