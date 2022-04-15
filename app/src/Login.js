import React from 'react';
import {Link} from 'react-router-dom';
import './css/Login.css'
import crypto from 'crypto-js';
import axios from 'axios'
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {user: '', pass : ''};
    }
    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      
    }
    Prijava = () =>{

        let data = {email:this.state.user,password:crypto.SHA256(this.state.pass).toString()}
        
        axios.post('http://localhost:3001/login/', data).then(
          (response) => {
      if(response.data.msg != 'GG')
         window.alert(response.data.msg);
      else{
                  localStorage.setItem('token', response.data.token);
                   this.props.history.push('/');  
                }
             } ,
             (err) => window.alert('Neuspjesno logovanje'));
    }

    render(){

        return(
            <div className='d-flex justify-content-center colore container-fluid'>
            <div class="content">
     <div class="text"><center>Prijava</center></div>
      <div>
        <div class="field">
          <span class="fa fa-user"></span>
          <input id="user" name='user' type="text" placeholder="Email" required onChange={this.textChanged}/>
       
        </div>
        <div class="field">
          <span class="fa fa-lock"></span>
          <input id="pass" name='pass' type="password" placeholder="Password" onChange={this.textChanged}/>
          
        </div>
        
        <button onClick={this.Prijava}>Prijavi se</button>
        <div class="or"><center>ili</center></div>
        <div class="icon-button"> 
            <center>
          <span class="facebook"><Link className='reg' to="/register">Registracija</Link></span>
    
    
          </center>
        </div>
      </div>
    </div>
    </div>
        )

    }


}
export default Login;