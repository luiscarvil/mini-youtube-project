import React from 'react'
import ShowVideo from './ShowVideo'
import VideosCard from './VideosCard'

const Body = ({ currentVideo, isLoading, videos, changeCurrentVideo}) => {
    console.log("here the currentVideo -->", currentVideo, videos)
 return (
     <div className="container">
         <div className="row">
             {/** componente video actual */}
             <ShowVideo currentVideo={currentVideo} isLoading={isLoading}/>
             {/** componente lista de videos */}
             <div className="col-md-5" style={{marginTop:"20px"}}>
                    {isLoading? 'Videos are loading':
                    videos.map(video => <VideosCard key={video._id} video={video} changeCurrentVideo={changeCurrentVideo}/>
                    )
}
             </div>
         </div>
     </div>
 )
}
export default Body