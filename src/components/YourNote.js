import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const YourNote = () => {
  const location = useLocation();
  const note = location.state.note;
  const [updatedNote, setUpdatedNote] = useState({
    etitle: note.etitle,
    edescription: note.edescription,
    etag: note.etag,
    eimage: note.eimage,
  });

  const closeRef = useRef(null);

  const onChange= (e) =>{
    setUpdatedNote({...updatedNote,[e.target.name] : e.target.value});
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
                setUpdatedNote(prevNote => ({
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

  const handleUpdate = () => {
    // Perform update logic here
    // You can use the updatedNote state to send the updated data to your backend API
  };

  const handleclick= (e) => {
    // console.log("this will change the note to -> \n", note ,"\n in the next commits");
    // editnote(updatedNote.id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag, updatedNote.eimage);
    // ref.current.click();
    // props.showAlert("Note updated successfully!", "success");
    }


  return (
    <div>
      <h3>Edit Your Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={updatedNote.etitle}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
            <label htmlFor="edesc" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" value={updatedNote.edescription}  name="edescription" onChange={onChange} placeholder="Your Description"/>
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="etag">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={updatedNote.etag} onChange={onChange} placeholder="Your Tag"/>
        </div>          
        <div className="my-3">
            <button type="button" className="btn btn-secondary"           data-bs-dismiss="modal" ref={closeRef}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleclick} disabled={updatedNote.etitle.length<5 || updatedNote.edescription.length<5} >Update Note</button>
            <CloudinaryUploadWidget/>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update Note
        </button>
        </div>
      </form>
      </div>
  );
};

export default YourNote;