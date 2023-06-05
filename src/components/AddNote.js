import React,{ useContext , useState } from 'react'
import contextValue from "../context/Notes/noteContext.js";

function AddNote() {
    const context = useContext(contextValue);
    const {addnote} = context;
    const [note, setNote] = useState({title : "", description : "", tag : ""});
    const handleclick= (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({title : "", description : "", tag : ""});
    }

    const onChange= (e) =>{
        setNote({...note,[e.target.name] : e.target.value});
        //any name of the component attribute is being changed, make the changes over it like a change over description will change the target element of description to the new value it got in the feild
    }
  return (
    <div>
      <div className="container my-3">
      <h3> Add your Note </h3>
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
  )
}

export default AddNote
