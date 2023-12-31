import React, { useEffect, useState } from "react";
import "../styles/TextToSpeech.css";
import Clip from "../assets/images/Clip.png";
import Microphone from "../assets/images/Microphone.png";
import VideoImage from "../assets/images/VideoImage.png";
import OuterCircle from "../assets/images/OuterCircle.png";
import InnerCircle from "../assets/images/InnerCircle.png";
import Pause from "../assets/images/Pause.png";
import Header from "./Header";
import { Button, Input } from "@mui/base";

import BackgroundVideo from "../assets/videos/Background-Video.mp4";
import { Link } from "react-router-dom";
import SentTextBubble from "./SentTextBubble";
import ReceivedTextBubble from "./ReceivedTextBubble";
import Video from "./Video";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [sentText, setSentText] = useState("");
  const [textToSpeak, setTextToSpeak] = useState("");

  const handleSubmit = () => {
    setSentText(text);
    setTextToSpeak(text);
    setText("");
  };
  
  const speak = () => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      synth.cancel(); // Clear any existing utterances

      synth.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };
  
  useEffect(() => {
    if (textToSpeak !== '') {
      speak(); // Start speech synthesis when text is available
    }
  }, [textToSpeak]);

  return (
    <div className="textToSpeech">
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
          <div className="chats">
            <SentTextBubble text={sentText} />
            <ReceivedTextBubble user="User1" text="lorem34" />
          </div>
          <div className="text-input">
            <div className="text-area">
              <Input
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <div className="icons">
              <Button>
                <img className="inner-icons" src={Clip} alt="" />
              </Button>

              <Button onClick={handleSubmit}>
                <img className="inner-icons" src={Microphone} alt="" />
              </Button>
            </div>
          </div>
        </div>
        <div className="lower-box">
          <div className="text-box">
            <div className="small-video">
              <Video/>
            </div>
            <div className="button-div">
              <Link to="/speechToText">
                <Button className="chat-button">
                  <img
                    className="mute-button"
                    alt="ChatButton"
                    src={VideoImage}
                  />
                </Button>
              </Link>
              <p>Video</p>
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

export default TextToSpeech;
