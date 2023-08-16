import React, { useContext } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/placeholder.png';

function NotesItem(props) {
  const context = useContext(contextValue);
  const {note, showAlert } = props;
  const {deletenote } = context;
  const navigate = useNavigate();
  
  const handleclick= (e) => {
    console.log("Clicked note:", note);
    navigate(`/note/${note._id}`, { note });
}

const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
};

  return (
    <div className="my-3 mx-2 relative">
    <div className="bg-[#f4d799] w-[375px] h-[379px] relative transition ease-in-out transition-200">
      <svg
        className="absolute top-0 left-0 py-2 px-2 w-[5.5rem] h-[5.5rem] hover:cursor-pointer hover:scale-110 z-20 transition ease-in-out transition-200 text-black"
        onClick={()=>{deletenote(note._id); showAlert("Deleted successfully!", "success");}}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* <svg
        className="absolute top-0 right-0 py-2 px-2 hover:cursor-pointer w-[4rem] h-[4rem]"
        onClick={handleclick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg> */}
      <div className='absolute top-0 right-0 justify-center items-center bg-black text-white rounded-full mx-3 my-3 hover:scale-110 z-20 transition ease-in-out transition-200' onClick={handleclick}>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth="1.5"
       stroke="currentColor"
       className=" py-3 px-3 hover:cursor-pointer w-[4rem] h-[4rem]"
      >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
       />
      </svg>
      </div>
      <div className="flex flex-col justify-center items-center text-center"  onClick={handleclick}>
        <img
          src={note.image || placeholder}
          alt="img"
          className="w-[70%] h-auto max-h-[250px] object-contain  mt-7 hover:scale-105 transition ease-in-out transition-200"
        />
        <h5 className="text-bold font-Arimo text-[27px] leading-[28px] my-3">{note.title}</h5>
        <p className="card-text ">{formatTime(note.date)}</p>
      </div>
    </div>
  </div>
  )
}

export default NotesItem;
