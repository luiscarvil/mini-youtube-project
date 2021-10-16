import React, {useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import {useHistory} from 'react-router-dom'




    
const Header2 = ({email}) => {

    // input data//
    const [text, setText] = useState('')
    // on submit function
    const handleSubmit = (e) =>{
        e.preventDefault();
        }
    
    const LogOut=()=>{
  
      console.log("here")
      axios.get("http://localhost:3500/mini-youtube/auth/logOut")
      .then((response)=>{
          swal({ text: response.data.message, icon: "success" }).then(
                () => (window.location = "/")
                );
      }).catch((error)=>{
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
            
            
          })
        }
  return (
    
      // TODO here add the boton to upload-video and signOut
    <div className="container-fluid botder-bottom-1 shadow ">
      <div className="col-md-12 py-1 pb-0">
      <p>
            Bienvenido, <span className="text-primary">{email}</span>
          </p>
        <nav className="navbar">

          <form className="col-md-7" onSubmit={(e)=> handleSubmit(e)}>
            <div className="form-group d-flex">
              
              <a type="button" href="/" class="btn btn-primary col-md-3">Home</a>
              <a type="button" href="/uploadVideo" class="btn btn-primary col-md-3">Cargar Video</a>
              
              <a type="button"  className="btn btn-primary col-md-3 " onClick={(e)=>LogOut()}>
                <b>Cerrar Sesion</b></a>
            </div>
          </form> 

        </nav>
        
      </div>
    </div>
  );
};
export default Header2;