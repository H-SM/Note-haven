import React,{ useContext , useState } from 'react'
import contextValue from "../context/Notes/noteContext.js";

function AddNote() {
    const context = useContext(contextValue);
    const {addnote} = context;
    const [note, setNote] = useState({title : "", description : "", tag : "default"});
    const handleclick= (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
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
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
