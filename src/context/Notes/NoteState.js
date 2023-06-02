import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) =>{
    const s1 = {
        "name" : "HSM",
        "class": "B1 CSE"
    }
    const [ state , setState ] = useState(s1);
    const update = () =>{
        setTimeout(()=>{
            setState({
                "name" : "H-S-M",
                "class" : "3rd year"
            })
        },2000);
    }
    return (
    <NoteContext.Provider value={{state, update}}>
        {props.children}
    </NoteContext.Provider>
    );
}

export default NoteState