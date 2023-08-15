import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/Notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import YourNote from './components/YourNote';
import Sidenav from "./components/Sidenav";

function App() {
  const [alert , setAlert ] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1200);
  };

  return (
    <div className="bg-primary-black w-full h-[100vh] overflow-hidden">
    <Router>
    <NoteState>
    <div className="flex flex-between">
    <Sidenav/>
    <div className="flex flex-col w-full">
    <Navbar />
    <Alert alert={alert} />
    <div className="container my-3">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
        <Route path="/note/:id" element={<YourNote />} />
        {/* <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/> */}
        </Routes>
              </div>
            </div>
          </div>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;
