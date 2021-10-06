import React from "react";
import ReactPlayer from "react-player";
import "./player.css";

const ResponsivePlayer = ({ url }) => (
  <div className="player-wrapper">
    <ReactPlayer
      className="react-player"
      url={url}
      controls={true}
      loop={true}
      
      // try to resolve the problem "Failed to execute 'postMessage' on 'DOMWindow': The target origin provided
      //('https://www.youtube.com') does not match the recipient window's origin "
      config={{ youtube: { playerVars: { origin: "http://localhost:3000" } } }}
      //
    />
  </div>
);

export default ResponsivePlayer;
