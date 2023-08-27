import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import contextValue from "../context/Notes/noteContext.js";
import placeholder from '../assets/flower.png';
import logo from "../assets/Logo.png";
import Alert from "./Alert.js";
// import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

const YourNote = (props) => {
  const [alert , setAlert ] = useState(null);
  const [modal , setModal ] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1200);
  };

  const context = useContext(contextValue);
  const { id } = useParams();
  const navigate = useNavigate();

  const handlelogout= () =>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  const handlesetting= () =>{
    navigate("/settings");
  }
  const handlehome= () =>{
    navigate("/");
  }

  const [note, setNote] = useState({});
  const [updatedNote, setUpdatedNote] = useState({
      etitle: "",
      edescription: "",
      etag: "",
      eimage: "",
  });
  
  const { editnote, setSearchedNote } = context; 
  setSearchedNote("");

  useEffect(() => {
      const getnote = async (id) => {
          const host = "http://localhost:5000";
          const req = await fetch(`${host}/api/notes/getnote/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "auth-token" : localStorage.getItem("token")
              }
          });
          const response = await req.json();

          if (response.success === 'NOTE given' && response.note) {
              setNote(response.note);
              setUpdatedNote({
                etitle: response.note.title,
                edescription: response.note.description,
                etag: response.note.tag,
                eimage: response.note.image,
            });

          } else {
              console.error("Error fetching note data");
          }
      };

      const fetchNote = async () => {
          try {
              getnote(id);
              
          } catch (error) {
              console.error(error);
          }
      };

      fetchNote();
  }, [id]); 

  const onChange= (e) =>{
    setUpdatedNote({...updatedNote,[e.target.name] : e.target.value});
    }

    const CloudinaryUploadWidget = () => {
        const cloudName = "defrwqxv6";
        const uploadPreset = "dfr2meo6";
      
        useEffect(() => {
          const token = localStorage.getItem("token");
          if (!token) {
          return;
          }
          const myWidget = window.cloudinary.createUploadWidget(
            {
              cloudName: cloudName,
              uploadPreset: uploadPreset
            },
            (error, result) => {
              if (!error && result && result.event === "success") {
                setUpdatedNote(prevNote => ({
                  ...prevNote,
                  eimage: result.info.secure_url
                }));
              }
            }
          );  
      
          const handleClickWidget = (e) => {
            e.preventDefault(); 
            myWidget.open();
          };
      
          const uploadButton = document.getElementById("upload_widget");
        if (uploadButton) {
          uploadButton.addEventListener("click", handleClickWidget);
        }
      
        // Cleanup function
        return () => {
          if (uploadButton) {
            uploadButton.removeEventListener("click", handleClickWidget);
          }
        };
    }, []);
    return (
        <button id="upload_widget" className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative text-[14px]">
          Upload Image
        </span>
        </button>
      );
    }; 


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
  const handleclick= (e) => {
    editnote(note._id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag, updatedNote.eimage);
    setNote(updatedNote);
    navigate("/");
    }

    const handlesave = useCallback((e) => {
      editnote(note._id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag, updatedNote.eimage, Date.now);
      setNote(updatedNote);
      showAlert("Note saved successfully!", "success");
    }, [editnote, note._id, updatedNote]);
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        handlesave(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlesave]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ( event.key === 'Escape') {
        event.preventDefault();
        setModal(!modal);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, modal]);


  const [opener, setOpener]=useState(true);

  const [markdownDescription, setMarkdownDescription] = useState('');

  useEffect(() => {
    setMarkdownDescription(updatedNote.edescription);
  }, [updatedNote.edescription, markdownDescription]);

  const handleMarkdownChange = (e) => {
    setUpdatedNote({
      ...updatedNote,
      edescription: e.target.value
    });
    setMarkdownDescription(e.target.value);
  };

    if(!updatedNote){
      return <div>Loading...</div>
    }
  return (
    <div className='flex flex-row'>
    <nav
              id="sidenav-3"
            className={clsx(`left-0 top-0 h-screen overflow-hidden max-w-[400px] bg-zinc-800 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] transition ease-in-out transition-300`,
            opener ? "w-screen" : "w-0")}>
      <div className='flex flex-col justify-between w-full h-full'>
        <div>
        <img src={logo} alt="logo" className='px-11 pt-4'/>
        <p className='text-secondary-white text-semibold text-[15px] text-center font-mono px-1 py-2'>Your Ideas, Elevated.</p>
        </div>
        <div className='items-center justify-between'>
      <div className='bg-[#f4d799] w-[375px] h-[379px] transition ease-in-out relative transition-200 mx-3'>

      <div className="absolute top-2 left-1 py-2 px-2 w-[4rem] h-[4rem] z-20 transition ease-in-out transition-200 text-gray-800/60">
      <svg 
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
      </div>
      <div className='absolute right-2 top-1 py-[-1.5rem] px-[-0.5rem] w-[4rem] h-[4rem] z-20 transition ease-in-out transition-200 text-blue-900/60'>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth="1.5"
       stroke="currentColor"
       className=" px-3 w-[5rem] h-[5rem]"
      >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
       />
      </svg>
      </div>


      <div className="flex flex-col justify-center items-center text-center">
        <img
          src={updatedNote.eimage || placeholder}
          alt="img"
          className="w-[90%] h-auto max-h-[250px] object-contain  mt-7 hover:scale-105 transition ease-in-out transition-200"
        />
        <h5 className="text-bold font-Arimo text-[27px] leading-[30px] mb-3 mt-11 my-3 max-w-[340px] fade-out-text truncate">{updatedNote.etitle}</h5>
        <p className="card-text">{formatTime(Date.now())}</p>
      </div>

      </div>
      <div className='items-center w-full justify-center flex my-4'>
      <CloudinaryUploadWidget/>
      </div>
        </div>
         <div className='flex flex-col gap-2 w-full'>
         <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-2 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlehome}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              
              <p className='text-secondary-white text-[24px] px-3  font-mono'>Home</p>
              </button>

              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-2 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlesetting}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Settings</p>
              </button>
            
              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-2 mb-3 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlelogout} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[25px] h-[25px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Log Out</p>
              </button>
        </div>
      </div>
    </nav>
    <div className='flex justify-center w-full relative'>
    <div className='absolute right-0 my-3 mx-3 z-5'>
          
            <button type="button" className='text-white hover:scale-125 rounded-full bg-[#e49012c8]/20 transition ease-in-out transition-500' onClick={() => setModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-11 h-11 p-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>


      <div  tabIndex="-1"  className={`fixed top-0 left-0 right-0 z-50 
      ${modal ? 'flex justify-center items-center bg-gray-900/60': 'hidden'}
      p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-gray-900/90 rounded-lg dark:bg-gray-800 shadow-lg">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setModal(false)}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-300 dark:text-gray-400">Are you sure you want to leave this page?<p className='mb-5 text-lg font-normal text-gray-400/80 dark:text-gray-400'>Any unsaved changes wont be saved!</p></h3>
             
                <button type="button" className="text-white bg-[#e49012c8]/90 hover:bg-[#e49012c8]/70 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-[#e49012c8]/30 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  setModal(false)
                  setTimeout(() => {
                    navigate("/");
                  }, 200); 
                }}
                >
                    Yes, I'm sure
                </button>
    
                <button type="button" className="text-gray-500 bg-white/80 hover:bg-gray-100/90 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setModal(false)}
                >No, cancel</button>
            </div>
        </div>
    </div>
    </div>


    </div>
    <div className='absolute left-0 my-3 mx-3 z-5'>
            <button type="button" className='text-white hover:scale-125 rounded-full bg-[#e49012c8]/20 transition ease-in-out transition-500' onClick={() => {setOpener(!opener)}}>
            {opener ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-11 h-11 p-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-11 h-11 p-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            }
            </button>
    </div>
      <form className='text-white'>
      <Alert alert={alert}/>
        <div className="my-3">
          {/* <label htmlFor="etitle" className="form-label">
            Title
          </label> */}
          <input
            type="text"
            className="bg-transparent font-bold text-[38px] outline-none border-none focus:border-none"
            id="etitle"
            name="etitle"
            value={updatedNote.etitle}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-grow items-center justify-center text-[15px] bg-[#e49012c8]/20 border-0 ring-1 ring-[#e49012c8]/40 w-fit leading-[27px] px-3 rounded-full ">
           <p className='text-white px-1'>#</p>
          <input style={{width: `calc(1ch * ${updatedNote.etag.length})`, minWidth: '60px' , maxWidth: '85vh' }} type="text" className="bg-transparent border-0 w-[auto] outline-none flex-grow" id="etag" name="etag" value={updatedNote.etag} onChange={onChange} placeholder="Your Tag"/>
        </div>
      <div className="mb-3 h-[82vh] lg:w-[100vh] md:w-[40vh] px-3 py-3 overflow-y-none no-scrollbar bg-[#4f422ec8]/30 rounded-lg">
            <textarea
             type="text" 
            className="bg-transparent text-[20px] outline-none w-full h-full  scroll-auto border-none"
            id="edescription" 
            value={updatedNote.edescription}
            name="edescription" 
            onChange={handleMarkdownChange} 
            placeholder="Your Description"/>
            {/* <div className="markdown-preview mt-2 text-[20px]">
            <ReactMarkdown>{updatedNote.edescription}</ReactMarkdown>
            </div> */}
          <div className='justify-end flex gap-3 mt-[-11px] mr-[4vh] opacity-50'>  
        <p><span className='font-bold'> {updatedNote.edescription.replace(/\n/g, " ").split(' ').filter(value => value !== "").length}</span> words </p>
        <p><span className='font-bold'> {updatedNote.edescription.trim().length }</span> characters</p>
        <p><span className='font-bold'> {Math.trunc(0.008 * updatedNote.edescription.replace(/\n/g, " ").split(' ').filter(value => value !== "").length)}</span> minutes</p>
        </div>
        </div>
        <div className='flex gap-2 font-mono opacity-70 '>  
        <button id="upload_widget" onClick={handleclick}  disabled={updatedNote.etitle.length<5 || updatedNote.edescription.length<5} className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group my-2">
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative text-[14px]">
           Update Note
        </span>
        </button>  
        </div>     
        <div className="my-3">
        
      </div>
      </form>
      </div>
      </div>
  );
};

export default YourNote;