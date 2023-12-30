import './App.css';
import Login from "./components/Login";
import SpeechToText from "./components/SpeechToText";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/chat" element={<SpeechToText/>}/>
      </Routes>
    </Router>
  );
}

export default App;
