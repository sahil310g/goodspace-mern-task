import './App.css';
import Login from "./components/Login";
import SpeechToText from "./components/SpeechToText";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextToSpeech from './components/TextToSpeech';

function App() {
  return (
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/speechToText" element={<SpeechToText/>}/>
        <Route path="/textToSpeech" element={<TextToSpeech/>}/>
      </Routes>
    </Router>
  );
}

export default App;
