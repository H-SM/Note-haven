import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/Notes/NoteState";

function App() {
  return (
    <Router>
    <>
    <NoteState>
      <Navbar/>
      <div className="container my-3">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
      </Routes>
      </div>
      </NoteState>
    </>
    </Router>
  );
}

export default App;
