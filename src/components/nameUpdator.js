import React, { useState } from 'react';

const NameUpdator = ({ props }) => {

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
      else{
      // useEffect(() => {
        props.handleUploadNameSuccess(namer.name);
        console.log("we gave the new name : ", namer );
      // }, [onUploadSuccess]);
      }
      console.log('Name updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }
  const onChangeName= (e) =>{
    // e.preventDefault();
    setNamer({...namer,[e.target.name] : e.target.value});
  }


  return (
    <>

    <div className='text-white'>
      <h3 className='text-[24px] font-bold mx-1 my-2'>Update Name</h3>
      <form onSubmit={handleNameUpdate}>
        <div className="mb-3">
          <label htmlFor="namer" className="form-label text-[18px] font-normal text-white/50 ">Name</label>
          <input
            type="text"
            className=" text-[#ffffff]  pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#e49012c8]/10 border-0 rounded-md ring-1 ring-[#e49012c8] w-[400px] block text-[14px] focus:outline-none focus:shadow-md focus:shadow-orange-400 transition ease-in-out duration-300"
            id="name"
            name="name"
            value={namer.name}
            onChange={onChangeName}
            placeholder="Your New Name"
          />
        </div>
        <button
          type="button"
          onClick={handleNameUpdate}
          disabled={namer.name.length < 3}
          className="relative inline-flex items-center justify-center px-9 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group mt-1">
        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span class="relative text-[14px]">
          Update Name
        </span>
        </button>
      </form>
    </div>

    </>
  );
};

export default NameUpdator;
