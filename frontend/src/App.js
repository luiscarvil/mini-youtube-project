import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body/index";
import React, { useState, useEffect } from "react";
import axios from "axios";

const routeBack = 'http://localhost:3500'
function App() {
  //search item
  const [search, setSearch] = useState("");
  // search current video
  const [currentVideo, setCurrentVideo] = useState({})
  //isLoading
  const [isLoading, setIsLoading] = useState(true)
  //searched data
  const [data, setData] = useState({});
  // function retrive data
  const searchData = (text) => {
    setSearch(text);
    axios
      .get(`${routeBack}/mini-youtube/videos/searchByWord/${text}`)
      .then((videos) => {
        setData(videos.data)
        console.log(data,"---------------------------------------->")
        setCurrentVideo(videos.data[1])
        console.log("here", currentVideo)
        setIsLoading(false)
      })
      .catch((err) => console.log(err));

    };
    const changeCurrentVideo = (video) =>{
      setCurrentVideo(video)
    }

    useEffect(() => {
      searchData("video")
    }, [])

  return (
    <div className="App">
      <Header search={searchData}  />
      <Body currentVideo={currentVideo} isLoading={isLoading} videos= {data} changeCurrentVideo={changeCurrentVideo} />
    </div>
  );
}

export default App;
