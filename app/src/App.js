import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import React from 'react';
import Login from './Login';
import Register from './Register';
import Guard from './Guard';
import Profil from './Profil';
import jwt from 'jwt-decode'
import yt from './galerija/youtube.png'
import fb from "./galerija/facebook.png"
import ins from "./galerija/instagram.png"
import puz from "./galerija/puzzle.png"
import logo from "./galerija/logoo.png"
import Debata from './Debata.js';
import Admin from './Admin';
import Info from './Info';
class App extends React.Component {
  
  render(){
    let x = '';
    let y = '';
    if(localStorage.getItem('token') == null || jwt(localStorage.getItem('token')).exp <  (new Date().getTime() + 1) / 1000){
        
       x = 'LOGIN';
       y = '/login';
      }
  else{
    x = 'PROFIL';
    y = '/profil';
      }
      return ( <Router>
        <div ata-spy="affix" data-offset-top="197">
          <div className='sticky d-sm-flex justify-content-sm-evenly headq'>
            <Link to='/' className='d-sm-flex debata'>DEBATUJ<span className='red'>.</span>MO</Link>
            <Link to='/info' className='d-sm-flex nesto'>O nama</Link>
            <Link to={y} className='d-sm-flex nesto'>{x}</Link>
          </div>
    <div className='min'>
        <Switch >
            <Route path='/debata/' component={Debata}/>
            <Route exact path='/'  component={Home}/>
            <Route exact path='/login'  component={Login}/>
            <Route exact path='/register'  component={Register}/>
            <Route exact path='/admin'  component={Admin}/>
            <Guard path='/profil' component={Profil}/>
            <Route exact path='/info'  component={Info}/>
            
        </Switch>        
        </div>
    </div>
    <div class="futer d-flex justify-content-around">
    <div>
    
        <div class="logo">
            <span class="float">
                <img src={puz} width="100" height="100"/>
            </span>
        </div>

        <div class="logo ps-3">
            <span class="float">
                Pratite nas:
            </span>
            </div> 

            <span class="float">
                <a href='https://www.instagram.com/?hl=en'><img src={ins} idth="40" height="40"/></a> 
            </span>
            <span class="float">
                <a href='https://m.facebook.com/'><img src={fb} idth="40" height="40"/></a> 
            </span>
            <span class="float">
                <a href='https://m.youtube.com/'><img src={yt} idth="40" height="40"/></a> 
            </span>

        </div>
        
        <div class="logo ">
            <span id="crta">|</span>
        </div>

        <div class="logo fut margins111">
            <span class="float">
               <b> Speech is to persuade, to convert, to compel.</b> <span id="red">SPEECH IS POWER.</span>
            </span>
        </div>


        <div class="logo margins11">
            <span class="sadrzajFutera">
            <h1><img src={logo} width="73" height="53"/ ><span>DEBATUJ<span className="red">.</span></span>MO</h1>
            </span>
        </div> 
    </div>  
    
    </Router>
    )
  }
}



export default App;
