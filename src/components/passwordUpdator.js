import React, { useState } from 'react';

const PasswordUpdater = () => {
    const [password, setPassword ]= useState({ oldpassword:"", newpassword:""});

    const onChangePassword= (e) =>{
        e.preventDefault();
        setPassword({...password,[e.target.name] : e.target.value});
    }

    const handlePasswordUpdate = async () => {
      if (password.oldpassword.trim() === "" || password.newpassword.trim() === "") {
        alert("Please fill in all the details required!");
        return; 
      }
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
            
            if(!updatedUser.success){
                alert(updatedUser.error);
            }

            console.log('Password updated successfully:', updatedUser);
            alert("Password updated successfully!")
          } catch (error) {
            console.error('Error updating name:', error);
          }
    };

    const submithandler =(e) => {
      e.preventDefault();
    }

    const onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handlePasswordUpdate();
      }
    };
  return (
    <>
    <div className='w-full mt-5'></div>
    <div>
      <h3 className='text-[24px] font-bold mx-1 my-2'>Update Password</h3>
      <form onSubmit={submithandler}>
        <div className="mb-3">
          <label htmlFor="oldpassword" className="form-label text-[18px] font-normal text-white/50 ">Old Password</label>
          <input
            type="password"
            className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/10 border-0 rounded-md ring-1 ring-[#e49012c8] w-[400px] block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300"
            id="oldpassword"
            value={password.oldpassword}
            name="oldpassword"
            onChange={onChangePassword}
            onKeyDown={onKeyDown}
            placeholder="Your Old Password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label  text-[18px] font-normal text-white/50" htmlFor="newpassword">New Password</label>
          <input
            type="password"
            className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/10 border-0 rounded-md ring-1 ring-[#e49012c8] w-[400px] block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300"
            id="newpassword"
            name="newpassword"
            value={password.newpassword}
            onChange={onChangePassword}
            onKeyDown={onKeyDown}
            placeholder="Your New Password"
          />
        </div>
        <button
          type="button"
          className="relative inline-flex items-center justify-center px-9 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mt-1"
          onClick={handlePasswordUpdate}
          disabled={password.newpassword.length < 5 || password.oldpassword.length < 5}
        >
          <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span class="relative text-[14px]">
          Update Password
        </span>
        </button>
      </form>
    </div>
    </>
  );
};

export default PasswordUpdater;
