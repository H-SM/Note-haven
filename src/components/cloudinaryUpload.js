import React, { useEffect } from "react";

const CloudinaryUploadWidget = () => {
  const cloudName = "defrwqxv6";
  const uploadPreset = "dfr2meo6";

  useEffect(() => {
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

    document.getElementById("upload_widget").addEventListener("click", handleClick);

    return () => {
      document.getElementById("upload_widget").removeEventListener("click", handleClick);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;