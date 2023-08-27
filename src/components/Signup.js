import React,{ useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/Logo.png';
import contextValue from "../context/User/userContext.js";

function Signup(props) {
  const [ credentails , setCredentails ] =useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const context = useContext(contextValue);
  const { signin } = context;

  const handleSubmit =async (e) => {
        e.preventDefault();
        if(credentails.password !== credentails.cpassword){
          alert("Recheck your new password!");
          return ;
        }
        const {name, email, password} = credentails;

        console.log(credentails);

        const response = await signin({name , email ,password });
        console.log(response);
        if(response.success){
            //save the auth_token and redirect
            localStorage.removeItem('token');
            localStorage.setItem('token', response.jwt_token);
            navigate("/");
            props.showAlert("Account created successfully!", "success");
        }else{
            props.showAlert("Invalid Credentials", "danger");
            alert("Invalid Credentials! Please check again...");
        }
    }
  const onChange= (e) =>{
    setCredentails({...credentails,[e.target.name] : e.target.value});
}
  const handleClick = () => {
    navigate("/login");
}

const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

  return (
    <div className="text-white w-screen h-screen relative">
    <div
      className="absolute w-full h-full z-0"
    >
       <div
      className="w-full h-full"
      style={{
        position: 'relative',
      }}
    >
      <div
      className="absolute top-[-90vh] left-[-55vh] w-[4000px] h-[4000px] animate-spin-slow"
        style={{
          backgroundImage: `conic-gradient(from 0deg at 50% 50%, rgba(228, 144, 18, 0.784), rgb(181, 63, 81), rgb(123, 46, 150), rgba(228, 144, 18, 0.784))`,
        }}
      ></div>
    </div>
    </div>
  <div className="flex flex-col gap-11 justify-center items-center w-full h-full z-20">
    <img src={logo} alt="img" className="z-20 max-w-[400px]"/>
    <div className="z-20 bg-black/40 w-[45vh] rounded-2xl ring-1 ring-[#e49012c8]/30 hover:shadow-lg hover:shadow-[#e49012c8]/30 transition ease-linear transition-1000 backdrop-blur-lg hover:[#e49012c8]/40">
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
    <div className='relative'>
    <input type={showPassword ? 'text' : 'password'} className="text-[#ffffff] font-mono leading-[28px] pr-[1rem] pl-[1rem] pt-[0.375rem] pb-[0.375rem] bg-[#684d25c8]/20 border-0 rounded-md ring-1 ring-[#e49012c8]/50 w-full block text-[18px] focus:outline-none focus:shadow-md focus:shadow-orange-400/40 transition ease-in-out duration-300" id="password" name="password" placeholder="your Password..." onChange={onChange} minLength={5} required/>
    <button
              type="button"
              className="absolute right-3 top-[0.3vh] transform  text-[#ff8000] focus:outline-none"
              onClick={togglePasswordVisibility}
            >
             
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>              
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

              )}
            </button>
            </div>
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
