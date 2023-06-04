import React, { useContext, useEffect } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import Noteitem from './noteitem.js';
import AddNote from './AddNote'


function Notes() {
  const context = useContext(contextValue);
  const {notes, getallnote} = context;
  useEffect(()=>{
    getallnote();
  },[]);
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h3> Your Notes </h3>
      {notes.map((note) => {
        return <Noteitem note={note} key={note._id}/>
      })}
    </div>
    </>
  )
}

export default Notes
