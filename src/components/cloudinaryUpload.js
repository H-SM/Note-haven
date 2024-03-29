import React, { useContext, useEffect } from "react";
import contextValue from "../context/User/userContext.js";

const CloudinaryUploadWidget = ( props ) => {
  const { handleUploadSuccess } = props
  const cloudName = "defrwqxv6";
  const uploadPreset = "dfr2meo6";

  const context = useContext(contextValue);
  const { changeimage, setUserData } = context;

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
          handlePfpUpdate(result.info.secure_url);
        }
      }
    );  

    const handleClick = () => {
      myWidget.open();
    };

    const handlePfpUpdate =async (url) => {
      try {
        const updatedUser = await changeimage(url); 
        
        if(!updatedUser.success){
          alert(updatedUser.error);
        }
        else{
          setUserData((prevUserData) => ({
            ...prevUserData,
            image: url
          }));
        }
      } catch (error) {
        console.error('Error updating name:', error);
      }
    };

    const uploadButton = document.getElementById("upload_widget");
  if (uploadButton) {
    uploadButton.addEventListener("click", handleClick);
  }

  // Cleanup function
  return () => {
    if (uploadButton) {
      uploadButton.removeEventListener("click", handleClick);
    }
  };
}, [handleUploadSuccess, changeimage, setUserData]);

  return (
    <button id="upload_widget" className=" relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
    <span className="relative text-[14px]">
      Upload
    </span>
    </button>
  );
};

export default CloudinaryUploadWidget;