import React, { useEffect, useRef, useState } from "react";
import "../styles/Chat.css";
import MuteButton from "../assets/images/MuteButton.png";
import ChatButton from "../assets/images/ChatButton.png";
import Volume from "../assets/images/Volume.png";
import OuterCircle from "../assets/images/OuterCircle.png";
import InnerCircle from "../assets/images/InnerCircle.png";
import Pause from "../assets/images/Pause.png";
import Header from "./Header";
import { Button } from "@mui/base";
import BackgroundVideo from "../assets/videos/Background-Video.mp4";
import { Link, useNavigate } from "react-router-dom";
import Video from "./Video";
import ChatPrint from "./ChatPrint";
import axios from "axios";

const SpeechToText = ({ chatList, setChatList, userEmail, socket }) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [textToSpeak, setTextToSpeak] = useState("");

  const navigate = useNavigate();

  // Function to scroll chat container to the bottom
  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  // For speech recognition
  let recognition = null;
  recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition
  recognition.lang = "en-US"; // Set language
  recognition.continuous = true; // Continuous listening
  const startListening = () => {
    console.log("Speech recognition Entered...");
    recognition.onstart = () => {
      setListening(true);
      console.log("Speech recognition started...");
    };
    recognition.onresult = (event) => {
      const currentTranscript =
        event.results[event.results.length - 1][0].transcript;
      setTranscript(currentTranscript);
      console.log(transcript);
    };
    recognition.onend = () => {
      setListening(false);
      console.log("Speech recognition ended.");
    };
    recognition.start();
  };

  // Response from OpenAI is received
  socket.on("receiveMessage", (data) => {
    const newList = [...chatList, { role: "assistant", message: data.message }];
    setChatList(newList);
    setTextToSpeak(data.message);
  });

  useEffect(() => {
    if (transcript) {
      socket.emit("sendMessage", { text: transcript, userEmail });
      const newList = [...chatList, { role: "user", message: transcript }];
      setChatList(newList);
    }
  }, [transcript]);

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
      console.log("Speech recognition stopped.");
    }
  };

  const speak = () => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      synth.cancel(); // Clear any existing utterances
      synth.speak(utterance);
    } else {
      console.error("Speech synthesis not supported");
    }
    setTextToSpeak("");
  };
  useEffect(() => {
    if (textToSpeak !== "") {
      speak(); // Start speech synthesis when text is available
    }
  }, [textToSpeak]);

  const fetchOldChats = async () => {
    const chatResponse = await axios.post(
      "https://chat-app-td6w.onrender.com/api/chats",
      {
        email: userEmail,
      }
    );
    const chatList = chatResponse.data.chats.map((item) => {
      return {
        role: item.role,
        message: item.content,
      };
    });
    setChatList(chatList);
  };

  useEffect(() => {
    if (userEmail === "") {
      navigate("/");
    } else {
      fetchOldChats();
    }
  }, []);

  return (
    <div className="chat">
      <Header />
      <video
        autoPlay
        loop
        muted="false"
        className="background-icon"
        alt="BackgroundImage"
        src={BackgroundVideo}
      />
      <div className="outer-box">
        <div className="big-box">
          <div className="inner-box" />
          <div className="big-video">
            <Video />
          </div>
          <div className="mute-btn button-div">
            <Button onClick={listening ? stopListening : startListening}>
              <img className="mute-button" alt="MuteButton" src={MuteButton} />
            </Button>
            <p>{listening ? "Mute" : "Unmute"}</p>
          </div>
          <div className="button-div">
            <div className="volume ">
              <div className="volume-meter">
                <div className="fill-meter"></div>
              </div>

              <img className="volume-icon" alt="VolumeIcon" src={Volume} />
            </div>
            <p>Volume</p>
          </div>
        </div>
        <div className="lower-box">
          <div className="text-box">
            <div className="chats" ref={chatContainerRef}>
              <ChatPrint chatList={chatList} />
            </div>
            <div className="button-div">
              <Link to="/textToSpeech">
                <Button className="chat-button">
                  <img
                    className="mute-button"
                    alt="ChatButton"
                    src={ChatButton}
                  />
                </Button>
              </Link>
              <p>Chat</p>
            </div>
          </div>
          <div className="pause-button-div">
            <Button className="pause-box">
              <img
                className="outer-circle"
                alt="ChatButton"
                src={OuterCircle}
              />
              <img className="inner-circle" src={InnerCircle} alt="" />
              <img className="pause-btn" src={Pause} alt="" />
              <p>Pause</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
