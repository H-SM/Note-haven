import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) =>{
    // we have hard coded the backend api to the front end to look over the varioue properties in it 
    const notesInitial = [
      {
        "_id": "647804f2d9c5ef57ebe9faca",
        "user": "64775b9f1e699ddad735639f",
        "title": "my title UPDATED...",
        "description": "this is a lonnnnngg description UPDATED...",
        "tag": "personal_update",
        "date": "2023-06-01T02:39:46.530Z",
        "__v": 0
      },
      {
        "_id": "647804f4d9c5ef57ebe9fad0",
        "user": "64775b9f1e699ddad735639f",
        "title": "my title",
        "description": "this is a lonnnnngg description",
        "tag": "personal",
        "date": "2023-06-01T02:39:48.399Z",
        "__v": 0
      },
      {
        "_id": "6478062fd9c5ef57ebe9fad2",
        "user": "64775b9f1e699ddad735639f",
        "title": "my title",
        "description": "this is a lonnnnngg description",
        "tag": "personal",
        "date": "2023-06-01T02:45:03.809Z",
        "__v": 0
      },
      {
        "_id": "647806ef35801c84467b95c7",
        "user": "64775b9f1e699ddad735639f",
        "title": "my title",
        "description": "this is a lonnnnngg description",
        "tag": "personal",
        "date": "2023-06-01T02:48:15.915Z",
        "__v": 0
      },
      {
        "_id": "6478070135801c84467b95ca",
        "user": "64775b9f1e699ddad735639f",
        "title": "my title",
        "description": "this is a lonnnnngg descriptionva",
        "tag": "personal",
        "date": "2023-06-01T02:48:33.612Z",
        "__v": 0
      }
    ]
    const[notes , setNotes ] = useState(notesInitial); 
    return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
    );
}

export default NoteState