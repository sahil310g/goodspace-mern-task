import React, { useState } from "react";
import { useCallback } from "react";
import "../styles/TextToSpeech.css";
import MuteButton from "../assets/images/MuteButton.png";
import ChatButton from "../assets/images/ChatButton.png";
import Clip from "../assets/images/Clip.png";
import Microphone from "../assets/images/Microphone.png";
import VideoImage from "../assets/images/VideoImage.png";
import photo from "../assets/images/photo.png";
import Volume from "../assets/images/Volume.png";
import OuterCircle from "../assets/images/OuterCircle.png";
import InnerCircle from "../assets/images/InnerCircle.png";
import Pause from "../assets/images/Pause.png";
import Header from "./Header";
import { Button, Input } from "@mui/base";

import BackgroundImage from "../assets/images/Background.png";
import BackgroundVideo from "../assets/videos/Background-Video.mp4";
import { Link } from "react-router-dom";

const TextToSpeech = () => {
  const [sentText, setSentText] = useState('');
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
          <div className="chats"></div>
          <div className="text-input">
            <div className="text-area">
              <Input
                value={sentText}
                onChange={(e)=>{setSentText(e.target.value)}}
              />
            </div>
            <div className="icons">
              <Button>

            <img className="inner-icons" src={Clip} alt="" />
              </Button>
            <Button>

            <img className="inner-icons" src={Microphone} alt="" />
            </Button>
              
            </div>
          </div>
        </div>
        <div className="lower-box">
          <div className="text-box">
            <div className="small-video"></div>
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
