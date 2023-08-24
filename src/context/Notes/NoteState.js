import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const notesInitial = [];
    const[notes , setNotes ] = useState(notesInitial); 
    const [searchedNote,setSearchedNote]=useState("");

    const getallnote = async () =>{
    
              const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token" : localStorage.getItem("token")
                }
              });
              const json = await response.json();
              console.log("API Response:", json);
              setNotes(json);
    }

    //add a note 
    const addnote =async (title, description, tag, image) =>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag, image}) 
      });
      const note =await response.json(); 
      setNotes(notes.concat(note));

    }

    //delete a note 
    const deletenote =async (id) =>{
      //API call
      // const response = 
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        }
      });
      //logic
      const newNotes = notes.filter((note) => {return note._id !== id; });
      setNotes(newNotes);
    }

    //edit a note
    const editnote = async (id, title, description, tag, image, date) =>{
      //API call
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag, image }) 
      });
      //logic
      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          newNotes[index].image = image;
          newNotes[index].updatedTime = date;
          break;
        }
      setNotes(newNotes);
    }
  }

    return (
    <NoteContext.Provider value={{notes,setNotes,searchedNote,setSearchedNote,  addnote, deletenote, editnote,getallnote }}>
        {props.children}
    </NoteContext.Provider>
    );
}

export default NoteState