import React from "react";
import { useCallback } from "react";
import "../styles/Chat.css";
import MuteButton from "../assets/images/MuteButton.png";
import ChatButton from "../assets/images/ChatButton.png";
import Clip from "../assets/images/Clip.png";
import Microphone from "../assets/images/Microphone.png";
import VectorImage from "../assets/images/Vector.png";
import photo from "../assets/images/photo.png";
import Volume from "../assets/images/Volume.png";
import OuterCircle from "../assets/images/OuterCircle.png";
import InnerCircle from "../assets/images/InnerCircle.png";
import Pause from "../assets/images/Pause.png";
import Header from "./Header";
import { Button, Input } from "@mui/base";

import BackgroundImage from "../assets/images/Background.png";
import BackgroundVideo from "../assets/videos/Background-Video.mp4";

const SpeechToText = () => {
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
          <div className="big-video"></div>
          <div className="mute-btn">
            <Button>
              <img className="mute-button" alt="MuteButton" src={MuteButton} />
            </Button>
          </div>
          <div className="volume">
            <div className="volume-meter">
              <div className="fill-meter"></div>
            </div>

            <img className="volume-icon" alt="VolumeIcon" src={Volume} />
          </div>
        </div>
        <div className="lower-box">
          <div className="text-box">
            <div className="chats">

            </div>
            <Button className="chat-button">
            <img className="mute-button" alt="ChatButton" src={ChatButton} />

            </Button>
          </div>
          <Button className="pause-box">
          <img className="outer-circle" alt="ChatButton" src={OuterCircle} />
            <img className="inner-circle" src={InnerCircle} alt="" />
            <img className="pause-btn" src={Pause} alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
