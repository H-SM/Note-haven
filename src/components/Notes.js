import React, { useContext, useState, useEffect, useRef } from 'react';//you can give reference to a element like here to the modal
import contextValue from "../context/Notes/noteContext.js";
import { useNavigate } from "react-router-dom";
import Noteitem from './noteitem.js';
import AddNote from './AddNote'


function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(contextValue);
  const {notes, getallnote, editnote} = context;
  const {showAlert} = props;
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getallnote();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  },[]);
  const ref = useRef(null);
  const closeRef = useRef(null);
  const [note, setNote] = useState({id: "", etitle : "", edescription : "", etag : "", eimage: ""});
  
  const updateNote = (currentNote) => {
    ref.current.click();

    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, eimage: currentNote.image });
    // props.showAlert("Note updated successfully!", "success");
  }

const handleclick= (e) => {
    console.log("this will change the note to -> \n", note ,"\n in the next commits");
    editnote(note.id, note.etitle, note.edescription, note.etag, note.eimage);
    ref.current.click();
    props.showAlert("Note updated successfully!", "success");
}

const onChange= (e) =>{
    setNote({...note,[e.target.name] : e.target.value});
}

const CloudinaryUploadWidget = () => {
  const cloudName = "defrwqxv6";
  const uploadPreset = "dfr2meo6";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
    // Token is not available, handle accordingly
    return;
    }
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setNote(prevNote => ({
            ...prevNote,
            eimage: result.info.secure_url
          }));
        }
      }
    );  

    const handleClickWidget = () => {
      myWidget.open();
    };

    const uploadButton = document.getElementById("upload_widget");
  if (uploadButton) {
    uploadButton.addEventListener("click", handleClickWidget);
  }

  // Cleanup function
  return () => {
    if (uploadButton) {
      uploadButton.removeEventListener("click", handleClickWidget);
    }
  };
}, []);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload Image
    </button>
  );
};


  return (
    <>
                <AddNote showAlert={showAlert}/>
                  {/* <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
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
                        <input type="text" className="form-control" id="etitle" name="etitle"                aria-describedby="emailHelp" value={note.etitle} onChange={onChange} placeholder="Your Title"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="edesc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" value={note.edescription}  name="edescription" onChange={onChange} placeholder="Your Description"/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="etag">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} placeholder="Your Tag"/>
                      </div>
                    </form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary"           data-bs-dismiss="modal" ref={closeRef}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleclick} disabled={note.etitle.length<5 || note.edescription.length<5} >Update Note</button>
                  <CloudinaryUploadWidget/>
                 */}
    <div className="row my-3">
      <h3> Your Notes </h3>
      <div className="container mx-2">
      {(notes.length===0) && "No notes to display"}
      </div>
      {notes.map((note) => {
        return <Noteitem note={note} key={note._id} updateNote={updateNote} showAlert={showAlert} />
      })}
    </div>
    </>
  )
}

export default Notes
