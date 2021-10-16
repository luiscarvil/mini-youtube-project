
import React, { useState } from "react";
import {FaStar} from "react-icons/fa"
import axios from "axios";
import swal from "sweetalert";

const prefix = 'http://localhost:3500'

const token = localStorage.getItem('token')

const Rating = ({currentVideo}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
 
  const addRating=async()=>{
        
    await axios.post(`${prefix}/mini-youtube/reactions/create-update`, {video_id:currentVideo._id, interaction: rating}, { headers: { Authorization: token }})
    .then((response)=>{
         swal({
            title: "Calificacion",
            text: `${response.data.message}`,
            buttons: { cancel: "Close" },
            icon: "Success"
          }).then(() => (window.location = "/"))
    }).catch((error)=>{
        swal({
            title: "Errorddd",
            text: `${error.response.data.message}`,
            buttons: { cancel: "Close" },
            icon: "warning"
          });
      
    })
}
  
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {setRating(ratingValue)
                addRating()
            }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
//color={{filled: "rgb(136 87 25)", unfilled: "rgb(214 184 147)"}}
//count={10}
export default Rating;