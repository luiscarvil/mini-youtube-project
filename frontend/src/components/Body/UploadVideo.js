import React, { useState } from 'react';
import swal from 'sweetalert'
import Header from '../Header';
import axios from 'axios';

const token = localStorage.getItem('token')

function UploadFile() {
    const [file, setFile]=useState('');
    const [title, setTitle]=useState('');
    const [description, setDescription]=useState('');

    const upFile = file => {
        setFile(file);
        }

 

    const insertFile = async () => {
      const f = new FormData();

      for (let index = 0; index < file.length; index++) {
        f.append("file", file[index]);
        f.append("title", title);
        f.append("description", description);
      }

      await axios
        .post("http://localhost:3500/mini-youtube/videos/upload-video", f, {
          headers: { Authorization: token },
        })
        .then((response) => {
          swal({ text: response.data.message, icon: "success" }).then(
            () => (window.location = "/")
          );
        })
        .catch((error) => {
          swal({
            title: "Error",
            text: `${error.response.data.message}`,
            buttons: { cancel: "Close" },
            icon: "warning"
          });
          //swal(error.message);
        });
    };
    
        const saveData = (e) => {
            e.preventDefault()
        
            if(title === undefined || !title.trim()){
                swal("ERROR", "Título esta vacio")
                return false
            }
    
            if(!description.trim()){
                swal("Descripción esta vacio")
                return
            }
    
            console.log('procesando datos...' + title + description)
    
            e.target.reset()
            setTitle('')
            setDescription('')
        }
      
        return (
            <div>
            <Header />
            <div className="App1">
            <h2>Formulario</h2>
            <form onSubmit={ saveData } >
                <input 
                    type="text"
                    placeholder="Ingrese Titulo"
                    className="form-control mb-2"
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <input 
                    type="text"
                    placeholder="Ingrese Descripcion"
                    className="form-control mb-2"
                    onChange={ e => setDescription(e.target.value) }
                />
               
                 <br /><br />
                <input type="file" name="files" onChange={(e)=>upFile(e.target.files)}/> 
                <br /><br />
                <button className="btn btn-primary" onClick={(e)=>insertFile()}>Insertar Archivo</button>
                
                
            </form>
            </div>
        </div>
        );

    }

export default UploadFile;