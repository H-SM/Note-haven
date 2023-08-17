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
