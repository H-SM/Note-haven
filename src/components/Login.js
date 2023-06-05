import React,{ useState} from "react";
import { useNavigate } from "react-router-dom";
function Login() {
    const [ credentails , setCredentails ] =useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleSubmit =async (e) => {
        e.preventDefault();
        const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentails.email ,password : credentails.password}) 
            });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the auth_token and redirect
            localStorage.setItem('token', json.auth_token);
            navigate("/");
        }else{
            alert("INVALID CREDENTAILS");
        }
    }
    const onChange= (e) =>{
        setCredentails({...credentails,[e.target.name] : e.target.value});
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentails.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentails.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
