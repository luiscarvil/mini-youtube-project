import React from "react";
import axios from "axios";

const VideosCard = ({ video, changeCurrentVideo }) => {
    console.log(video)
  return (
    <div
      key={video._id}
      className="border col-md-12 d-flex mb-1 p-1"
      style={{ cursor: "Pointer" }} onClick ={()=> changeCurrentVideo(video)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        height="100%"
        width="40%"
        className="mr-1"
      />
      <div style={{with:'68%'}}>
        <b>
          <p style={{ fontSize: '0.99rem !important' }}>{video.title}</p>
        </b>
        {/**<p className="text-right"> TODO aqui la calificacion por video </p>**/}
      </div>
    </div>
  );
};
export default VideosCard;
