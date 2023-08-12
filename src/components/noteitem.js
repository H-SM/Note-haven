import React, { useContext } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import { Route, Routes, useNavigate } from 'react-router-dom';
import YourNote from './YourNote.js';
import placeholder from '../assets/placeholder.png';

function NotesItem(props) {
  const context = useContext(contextValue);
  const {note, showAlert } = props;
  const {deletenote } = context;
  const navigate = useNavigate();
  
  const handleclick= (e) => {
    console.log("Clicked note:", note);
    navigate(`/note/${note._id}`, { note });
}

  return (
      <div className="col-md-3 my-3" >
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id); showAlert("Deleted successfully!", "success");}}></i>
          {/* onClick={()=>{updateNote(note);}} */}
          <i className="fa-regular fa-pen-to-square mx-2" onClick={handleclick}></i>

          </div>
          <p className="card-text">{note.description}</p>
          {note.image ? <img src={note.image} alt='img' className='img-fluid'/> : <img src={placeholder} alt='img' className='img-fluid'/>}
        </div>
      </div>
    </div>
  )
}

export default NotesItem;
