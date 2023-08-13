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
    <AddNote showAlert={showAlert}/>
    <div className="row my-3">
      <h1 className="text-3xl font-bold">
      Your Notes
      </h1>
      <div className="container mx-2">
      {(notes.length===0) && "No notes to display"}
      </div>
      {notes.map((note) => {
        // return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={showAlert} />
        return <Noteitem note={note} key={note._id} showAlert={showAlert} />
      })}
    </div>
    </>
  )
}

export default Notes
