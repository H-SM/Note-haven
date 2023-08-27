import React, { useContext, useState } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import { useNavigate } from 'react-router-dom';
import placeholder from '../assets/flower.png';

function NotesItem(props) {
  const context = useContext(contextValue);
  const {note, showAlert } = props;
  const {deletenote } = context;
  const navigate = useNavigate();
  const [modal , setModal ] = useState(false);
  
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
// #f4d799
  return (
    <div className="my-3 mx-2 relative">
    <div className="bg-[#f4d799]/90 w-[375px] h-[379px] relative transition ease-in-out transition-200">
    <div className="absolute top-3 left-1 py-2 px-2 w-[4rem] h-[4rem] hover:cursor-pointer hover:scale-110 z-20 transition ease-in-out transition-200 text-gray-800">
      <svg 
        onClick={() => setModal(true)}
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-11 h-11">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
      </div>

      <div  tabindex="-1"  className={`fixed top-0 left-0 right-0 z-50 
      ${modal ? 'flex justify-center items-center bg-gray-900/60': 'hidden'}
      p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div class="relative w-full max-w-md max-h-full">
        <div class="relative bg-gray-900/90 rounded-lg dark:bg-gray-800 shadow-lg">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setModal(false)}>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-bold text-gray-200 dark:text-gray-100">Are you sure you want to delete this note?<p className='mb-5 text-lg font-normal text-gray-400/80 dark:text-gray-400'>It can't be recovered after this!</p></h3>
             
                <button type="button" class="text-white bg-[#e49012c8]/90 hover:bg-[#e49012c8]/70 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-[#e49012c8]/30 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={()=>{deletenote(note._id); showAlert("Deleted successfully!", "success");}}
                >
                    Yes, I'm sure
                </button>
    
                <button type="button" class="text-gray-500 bg-white/80 hover:bg-gray-100/90 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setModal(false)}
                >No, cancel</button>
            </div>
        </div>
    </div>
    </div>

      <div className='absolute right-2 top-1 py-[-1rem] px-[-0.5rem] w-[4rem] h-[4rem] hover:cursor-pointer hover:scale-110 z-20 transition ease-in-out transition-200 text-blue-900' onClick={handleclick}>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth="1.5"
       stroke="currentColor"
       className=" py-3 px-3 hover:cursor-pointer w-[5rem] h-[5rem]"
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
        <h5 className="text-bold font-Arimo text-[27px] leading-[30px] my-3 max-w-[340px] fade-out-text truncate">{note.title}</h5>
        <p className="card-text ">{formatTime(note.date)}</p>
      </div>
    </div>
  </div>
  )
}

export default NotesItem;
