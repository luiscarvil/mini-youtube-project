import React, {useState} from 'react'
const Header = (props) => {
    // input data//
    const [text, setText] = useState('')
    // on submit function
    const handleSubmit = (e) =>{
        e.preventDefault();
        props.search(text)
    }
  return (
      // TODO here add the boton to upload-video and signOut
    <div className="container-fluid botder-bottom-1 shadow ">
      <div className="col-md-12 py-1 pb-0">
        <nav className="navbar">
          <a className="navbar-brand font-weight-bold text-dark" href="/">
            MINI-YOUTUBE
          </a>
          <form className="col-md-7" onSubmit={(e)=> handleSubmit(e)}>
            <div className="form-group d-flex">
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
                className="btn btn-primary col-md-1"
              />
            </div>
          </form>
          <p>
            WBienvenido, <span className="text-primary">Guest</span>
          </p>
        </nav>
      </div>
    </div>
  );
};
export default Header;