import React, { useState } from 'react';

const PasswordUpdater = () => {
    const [password, setPassword ]= useState({ oldpassword:"", newpassword:""});

    const onChangePassword= (e) =>{
        e.preventDefault();
        setPassword({...password,[e.target.name] : e.target.value});
    }

    const handlePasswordUpdate = async () => {
        try {
            const host = "http://localhost:5000";

            const response = await fetch(`${host}/api/auth/settings/pw`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("token")
              },
              body: JSON.stringify(password)
            });

            const updatedUser = await response.json();
        
            console.log('Password updated successfully:', updatedUser);
          } catch (error) {
            console.error('Error updating name:', error);
          }
    };
  return (
    <div>
      <h3>Update Password</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="oldpassword" className="form-label">Old Password</label>
          <input
            type="password"
            className="form-control"
            id="oldpassword"
            value={password.oldpassword}
            name="oldpassword"
            onChange={onChangePassword}
            placeholder="Your Old Password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="newpassword">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newpassword"
            name="newpassword"
            value={password.newpassword}
            onChange={onChangePassword}
            placeholder="Your New Password"
          />
        </div>
        <button
          type="button"
          className="mx-2 btn btn-primary"
          onClick={handlePasswordUpdate}
          disabled={password.newpassword.length < 5 || password.oldpassword.length < 5}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdater;
