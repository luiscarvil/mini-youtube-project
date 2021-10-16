import React, {useState} from 'react'


const email = localStorage.getItem('email')

const Header = (props) => {
    // input data//
    const [text, setText] = useState('')
    // on submit function
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (text){
        props.search(text)
        } else {
          console.log("Nothing to search...")
        }
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
              
              <input
                type="text"
                name="search"
                id="search"
                placeholder="buscar video aquí"
                className="form-control col-md-10"
                value={text}
                onChange={(e)=>setText(e.target.value)}
              />
              <input
                type="submit"
                value="Buscar"
                className="btn btn-primary col-md-3"
              />
              <a type="button" href="/signIn" class="btn btn-primary col-md-3">Iniciar Sesion</a>
            </div>
          </form>

        </nav>
        
      </div>
    </div>
  );
};
export default Header;