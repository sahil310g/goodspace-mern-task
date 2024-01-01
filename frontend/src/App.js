import './App.css';
import Login from "./components/Login";
import SpeechToText from "./components/SpeechToText";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TextToSpeech from './components/TextToSpeech';
import { useState } from 'react';
import Socket, {socket} from './components/Socket';

function App() {
  const [chatList, setChatList] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  <Socket />
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setChatList={setChatList} setUserEmail={setUserEmail} socket={socket} />} />
        <Route path="/speechToText" element={<SpeechToText chatList={chatList} setChatList={setChatList} userEmail={userEmail} socket={socket} />} />
        <Route path="/textToSpeech" element={<TextToSpeech chatList={chatList} setChatList={setChatList} userEmail={userEmail} socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
