import React,{ useState} from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/Logo.png';

function Signup(props) {
  const [ credentails , setCredentails ] =useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();
  const handleSubmit =async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        const {name, email, password} = credentails;
        console.log(credentails) ;
        const req = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name , email ,password })
            });
        const response = await req.json();
        console.log(response);
        if(response.success){
            //save the auth_token and redirect
            localStorage.removeItem('token');
            localStorage.setItem('token', response.jwt_token);
            navigate("/");
            props.showAlert("Account created successfully!", "success");
        }else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }
  const onChange= (e) =>{
    setCredentails({...credentails,[e.target.name] : e.target.value});
}
  const handleClick = () => {
    navigate("/login");
}

  return (
    <div className="text-white w-screen h-screen relative">
      <div
        className="absolute w-screen h-screen z-0"
        style={{
          backgroundColor: "#1b1b1b",
          backgroundImage: `
            url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 400"%3E%3Cdefs%3E%3Cpattern id="bg_pattern" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cline x1="0" y1="0" x2="10" y2="10" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="90" y1="90" x2="100" y2="100" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="10" y1="90" x2="0" y2="100" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="90" y1="10" x2="100" y2="0" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="40" y1="40" x2="60" y2="60" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="60" y1="40" x2="40" y2="60" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3C/pattern%3E%3C/defs%3E%3Crect x="0" y="0" width="100%25" height="100%25" fill="%231b1b1b" opacity="1"%3E%3C/rect%3E%3Crect x="0" y="0" width="100%25" height="100%25" fill="url(%23bg_pattern)" opacity="0.2"%3E%3C/rect%3E%3C/svg%3E'
          `,
        }}
      />
    <div className="flex flex-col gap-11 justify-center items-center w-full h-full z-20">
    <img src={logo} alt="img" className="z-20 max-w-[400px]"/>
    <div className="z-20 mt-6 bg-black/40 w-[45vh] rounded-2xl ring-2 ring-[#e49012c8]/30 hover:shadow-lg hover:shadow-[#e49012c8]/30 transition ease-linear transition-1000 hover:[#e49012c8]/40">
    <p className="text-white px-6 pt-11 text-[40px] font-sans font-bold">Your Ideas, Elevated!</p>
    <span className="font-semibold text-[17px] px-8 text-secondary-white">Already have an account? <a onClick={handleClick} className="hover:cursor-pointer text-[#f89a0fe6]/80 hover:text-[#f89a0fe6] inline-block relative hover:underline">
    Login to your account
    <span class="absolute w-full h-0.5 bg-[#f89a0fe6] transform scale-x-0 bottom-0 left-0 origin-bottom-right transition-transform duration-250 ease-out group-hover:scale-x-100"></span>
  </a></span>

    <form onSubmit={handleSubmit} className="z-20 relative p-6 pt-3">
    <div className="mb-3 text-secondary-white/80 hover:text-secondary-white">
    <label htmlFor="name" className="form-label  font-mono text-[18px]">Name</label>
    <input type="text" className="text-[#ffffff] font-mono leading-[28px] pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#684d25c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8]/50 w-full block text-[18px] focus:outline-none focus:shadow-md focus:shadow-orange-400/40 transition ease-in-out duration-300" id="name" name ="name" aria-describedby="emailHelp" placeholder="your Name..." onChange={onChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label  font-mono text-[18px]">Email address</label>
    <input type="email" className="text-[#ffffff] font-mono leading-[28px] pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#684d25c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8]/50 w-full block text-[18px] focus:outline-none focus:shadow-md focus:shadow-orange-400/40 transition ease-in-out duration-300" id="email" name="email" aria-describedby="emailHelp" placeholder="your Email..." onChange={onChange}/>
    <div id="emailHelp" className="font-mono text-[15px] mt-1 text-secondary-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label  font-mono text-[18px]">Password</label>
    <input type="password" className="text-[#ffffff] font-mono leading-[28px] pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#684d25c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8]/50 w-full block text-[18px] focus:outline-none focus:shadow-md focus:shadow-orange-400/40 transition ease-in-out duration-300" id="password" name="password" placeholder="your Password..." onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label  font-mono text-[18px]">Confirm Password</label>
    <input type="password" className="text-[#ffffff] font-mono leading-[28px] pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#684d25c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8]/50 w-full block text-[18px] focus:outline-none focus:shadow-md focus:shadow-orange-400/40 transition ease-in-out duration-300" id="cpassword" name="cpassword" placeholder="confirm your password..." onChange={onChange} minLength={5} required/>
  </div>
  <div className="w-full flex justify-center items-center mt-[2rem] mb-3">
  <button type="submit" className="relative inline-flex items-center justify-center px-[5rem] py-[0.8rem] overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800/50 rounded-lg group mt-1">
    <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#e49012c8] rounded-full group-hover:w-[20rem] group-hover:h-[20rem]"></span>
    <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700/50"></span>
    <span class="relative text-[20px] font-semibold">
          Submit
    </span>
  </button>
  </div>
</form>
</div>
    </div>
  </div>
  )
}

export default Signup
