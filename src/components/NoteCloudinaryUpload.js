import React, { useContext, useEffect } from "react";
import contextValue from "../context/Notes/noteContext.js";

const CloudinaryUploadNoteImage = (props) => {
  const context = useContext(contextValue);
  const cloudName = "defrwqxv6";
  const uploadPreset = "dfr2meo6";
  const { editimage } = context;
  const { note } = props;

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
          handleImageUpdate(result.info.secure_url);
        }
      }
    );  

    const handleClick = () => {
      myWidget.open();
    };

    const handleImageUpdate =async (url) => {
      editimage(note._id, url);
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
}, [editimage, note]);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload Image here
    </button>
  );
};

export default CloudinaryUploadNoteImage;