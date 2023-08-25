import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import Home from "./components/Home";
import NoteState from "./context/Notes/NoteState";
import UserState from "./context/User/userState";
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
    <Router>
    <div className="bg-primary-black w-full h-[100vh] overflow-hidden">
    <UserState>
    <NoteState>
    <div>
      <Routes>
        <Route exact path="/" element={<>
          <div className="flex flex-between">
          <Sidenav />
          <div className="flex flex-col w-full">
          <Navbar />
          <Alert alert={alert}/>
          <Home showAlert={showAlert} />
          </div>
          </div>
        </>}/>
        <Route exact path="/settings" element={<>
          <div className="flex flex-between">
          <Sidenav />
          <div className="flex flex-col w-full">
          <Settings/>
          </div>
          </div>

          </>}/>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
        <Route path="/note/:id" element={<YourNote />} />
        {/* <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/> */}
        </Routes>
              </div>
        </NoteState>
        </UserState>
    </div>
    </Router>
  );
}

export default App;
