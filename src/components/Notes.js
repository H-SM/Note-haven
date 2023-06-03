import React, { useContext } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import Noteitem from './noteitem.js';

function Notes() {
const context = useContext(contextValue);
   const {notes, setnotes} = context;
  return (
    <div className="row my-3">
      <h3> Your Notes </h3>
      {notes.map((note) => {
        return <Noteitem note={note}/>
      })}
    </div>
  )
}

export default Notes
