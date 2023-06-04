import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) =>{
    const host = "http://localhost:5000"
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
              console.log(json);
              setNotes(json);
    }

    //add a note 
    const addnote =async (title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
        },
        body: JSON.stringify({title, description, tag}) 
      });
      // const json = response.json(); 

      //logic
      let note = {
        "_id": "6478070135801c84467b95ca",
        "user": "64775b9f1e699ddad735639f",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-06-01T02:48:33.612Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
      //we dont even have to send in the id of the user, the token will validate & find out the user for the note 

    }

    //delete a note 
    const deletenote =  (id) =>{
      // //API call
      // const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
      //   },
      //   body: JSON.stringify({title, description, tag}) 
      // });
      // const json = response.json(); 

      //logic
      console.log("this is the firing of the delete node call here with the id ->" + id );
      const newNotes = notes.filter((note) => {return note._id !== id; });
      setNotes(newNotes);
    }

    //edit a note
    const editnote = async (id, title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzViOWYxZTY5OWRkYWQ3MzU2MzlmIn0sImlhdCI6MTY4NTU0NjE0N30.qQFuVp-Uw0xgixmB6fKElwpR03oImh9kb13L8uwVe2o"
        },
        body: JSON.stringify({title, description, tag}) 
      });
      // const json = response.json(); 
      
      //logic
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    }

    return (
    <NoteContext.Provider value={{notes,setNotes, addnote, deletenote, editnote,getallnote}}>
        {props.children}
    </NoteContext.Provider>
    );
}

export default NoteState