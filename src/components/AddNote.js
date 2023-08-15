import React,{ useContext , useEffect, useRef, useState } from 'react'
import contextValue from "../context/Notes/noteContext.js";
import placeholder from '../assets/placeholder.png';

function AddNote(props) {
    const context = useContext(contextValue);
    const {addnote} = context;
    const ref = useRef(null);
    const closeRef = useRef(null);
    const [note, setNote] = useState({title : "", description : "", tag : "", image: ""});
    const handleclick= (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag, note.image);
        setNote({title : "", description : "", tag : "", image: ""});
        props.showAlert("Note added successfully!", "success");
        closeRef.current.click();
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
                image: result.info.secure_url
              }));
            }
          }
        );  
    
      const handleClickWidget = (e) => {
          e.preventDefault(); 
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

    const onChange= (e) =>{ 
        setNote({...note,[e.target.name] : e.target.value});
    }
  return (
    <>
    <div ref={ref} type="button" className="border-2 border-slate-400  justify-center items-center text-bold font-mono text-[16px] text-secondary-white w-[375px] h-[379px] border-dashed my-3 mx-2 hover:bg-secondary-white/10 rounded-lg " data-bs-toggle="modal" data-bs-target="#editModal">
    <div className='hover:scale-110 flex flex-col justify-center items-center h-full transition ease-linear transition-150'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-11 h-11">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p>Add a Note</p>
    </div>
</div>
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
        <div className='mx-3 px-3'>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
        <CloudinaryUploadWidget/>
        </div>
        {note.image ? <img src={note.image} alt='img' className='img-fluid'/> :
        <img src={placeholder} alt='img' className='img-fluid'/>}
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
