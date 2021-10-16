import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import '../App.css';
import axios from 'axios';
import swal from 'sweetalert';

const prefix = 'http://localhost:3500'
function SignUp(){
    const [name, setName]=useState();
    const [email, setEmail]=useState();
    const [password, setPassword]=useState();
    const [password1, setPassword1]=useState();
    const [verification, setVerification]=useState();
    
      
    const newUser=async()=>{
        
        await axios.post(`${prefix}/mini-youtube/auth/signUp`, {name, email, password})
        .then(response=>{
            console.log(response.data);
            swal({
                title: "Envio exitoso",
                text: `Se ha enviado un codigo de verificación a${email} ingresalo para validar`,
                buttons: { cancel: "Close" },
                icon: "Success"
              });
                
        }).catch(error=>{
            console.log(error);
            swal({
                title: "Error",
                text: `${error.response.data.message}`,
                buttons: { cancel: "Close" },
                icon: "warning"
              });
        })

    }
    const newUserVerify=async()=>{
        
        await axios.post(`${prefix}/mini-youtube/auth/verify-signUp`, {email, verification})
        .then(response=>{
            console.log(response.data);
            swal({
                title: "Registro exitoso",
                text: `Se ha confirmado tu cuenta ${email} ya puedes ingresar`,
                buttons: { cancel: "Close" },
                icon: "Success"
              }).then( () => (window.location = "/signIn"))
                
        }).catch(error=>{
            console.log(error);
            swal({
                title: "Error",
                text: `${error.response.data.message}`,
                buttons: { cancel: "Close" },
                icon: "warning"
              });
        })

    }

    
        const saveData = (e) => {
            e.preventDefault()
        
            if(!name.trim()){
                console.log("Nombre esta vacio")
                return
            }
            if(!email.trim()){
                console.log("Email esta vacio")
                return
            }
    
            if(!password.trim() && password!==password1){
                console.log("Password esta vacio o no coinciden las contraseñas")
                return
            }
    
            console.log('procesando datos...' + name + email + password)
    
           
        }
        const saveVerification = (e) => {
            e.preventDefault()
        
            if(name.trim()){
                console.log("Nombre esta vacio")
                return
            }
         
           
        }
    
    return (
    
        <div className="App3">    
            <h1>Signup</h1>
            <form onSubmit={ saveData } >
                <input 
                    type="text"
                    placeholder="Ingrese Nombre Usuario"
                    className="form-control mb-2"
                    onChange={ (e) => setName(e.target.value) }
                />
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
                <input 
                    type="password"
                    placeholder="Ingrese nuevamente el Password"
                    className="form-control mb-2"
                    onChange={ e => setPassword1(e.target.value) }
                />
                <br /><br />
                <button className="btn btn-primary col-md-3" onClick={(e)=>newUser()}>Enviar codigo</button>
              
              {/*   <button className="btn btn-outline-primary form-control" >Sign Up</button>
               */}  
               
            
            </form>
            <form onSubmit={ saveVerification } >
                <input 
                    type="text"
                    placeholder={`Ingrese el codigo enviado a tu correo ${email}`}
                    className="form-control mb-2"
                    onChange={ (e) => setVerification(e.target.value) }
                />
               
                <br /><br />
                <button className="btn btn-primary col-md-3" onClick={(e)=>newUserVerify()}>Registrate</button>
              
              {/*   <button className="btn btn-outline-primary form-control" >Sign Up</button>
               */}  
                <a className="btn btn-primary col-md-3" href="/signIn">Retornar a login</a>
            
            </form>
        </div> 
                       
    );
  }

export default SignUp