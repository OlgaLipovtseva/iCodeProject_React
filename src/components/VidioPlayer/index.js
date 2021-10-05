import React from "react";
import ReactPlayer from "react-player";
 import "./player.css";

 const ResponsivePlayer = ({url}) => (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url={url}
            controls='true'
            loop='true'
          />
        </div>
      );

  export default ResponsivePlayer;