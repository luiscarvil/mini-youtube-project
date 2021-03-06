//import "../../App.css";
import Header from "../Header";
import Body from "./index";
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";


const routeBack = 'http://localhost:3500'
function Home() {
  //search item
  const [search, setSearch] = useState("");
  // search current video
  const [currentVideo, setCurrentVideo] = useState({})
  //isLoading
  const [currentReaction, setCurrentReaction] = useState()
  
  const [isLoading, setIsLoading] = useState(true)
  //searched data
  const [data, setData] = useState({});
  // add token to a variable
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  
// search calification to current video 
  // function retrive data

  const searchData = async(text) => {
    setSearch(text);

   await axios
      .get(`${routeBack}/mini-youtube/videos/searchByWord/${text}`, { headers:{ Authorization: token}})
      .then((videos) => {
        setData(videos.data)
        setCurrentVideo(videos.data[1])

      //  console.log("here", currentVideo)
        setIsLoading(false)
      })
      .catch((error) => {
        if (parseInt(error.response.data.code) === 401){
          swal({
            title: "Error Code",
            text: `${error.response.data.message}`,
            buttons: { cancel: "Close" },
            icon: "warning"
          }).then(
            () => (window.location = "/signIn"))
        } else{
          swal({
            title: "Error",
                text: `${error.response.data.message}`,
                buttons: { cancel: "Close" },
                icon: "warning"
              });
            }
        
      });

    };
    const changeCurrentVideo = async(video) =>{
      await setCurrentVideo(video)
    }

    const searchReaction = async() => {
      await axios
      .get(`${routeBack}/mini-youtube/reactions/find-reactions/${currentVideo._id}`, { headers:{ Authorization: token}})
      .then((reaction) => {
          setCurrentReaction(reaction.data.total)
          setIsLoading(false)
        })
        .catch((err) => {console.log(err)});
    
      };
      
      
      useEffect (() => {
        searchData("video")
        //searchReaction()
     },[])

  return (
    <div className="App">
      <Header search={searchData} />
      <Body currentVideo={currentVideo} isLoading={isLoading} videos= {data} changeCurrentVideo={changeCurrentVideo}  currentReaction={currentReaction}/>
    </div>
  );
}

export default Home;
