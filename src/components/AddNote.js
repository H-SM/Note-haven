import React,{ useContext , useRef, useState } from 'react'
import contextValue from "../context/Notes/noteContext.js";

function AddNote(props) {
    const context = useContext(contextValue);
    const {addnote} = context;
    const ref = useRef(null);
    const closeRef = useRef(null);
    const [note, setNote] = useState({title : "", description : "", tag : ""});
    const handleclick= (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({title : "", description : "", tag : ""});
        props.showAlert("Note added successfully!", "success");
        closeRef.current.click();
    }



    const onChange= (e) =>{ 
        setNote({...note,[e.target.name] : e.target.value});
    }
  return (
    <>
    <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
  Add a Note
</button>
  <div className="modal fade" id="editModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
    <div>
      <div className="container my-3">
    <div className="d-flex justify-content-between align-items-center">
      <h5 className="modal-title">Add your Note</h5>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeRef}>
        {/* <span aria-hidden="true">&times;</span> */}
      </button>
    </div>
  </div>
  <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} placeholder="Your Title" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="Your Description" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Your Tag" onChange={onChange}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default AddNote
