import React, { useContext } from 'react';
import contextValue from "../context/Notes/noteContext.js";


function NotesItem(props) {
  const context = useContext(contextValue);
  const {note, updateNote, showAlert} = props;
  const {deletenote} = context;
  return (
      <div className="col-md-3 my-3" >
      {/* style={{width: "18rem"}} */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id); showAlert("Deleted successfully!", "success");}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NotesItem;
