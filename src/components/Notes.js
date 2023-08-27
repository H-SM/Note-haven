import React, { useContext, useEffect } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import { useNavigate } from "react-router-dom";
import Noteitem from './noteitem.js';
import AddNote from './AddNote'


function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(contextValue);
  const {notes, getallnote, searchedNote } = context;
  const {showAlert} = props;

  useEffect(()=>{
    if(localStorage.getItem('token')){
      getallnote();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  },[]);
  
  return (
    <>
    <div className='flex flex-wrap gap-3 justify-center h-full max-h-[100vh] overflow-hidden no-scrollbar overflow-y-auto w-full'>
      <AddNote showAlert={showAlert}/>
      {(notes.length===0) && <p className='w-full flex justify-center items-center text-white font-Sacramento text-[50px] mt-[-15vh]'>Start your awesome journey by clicking the button above.</p>}
      {searchedNote==="" ? notes.map((note) => {
        return <Noteitem note={note} key={note._id} showAlert={showAlert} />
      })
      :
      notes.filter((note) =>
        note.title.toLowerCase().includes(searchedNote.toLowerCase())
      ).length > 0 ? (
        notes
          .filter((note) =>
            note.title.toLowerCase().includes(searchedNote.toLowerCase())
          )
          .map((note) => (
            <Noteitem note={note} key={note._id} showAlert={showAlert} />
          ))
      ) : (
        <div className='w-full text-white flex flex-col justify-center items-center'>
        <p className=' text-white font-Sacramento text-[50px] mt-[-15vh]'>No notes with this phrase</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-11 h-11">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
        </div>
      )
      }
      <div className='w-full my-[5rem]'>
      </div>
    </div>

    </>
  )
}

export default Notes
