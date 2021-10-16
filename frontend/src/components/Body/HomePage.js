import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    } from "react-router-dom";
import Home from './Home'
import Login from './Login'
import UploadFile from './UploadVideo';
import SignUp from './SignUp';
export default class HomePage extends Component {
  render()  {
    return (
        
        <div id="home">    
            <h1>Mini-Youtube</h1>
            <Router>
                <div className="container mt-5">
      
                    <hr />    
                    <Switch>
                    <Route path="/signIn" exact>
                            <Login />
                        </Route>
                        
                        <Route path="/" exact>
                            <Home />
                        </Route>

                        <Route path="/uploadVideo" exact>
                            <UploadFile />
                            
                        </Route>
                        <Route path="/signUp" exact>
                            <SignUp />   
                            </Route>                  
                    </Switch>
                </div>
            </Router>   
           
    </div>    
    );
  }
}