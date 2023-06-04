import React, { useContext, useState, useEffect, useRef } from 'react';//you can give reference to a element like here to the modal
import contextValue from "../context/Notes/noteContext.js";
import Noteitem from './noteitem.js';
import AddNote from './AddNote'


function Notes() {
  const context = useContext(contextValue);
  const {notes, getallnote} = context;
  useEffect(()=>{
    getallnote();
    // eslint-disable-next-line
  },[]);
  const ref = useRef(null);
  const [note, setNote] = useState({etitle : "", edescription : "", etag : ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, });
  }

const handleclick= (e) => {
    e.preventDefault();
    console.log("this will change the note to -> \n", note ,"\n in the next commits");
}

const onChange= (e) =>{
    setNote({...note,[e.target.name] : e.target.value});
}
  return (
    <>
    <AddNote/>

          <button style={{"display": "none"}} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1"           aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <div>
                    <div className="container my-3">
                    <h3> Add your Note </h3>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle"                aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="edesc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" value={note.edescription}  name="edescription" onChange={onChange}/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="etag">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary"           data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleclick} >Update Note</button>
                </div>
              </div>
            </div>
          </div>
    <div className="row my-3">
      <h3> Your Notes </h3>
      {notes.map((note) => {
        return <Noteitem note={note} key={note._id} updateNote={updateNote}/>
      })}
    </div>
    </>
  )
}

export default Notes
