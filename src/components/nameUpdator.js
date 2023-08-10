import React, { useState } from 'react';

const NameUpdater = (host) => {

  const [namer, setNamer] = useState({name: ""});

  const handleNameUpdate =async () => {
    try {
      const host = "http://localhost:5000";

      const response = await fetch(`${host}/api/auth/settings/name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify(namer)
      });

      const updatedUser = await response.json();
      
      if(!updatedUser.success){
        alert(updatedUser.error);
      }
      console.log('Name updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const onChangeName= (e) =>{
    // e.preventDefault();
    setNamer({...namer,[e.target.name] : e.target.value});
  }

  return (
    <div>
      <h3>Update Name</h3>
      <form onSubmit={handleNameUpdate}>
        <div className="mb-3">
          <label htmlFor="namer" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={namer.name}
            onChange={onChangeName}
            placeholder="Your New Name"
          />
        </div>
        <button
          type="button"
          className="mx-2 my-2 btn btn-primary"
          onClick={handleNameUpdate}
          disabled={namer.name.length < 3}
        >
          Update Name
        </button>
      </form>
    </div>
  );
};

export default NameUpdater;
