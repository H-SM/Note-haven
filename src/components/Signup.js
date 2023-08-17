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
  return (
    <div className="text-white w-screen h-screen relative">
      <div
        className="absolute w-screen h-screen z-0 opacity-20"
        style={{
          backgroundColor: "#1b1b1b",
          backgroundImage: `
            url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 400"%3E%3Cdefs%3E%3Cpattern id="bg_pattern" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cline x1="0" y1="0" x2="10" y2="10" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="90" y1="90" x2="100" y2="100" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="10" y1="90" x2="0" y2="100" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="90" y1="10" x2="100" y2="0" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="40" y1="40" x2="60" y2="60" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3Cline x1="60" y1="40" x2="40" y2="60" stroke="%23f89a0fe6" stroke-width="6" stroke-linecap="round"%3E%3C/line%3E%3C/pattern%3E%3C/defs%3E%3Crect x="0" y="0" width="100%25" height="100%25" fill="%231b1b1b" opacity="1"%3E%3C/rect%3E%3Crect x="0" y="0" width="100%25" height="100%25" fill="url(%23bg_pattern)" opacity="1"%3E%3C/rect%3E%3C/svg%3E'
          `,
        }}
      />
    <div className="flex flex-col gap-11 justify-center items-center w-full h-full z-20">
    <img src={logo} alt="img" className="z-20 max-w-[400px]"/>
    <div className="z-20 mt-6 bg-black/30 w-[45vh] rounded-2xl ring-2 ring-[#e49012c8]/30 hover:shadow-lg hover:shadow-[#e49012c8]/30 transition ease-linear transition-1000 hover:[#e49012c8]/40">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name ="name" aria-describedby="emailHelp" placeholder="your Name..." onChange={onChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="your Email..." onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" placeholder="your Password..." onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="confirm your password..." onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </div>
  </div>
  )
}

export default Signup
