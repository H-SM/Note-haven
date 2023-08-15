import React, { useContext, useEffect } from 'react';//you can give reference to a element like here to the modal
import contextValue from "../context/Notes/noteContext.js";
import { useNavigate } from "react-router-dom";
import Noteitem from './noteitem.js';
import AddNote from './AddNote'


function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(contextValue);
  const {notes, getallnote } = context;
  const {showAlert} = props;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getallnote();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  },[]);
  
  return (
    <>
    <div className='flex flex-wrap gap-3 justify-center h-full max-h-[100vh] overflow-hidden no-scrollbar overflow-y-auto w-full'>

      {/* <h1 className="text-3xl font-bold text-white font-mono ">
      Your Notes
      </h1> */}
      <div className="container mx-2 bg-primary-black">
      {(notes.length===0) && "No notes to display"}
      </div>
    <AddNote showAlert={showAlert}/>
      {notes.map((note) => {
        // return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={showAlert} />
        return <Noteitem note={note} key={note._id} showAlert={showAlert} />
      })}
      <div className='w-full my-[5rem]'></div>
    </div>

    </>
  )
}

export default Notes
