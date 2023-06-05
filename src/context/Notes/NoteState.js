import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const notesInitial = [];
    const[notes , setNotes ] = useState(notesInitial); 

    const getallnote = async () =>{
    
              const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
                }
              });
              const json = await response.json();
              // console.log(json);
              setNotes(json);
    }

    //add a note 
    const addnote =async (title, description, tag) =>{
      //API call
      //the id get automatically assigned in the BE, we dont even have to send in the id of the user, the token will validate & find out the user for the note 
      const response = await fetch(`${host}/api/notes/addnote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
        },
        body: JSON.stringify({title, description, tag}) 
      });
      const note =await response.json(); 
      setNotes(notes.concat(note));
      // console.log(json);
      // const json = response.json(); 

    }

    //delete a note 
    const deletenote =async (id) =>{
      //API call
      // const response = 
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
        }
      });
      // const json = response.json(); 
      // console.log(json);
      //logic
      const newNotes = notes.filter((note) => {return note._id !== id; });
      setNotes(newNotes);
    }

    //edit a note
    const editnote = async (id, title, description, tag) =>{
      //API call
      // const response = 
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
        },
        body: JSON.stringify({title, description, tag}) 
      });
      // const json = response.json(); 
      // const json =await response.json(); 
      // console.log(json);
      //logic
      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      setNotes(newNotes);
    }
  }

    return (
    <NoteContext.Provider value={{notes,setNotes, addnote, deletenote, editnote,getallnote}}>
        {props.children}
    </NoteContext.Provider>
    );
}

export default NoteState