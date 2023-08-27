// import React, {useEffect} from 'react';
import React, { useContext, useState } from 'react';
import contextValue from "../context/Notes/noteContext.js";
import logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const Sidenav = () => {
  let context = useContext(contextValue);
  let { notes, setSearchedNote } = context;
  // let location = useLocation();
  let navigate = useNavigate();
  const handlelogout= () =>{
    localStorage.removeItem('token');
    setSearchedNote("");
    navigate("/login");
  }
  const handlesetting= () =>{
    navigate("/settings");
  }
  const handlehome= () =>{
    navigate("/");
  }

  function getUniqueTags(notes) {
    const uniqueTags = new Set();
  
    notes.forEach(note => {
      uniqueTags.add(note.tag);
    });
  
    return Array.from(uniqueTags);
  }

  const uniqueTags = getUniqueTags(notes);

  function getNotesByTag(notes, tag) {
    return notes.filter(note => note.tag === tag)
                .map(note => ({ _id: note._id, title: note.title, date:note.date                
                }));
  }

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    const options = {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-US', options);
  }
  const [recentOpener, setRecentOpener] = useState(false);
  const [TagsOpener, setTagsOpener] = useState(true);
  const [openTags, setOpenTags] = useState([]);

  const handleclick= ( note) => {
    navigate(`/note/${note._id}`, { note });
  }


  return (
    <>
      <nav
              id="sidenav-3"
              className="left-0 top-0 h-screen w-[400px] lg:w-[475px] bg-zinc-800 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] overflow-auto">
              {/* Side Navbar content */}
              <div className='flex flex-col h-full justify-between  max-h-screen'>
              <div className='logo'>
              <img src={logo} alt="logo" className='pt-[30px] px-10'/>
              <p className='text-secondary-white text-semibold text-[15px] text-right px-5 mt-[-15px] sm:mt-[-5px]'>- By HSM</p>

              <p className='text-secondary-white text-semibold text-[15px] text-center font-mono px-1 py-2'>Your Ideas, Elevated.</p>
              </div>
              <div className='flex flex-col h-full mx-1 px-2 py-2 gap-2 mt-[40px] '>
              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-1 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={() => setTagsOpener(!TagsOpener)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>

              <p className='text-secondary-white text-[24px] px-3  font-mono'>Tags</p>
              </button>

              <div className={clsx(`overflow-auto`,
              !TagsOpener && "hidden")}>
              <ul className="text-secondary-white list-outside">
              
              {uniqueTags.map(tag => (
                <div key={tag}>
                <li  className="text-white px-3 ring-1 my-2 flex justify-between bg-slate-400/10 hover:bg-slate-400/30 scale-95 hover:scale-100 rounded-md ring-[#e49012c8] py-1 hover:shadow-orange-400/30 hover:shadow-md transition ease-in-out duration-500 cursor-pointer mx-1" 
                onClick={() => {
                  if (openTags.includes(tag)) {
                    setOpenTags(openTags.filter(t => t !== tag));
                  } else {
                    setOpenTags([...openTags, tag]);
                  }
                }}
                >
                <p className='text-white text-[17px] font-mono font-bold max-w-[320px] fade-out-text truncate'>{(tag==='')?"General (no tags)":tag}</p>
              </li>
              <ul>
              {openTags.includes(tag) && (
              getNotesByTag(notes, tag).map(note => (
              <li key={note._id} className="text-white px-3 ring-1 my-2 flex justify-between bg-slate-400/10 hover:bg-slate-400/30 scale-90 hover:scale-95 rounded-md py-1 hover:shadow-orange-400/30 hover:shadow-md transition ease-in-out duration-500 cursor-pointer mx-1 " onClick={() => handleclick(note)}>
                <p className='text-white text-[15px] font-mono max-w-[230px] fade-out-text truncate'>{note.title}</p>
                <p className='opacity-50 '>{formatTime(note.date)}</p>
              </li>
            )))}
              </ul>
              </div>
              ))}
                  
              </ul>
              </div>

              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-1 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={() => {setRecentOpener(!recentOpener)}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
              </svg>

              <p className='text-secondary-white text-[24px] px-3  font-mono'>Recent</p>
              
              </button>
              <div className={clsx(`overflow-auto w-full`,
              recentOpener && "hidden")}>
              <ul className="text-secondary-white list-outside">
              {notes
                  .slice()
                  .sort((noteA, noteB) => {return new Date(noteB.updatedTime) - new Date(noteA.updatedTime);})
                  .slice(0, 10)
                 .map((note, index) => (
                    <li key={index} className="text-white px-3 ring-1 my-2 flex justify-between bg-slate-400/10 hover:bg-slate-400/30 scale-95 hover:scale-100 rounded-md ring-[#e49012c8] py-1 hover:shadow-orange-400/30 hover:shadow-md transition ease-in-out duration-500 cursor-pointer mx-1" onClick={() => handleclick(note)}>
                      <p className='text-white text-[15px] font-mono max-w-[230px] fade-out-text truncate'>{note.title}</p>
                      <p className='opacity-50 '>{formatTime(note.updatedTime)}</p>
                    </li>
                  ))}
              </ul>
              </div>
              </div>
              {/* <p className='text-white-100 mx-5'>recent open here</p> */}

              <div className='flex flex-col justify-end h-full w-full gap-2 mb-2'>
              {/* <button className='flex flex-row gap-1 justify-start px-10 py-2 max-w-[340px] rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75 mx-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Theme</p>
              </button> */}

              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-1 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlehome}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              
              <p className='text-secondary-white text-[24px] px-3  font-mono'>Home</p>
              </button>

              <button className='flex flex-row gap-1 justify-start px-10 py-2 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75 mx-1' onClick={handlesetting}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Settings</p>
              </button>
            
              <button className='flex flex-row gap-1 justify-start px-10 py-2 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75 mx-1' onClick={handlelogout} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Log Out</p>
              </button>
              </div>
              </div>
      </nav>
    </>
  )
}

export default Sidenav;
