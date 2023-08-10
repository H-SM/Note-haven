import React, { useEffect } from "react";

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
          handlePfpUpdate(result.info.secure_url);
        }
      }
    );  

    const handleClick = () => {
      myWidget.open();
    };

    const handlePfpUpdate =async (url) => {
      try {
        const host = "http://localhost:5000";
  
        const response = await fetch(`${host}/api/auth/settings/pfp`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("token")
          },
          body: JSON.stringify({"image" : url})
        });
  
        const updatedUser = await response.json();
        
        if(!updatedUser.success){
          alert(updatedUser.error);
        }
        console.log('pfp updated successfully:', updatedUser);
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
}, []);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;