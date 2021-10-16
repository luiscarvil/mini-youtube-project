import { render } from '@testing-library/react'
import React from 'react'
import ShowVideo from './ShowVideo'
import VideosCard from './VideosCard'

const Body = ({ currentVideo, isLoading, videos, changeCurrentVideo, currentReaction}) => {

    //console.log("here the currentVideo -->", currentVideo, videos)
    return (
     <div className="container">
         <div className="row">
             {/** componente video actual */}
             {isLoading? 'video cargando':
             <ShowVideo currentVideo={currentVideo} isLoading={isLoading} currentReaction={currentReaction}/>
            }
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