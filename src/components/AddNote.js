import React,{ useContext , useEffect, useRef, useState } from 'react'
import contextValue from "../context/Notes/noteContext.js";

function AddNote(props) {
    const context = useContext(contextValue);
    const {addnote} = context;
    const ref = useRef(null);
    const closeRef = useRef(null);
    const [note, setNote] = useState({title : "", description : "", tag : "", image: ""});
    const handleclick= (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag, note.image);
        setNote({title : "", description : "", tag : "", image: ""});
        props.showAlert("Note added successfully!", "success");
        closeRef.current.click();
    }
    const [modal, setModal]=useState(false);

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
              setNote(prevNote => ({
                ...prevNote,
                image: result.info.secure_url
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

    const onChange= (e) =>{ 
        setNote({...note,[e.target.name] : e.target.value});
    }

    useEffect(() => {
      const handleKeyDown = (event) => {
        if ( event.key === 'Escape') {
          event.preventDefault();
          setModal(false);
        }
      };
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setModal]);

  return (
    <>

<button
        ref={ref}
        type="button"
        className="border-2 border-slate-400 justify-center items-center text-bold font-mono text-[16px] text-secondary-white w-[375px] h-[379px] border-dashed my-3 mx-2 hover:bg-secondary-white/10 rounded-lg"
        onClick={() => setModal(true)}
      >
    <div className='hover:scale-110 flex flex-col justify-center items-center h-full transition ease-linear transition-150'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-11 h-11">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p>Add a Note</p>
    </div>
</button>


    <div className={`${!modal && "hidden"} absolute w-full h-full top-0 left-0 z-50 bg-gray-800/60`}>
    <div className="absolute right-[40%] top-3 rounded-lg">
    <div className=" bg-dark ring-1 ring-[#e49012c8]/60 rounded-lg px-4 py-2 w-[450px]">
    <div className="container my-3">
    <div className="d-flex justify-content-between align-items-center text-white">
      <h5 className=" text-white items-center text-[20px] font-Arimo">Add your Note</h5>
      

      <button type="button" className="text-white hover:scale-110 transition ease-linear transition-200" ref={closeRef} onClick={() => setModal(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      </button>
    </div>
  </div>
  <div className="z-50">
      <form className='font-mono'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white text-[15px] flex flex-row gap-2  font-mono">Title <p className='text-white/40 text-ellipsis'>(min. 5 characters)</p></label>
          <input type="text" className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8] w-full block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300" id="title" name="title" value={note.title} placeholder="Your Title" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label text-white text-[15px] flex flex-row gap-2  font-mono">Description<p className='text-white/40 text-ellipsis'>(min. 5 characters)</p></label>
          <input type="text" className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8] w-full block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300" id="description" name="description" value={note.description} placeholder="Your Description" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label text-white text-[15px]" htmlFor="tag">Tag</label>
          <input type="text" className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8] w-full block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300" id="tag" name="tag" value={note.tag} placeholder="Your Tag" onChange={onChange}/>
        </div>
        {note.image && 
        <div className='flex flex-col justify-center items-center mt-3 gap-2'>
        <p className='text-[#ff9902f5] text-[15px]'>Your Image</p>
        <img src={note.image} alt='img' className='w-[200px] h-[200px] object-cover rounded-full '/>
        </div>}
        <div className='mt-3'>
        <div className='flex flex-row justify-between w-full'>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group disabled:opacity-60 " onClick={handleclick}>
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative text-[14px]">
          Add Note
        </span>
        </button>     
        <CloudinaryUploadWidget/>
        </div>
        </div>
        
      </form>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default AddNote

