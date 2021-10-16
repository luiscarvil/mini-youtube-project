import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import swal from 'sweetalert';


const LoginCard = ()=>{
      
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();

   
    const history = useHistory()

    const Login=async()=>{
        
        await axios.post("http://localhost:3500/mini-youtube/auth/signIn", {email, password})
        .then((response)=>{
            localStorage.setItem("token", response.headers.authorization)
            localStorage.setItem("email", email)
            let path = `/`; 
            history.push(path);
            swal({
                title: "Inicio de Sesion",
                text: `${response.data.message}`,
                buttons: { cancel: "Close" },
                icon: "Success"
              });
        }).catch((error)=>{
            swal({
                title: "Error",
                text: `${error.response.data.message}`,
                buttons: { cancel: "Close" },
                icon: "warning"
              });
          
        })
    }






    
        const guardarDatos = (e) => {
            e.preventDefault()
        
            if(email === undefined || !email.trim()){
                swal("Espera", "Email esta vacio")
                return
            }
    
            if(password === undefined || !password.trim()){
                console.log("Password esta vacio")
                return
            }
    
            console.log('procesando datos...' + email + password)
    
           
        }
    
      /*   let error = ''
        console.log("here the state", this.state) */
/*         if (this.state.message){
            error = (
                <div className= "alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            )
        } */
    return (
    
        <div className="App2">    
            <h1>Login</h1>
            <form onSubmit={ guardarDatos } >
                
                <input 
                    type="email"
                    placeholder="Ingrese Email"
                    className="form-control mb-2"
                    onChange={ (e) => setEmail(e.target.value) }
                />
                <input 
                    type="password"
                    placeholder="Ingrese Password"
                    className="form-control mb-2"
                    onChange={ e => setPassword(e.target.value) }
                />
                
                <br /><br />
                <button className="btn btn-outline-primary form-control" onClick={(e)=>Login()}>Log in</button>
                
                <button 
                    className="btn btn-outline-primary form-control"
                        
                    style={{
                        marginRight: "10px",
                    }}
                >

                    <i className="bi bi-box-arrow-in-right"></i> Sign Up    
                </button>
{                <button 
                    className="btn btn-outline-primary form-control"
                > 
                    <i className="bi bi-box-arrow-in-right"></i> Forgot Password    
                </button> }
            </form>
        </div> 
                       
    );
  }

export default LoginCard;
