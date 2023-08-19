import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import contextValue from "../context/Notes/noteContext.js";
import placeholder from '../assets/placeholder.png';
import logo from "../assets/Logo.png";
import Alert from "./Alert.js";
import ReactMarkdown from 'react-markdown';

const YourNote = (props) => {
  const [alert , setAlert ] = useState(null);
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
  const { editnote } = context; 
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
          // console.log(response.note);

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

  // useEffect(() => {
    // console.log("hi" , note);
  // }, [updatedNote]);
  

  const onChange= (e) =>{
    setUpdatedNote({...updatedNote,[e.target.name] : e.target.value});
    }

    const CloudinaryUploadWidget = () => {
        const cloudName = "defrwqxv6";
        const uploadPreset = "dfr2meo6";
      
        useEffect(() => {
          const token = localStorage.getItem("token");
          if (!token) {
          // Token is not available, handle accordingly
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
        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span class="relative text-[14px]">
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
    // console.log("this will change the note to -> \n", note ,"\n in the next commits");
    editnote(note._id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag, updatedNote.eimage);
    console.log("note given to bg ->" , updatedNote);
    setNote(updatedNote);
    // ref.current.click();
    // props.showAlert("Note updated successfully!", "success");
    navigate("/");
    }

  const handlesave= (e) => {
      // console.log("this will change the note to -> \n", note ,"\n in the next commits");
      editnote(note._id, updatedNote.etitle, updatedNote.edescription, updatedNote.etag, updatedNote.eimage);
      console.log("note given to bg ->" , updatedNote);
      setNote(updatedNote);
      showAlert("Note saved successfully!", "success");
  }

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


  const [markdownDescription, setMarkdownDescription] = useState('');

  useEffect(() => {
    setMarkdownDescription(updatedNote.edescription);
  }, [updatedNote.edescription]);

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
            className="left-0 top-0 h-screen w-screen overflow-hidden max-w-[400px] bg-zinc-800 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)]">
      <div className='flex flex-col justify-between w-full h-full'>
        <div>
        <img src={logo} alt="logo" />
        <p className='text-secondary-white text-semibold text-[15px] text-center font-mono px-1 py-2'>Your Ideas, Elevated.</p>
        </div>
        <div className='items-center justify-between'>
      <div className='bg-[#f4d799] w-[375px] h-[379px] transition ease-in-out relative transition-200 mx-3'>
        <svg
        className="absolute top-0 left-0 py-2 px-2 w-[5.5rem] h-[5.5rem] hover:cursor-pointer hover:scale-110 z-20 transition ease-in-out transition-200 text-black"
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

      <div className='absolute top-0 right-0 justify-center items-center bg-black text-white rounded-full mx-3 my-3 hover:scale-110 z-20 transition ease-in-out transition-200'>
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


      <div className="flex flex-col justify-center items-center text-center">
        <img
          src={updatedNote.eimage || placeholder}
          alt="img"
          className="w-[90%] h-auto max-h-[250px] object-contain  mt-7 hover:scale-105 transition ease-in-out transition-200"
        />
        <h5 className="text-bold font-Arimo text-[30px] leading-[28px] mb-3 mt-11">{updatedNote.etitle}</h5>
        <p className="card-text">{formatTime(Date.now())}</p>
      </div>

      </div>
      <div className='items-center w-full justify-center flex my-4'>
      <CloudinaryUploadWidget/>
      </div>
        </div>
        {/* <div className='text-white'>
            options for editing( if any)
        </div> */}
         <div className='flex flex-col gap-2 w-full'>
         <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-2 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlehome}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25px] h-[25px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              
              <p className='text-secondary-white text-[24px] px-3  font-mono'>Home</p>
              </button>

              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-2 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlesetting}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25px] h-[25px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Settings</p>
              </button>
            
              <button className='flex flex-row gap-1 justify-start px-10 py-2 mx-2 mb-3 rounded-lg text-center items-center text-white-100 hover:bg-slate-400/20 active:bg-slate-400/30 transition ease-in-out delay-75' onClick={handlelogout} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[25px] h-[25px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>


              <p className='text-secondary-white text-[24px] px-3  font-mono'>Log Out</p>
              </button>
        </div>
      </div>
    </nav>
    <div className='flex justify-center w-full relative'>
    <div className='absolute right-0 my-5 mx-5 z-5'>
          <Link to="/" aria-current="page">
            <button type="button" className='text-white hover:scale-125 rounded-full hover:bg-[#e49012c8]/20 transition ease-in-out transition-500'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
          </Link>
    </div>
      <form className='text-white'>
      <Alert alert={alert}/>
        <div className="my-3">
          {/* <label htmlFor="etitle" className="form-label">
            Title
          </label> */}
          <input
            type="text"
            className="bg-transparent font-bold text-[38px] outline-none"
            id="etitle"
            name="etitle"
            value={updatedNote.etitle}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 flex flex-grow items-center text-[15px] bg-[#e49012c8]/20 border-0 ring-1 ring-[#e49012c8]/40 w-fit leading-[27px] px-3 rounded-full ">
           <p className='text-white px-1'>#</p>
          <input type="text" className="bg-transparent border-0 w-[auto] outline-none flex-grow" id="etag" name="etag" value={updatedNote.etag} onChange={onChange} placeholder="Your Tag"/>
        </div>
      <div className="mb-3 h-[83vh] lg:w-[70vh] md:w-[40vh] px-3 py-3 overflow-y-auto no-scrollbar bg-[#e8c48dc8]/10 rounded-lg">
            <textarea
             type="text" 
            className="bg-transparent text-[20px] outline-none w-full h-full no-scrollbar"
            id="edescription" 
            value={updatedNote.edescription}
            name="edescription" 
            onChange={handleMarkdownChange} 
            placeholder="Your Description"/>
            {/* <div className="markdown-preview mt-2 text-[20px]">
            <ReactMarkdown>{updatedNote.edescription}</ReactMarkdown>
            </div> */}
        </div>           
        <div className="my-3">
        <button id="upload_widget" onClick={handleclick}  disabled={updatedNote.etitle.length<5 || updatedNote.edescription.length<5} className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group my-2">
        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span class="relative text-[14px]">
           Update Note
        </span>
        </button>
      </div>
            {/* <div className="relative inline-block rounded-full overflow-hidden h-[300px] w-[300px]">
              <img alt="avatar" src={updatedNote?.eimage || placeholder} sizes="(max-width: 640px) 100vw, 640px"/>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update Note
        </button>
        </div> */}
      </form>
      </div>
      </div>
  );
};

export default YourNote;