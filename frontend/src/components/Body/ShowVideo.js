import React from "react";
import axios from "axios";

const ShowVideo = ({currentVideo, isLoading}) =>{
    return (
        <div className="col-md-7 border pt-5" style={{height:'600px', marginTop:"20px"}}>
            {isLoading?"cargando...":(
                <>
                <iframe
                width="100%"
                height="80%"
                src={`https://mini-youtube-bk.s3.amazonaws.com/${currentVideo.video_key}`}
                frameBorder="0"
               // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture, fullscr"
                allowFullScreen
                title={currentVideo.video_key} /> 
            
            <h5>{currentVideo.title}</h5>
            <div className="ml-auto">
                <p>{currentVideo.description}</p>
            </div>
            </>
            )}
        </div>
    )
}
export default ShowVideo