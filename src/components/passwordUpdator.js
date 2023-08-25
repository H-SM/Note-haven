import React, { useContext, useState } from 'react';
import contextValue from "../context/User/userContext.js";

const PasswordUpdater = () => {
    const [password, setPassword ]= useState({ oldpassword:"", newpassword:"", checkpassword:""});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const context = useContext(contextValue);
    const { changepassword, setUserData, userData} = context;

    const toggleOldPasswordVisibility = () => {
      setShowOldPassword(!showOldPassword);
    };
  
    const toggleNewPasswordVisibility = () => {
      setShowNewPassword(!showNewPassword);
    };

    const onChangePassword= (e) =>{
        e.preventDefault();
        setPassword({...password,[e.target.name] : e.target.value});
    }

    const handlePasswordUpdate = async () => {
      if (password.oldpassword.trim() == "" || password.newpassword.trim() == ""|| password.checkpassword.trim() == "") {
        alert("Please fill in all the details required!");
        return; 
      }

      if(password.newpassword !== password.checkpassword){
        alert("Recheck your new password!");
        return ;
      }
        try {
          const updatedUser = await changepassword({oldpassword : password.oldpassword, newpassword : password.newpassword}); 
            
            if(!updatedUser.success){
                alert(updatedUser.error);
            }
            else{
            console.log('Password updated successfully:', updatedUser);
            alert("Password updated successfully!")
            }
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
          <div className="relative">
          <input
            type={showOldPassword ? 'text' : 'password'}
            className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/10 border-0 rounded-md ring-1 ring-[#e49012c8] w-[400px] block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300"
            id="oldpassword"
            value={password.oldpassword}
            name="oldpassword"
            onChange={onChangePassword}
            onKeyDown={onKeyDown}
            placeholder="Your Old Password"
          />
          <button
              type="button"
              className="absolute right-3 top-[0.3vh] transform  text-[#ff8000] focus:outline-none"
              onClick={toggleOldPasswordVisibility}
            >
              {showOldPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>              
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

              )}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label  text-[18px] font-normal text-white/50" htmlFor="newpassword">New Password</label>
          <div className="relative">
          <input
            type={showNewPassword ? 'text' : 'password'}
            className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/10 border-0 rounded-md ring-1 ring-[#e49012c8] w-[400px] block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300"
            id="newpassword"
            name="newpassword"
            value={password.newpassword}
            onChange={onChangePassword}
            onKeyDown={onKeyDown}
            placeholder="Your New Password"
          />
          <button
              type="button"
              className="absolute right-3 top-[0.3vh] transform  text-[#ff8000] focus:outline-none"
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>              
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

              )}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="oldpassword" className="form-label text-[18px] font-normal text-white/50 ">Check New Password</label>
          <input
            type='password'
            className="text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/10 border-0 rounded-md ring-1 ring-[#e49012c8] w-[400px] block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300"
            id="checkpassword"
            value={password.checkpassword}
            name="checkpassword"
            onChange={onChangePassword}
            onKeyDown={onKeyDown}
            placeholder="Check New Password"
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
