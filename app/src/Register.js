import React from 'react';
import {Link} from 'react-router-dom';
import './css/Register.css'
import crypto from 'crypto-js';
import axios from 'axios'

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {ime: '', pass : '',prezime:'',email:''};
    }
    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      
    }

    Send = () =>{
        let data ={
            ime : this.state.ime,
            prezime : this.state.prezime,
            email : this.state.email,
            password : crypto.SHA256(this.state.pass).toString(),
        }

        axios.post('http://localhost:3001/register/',data)
        .then(

            (res)=>{
                if (res.data.msg == 'GG'){
                    window.alert('Morate se ulogovati');
                    this.props.history.push('/login/'); 
                }
                else if (res.data.msg == 'email'){
                window.alert('Email adresa je vec u upoterbi');
            }
            else{
                window.alert('Neuspjesna registarcija');
            }
        },
        (err)=>{
            window.alert('Neuspjesna registarcija');
        }
                

        );


    }

    render(){
        return( 

            <div className='colore d-flex justify-content-center container-fluid'>
                <div className='content'>
                <div className='container-fluid aa'>
                       <center>RGISTRACIJA</center>
                    </div>
                    <div className='container-fluid'>
                        <label>Ime</label> <br/><input name='ime' type="text"placeholder="Unesite svoje ime" onChange={this.textChanged}/>
                    </div>
                    <div className='container-fluid'>
                        <label>Prezime</label><input name='prezime' type="text"placeholder="Unesite svoje prezime" onChange={this.textChanged}/>
                    </div>
                    <div className='container-fluid'>
                        <label>Email</label><input name='email'type="text"placeholder="Unesite svoju email adresu"onChange={this.textChanged}/>
                    </div>
                    <div className='container-fluid'>
                        <label>Password</label><input name='pass' type="password"placeholder="Unesite svoju sifru"onChange={this.textChanged}/>
                    </div>
                    <div className='container-fluid'>
                        <button className='button1' onClick={this.Send}>Registruj se</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register;