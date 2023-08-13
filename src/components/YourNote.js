import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import contextValue from "../context/Notes/noteContext.js";
import placeholder from '../assets/placeholder.png';

const YourNote = () => {
  const context = useContext(contextValue);
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const [updatedNote, setUpdatedNote] = useState({
      etitle: "",
      edescription: "",
      etag: "",
      eimage: "",
  });
  const { editnote } = context; 
  useEffect(() => {
      const getnote = async (id) => {
          const host = "http://localhost:5000";
          const req = await fetch(`${host}/api/notes/getnote/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "auth-token" : localStorage.getItem("token")
              }
          });
          const response = await req.json();
          // console.log(response.note);

          if (response.success === 'NOTE given' && response.note) {
              setNote(response.note);
              setUpdatedNote({
                etitle: response.note.title,
                edescription: response.note.description,
                etag: response.note.tag,
                eimage: response.note.image,
            });

          } else {
              console.error("Error fetching note data");
          }
      };

      const fetchNote = async () => {
          try {
              getnote(id);
              
          } catch (error) {
              console.error(error);
          }
      };

      fetchNote();
  }, [id]);

  // useEffect(() => {
    // console.log("hi" , note);
  // }, [updatedNote]);
  

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

  const handleclick= (e) => {
    // console.log("this will change the note to -> \n", note ,"\n in the next commits");
    editnote(note._id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag, updatedNote.eimage);
    console.log("note given to bg ->" , updatedNote);
    setNote(updatedNote);
    // ref.current.click();
    // props.showAlert("Note updated successfully!", "success");
    navigate("/");
    }

    if(!updatedNote){
      return <div>Loading...</div>
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
          <Link to="/" aria-current="page">
            <button type="button" className="btn btn-secondary">
              Close
            </button>
          </Link>
            <button type="button" className="btn btn-primary" onClick={handleclick} disabled={updatedNote.etitle.length<5 || updatedNote.edescription.length<5} >Update Note</button>
            <CloudinaryUploadWidget/>
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
              <img alt="avatar" src={updatedNote?.eimage || placeholder} sizes="(max-width: 640px) 100vw, 640px"/>

      </div>
        {/* <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update Note
        </button> */}
        </div>
      </form>
      </div>
  );
};

export default YourNote;