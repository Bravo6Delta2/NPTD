import React from 'react';
import Link from 'react-router-dom';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Profil.css'
import Table from './Table.js';
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles';

class Profil extends React.Component{
  
    
    constructor(props){
        super(props);
        this.state={msg:'',ss:'dd',name:'',duration:0,category:1,description:'',date:0,page:1,pages:0,data:[]}
        this.changeState = this.changeState.bind(this);
    }
    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    changePage =(e,v)=>{
        let k = parseInt(v)
       let data = {tkn:localStorage.getItem('token'),page:k,bo:false};
        axios.post('http://localhost:3001/profil',data).then(
            (res)=>{
                this.setState(
                    {ss:'xx',
                    data:res.data.data,
                    msg:res.data.msg,
                    page:k
                }
                )
                this.forceUpdate();
                this.render();
                console.log(this.state.data)
            },
            (err)=>{
                window.alert('Error')
            }
        )
     
    }

    componentDidMount(){
        let data = {tkn:localStorage.getItem('token'),page:this.state.page,bo:true};
        axios.post('http://192.168.0.19:3001/profil',data).then(
            (res)=>{
                this.setState(
                    {ss:'xx',
                    data:res.data.data,
                    msg:res.data.msg,
                    pages:res.data.pages   
                }
                )
                
            },
            (err)=>{

            }
        )
    }
    
    
    create=()=>{
        let data={
            tkn:localStorage.getItem('token'),
            name:this.state.name,
            duration:this.state.duration,
            category:this.state.category,
            description:this.state.description,
            date:this.state.date
        }
        
        axios.post('http://192.168.0.19:3001/create',data).then(
            (res)=>{
                <Redirect to={{ pathname: '/profil' }} />
            },
            (err)=>{
                <Redirect to={{ pathname: '/login' }} />
            }
        )
    }
    Drop(){
        if (document.getElementById('dugme1').classList.contains('d-none')){
            document.getElementById('div11').classList.replace('d-none','d-flex')
            document.getElementById('dugme1').classList.replace('d-none','dugme');
            
        }
        else{
            document.getElementById('div11').classList.replace('d-flex','d-none');
            document.getElementById('dugme1').classList.replace('dugme','d-none');
           
        }
    }
    changeState = (n,v) => {
       this.state.data.forEach(element => {
           if(element.id == n){
               element.privatna = v
           }
       })
       this.forceUpdate();
    }
    render(){
        
            if (this.state.ss=='dd')
        return(
            <div>hahah</div>
        )
        return(
            <div>
                <button className='dugme' onClick={this.Drop}>KREIRAJ DEBATU</button>
                <div id='div11' class='d-none pading flex-column'>
                    <div className='d-flex justify-content-around'>
                    <div className='d-flex'>
                        <label className='xxs'>NAZIV DEBATE</label>
                             <input type='text' name='name'onChange={this.textChanged} required placeholder='Naziv debate'/>
                    </div>
                    <div className='d-flex'>
                         <label className='xxs p-3'>KATEGORIJA</label>
                        <select className='slect' name='category' onChange={this.textChanged} required>
                            <option className='dropdown-item' value='1'>Programiranje</option>
                            <option value='2'>Obrazovanje</option>
                        </select>    
                    </div>
                  
                    </div>

                    <div className='d-flex justify-content-around pt-3'>
                    <div className='d-flex'>
                        <label className='xxs'>DATUM POCETKA</label>
                        <input type='datetime-local'name='date' onChange={this.textChanged} required placeholder='Naziv debate'/>
                    </div>
                    <div className='d-flex'>
                    <label className='xxs'>DUZINA DEBATE</label>
                        <input type='number'name='duration' onChange={this.textChanged} required placeholder='Naziv debate'/>
                    </div>
                  
                    </div>

                    <div className='d-flex pt-3'>
                    <div className='d-flex ms-2'>
                    <label className='xxs'>OPIS DEBATE</label>
                        <textarea cols="50" rows="10" name='description' onChange={this.textChanged} required placeholder='Naziv debate'/>
                    </div>
                    </div>

                </div>
               
                    <button id='dugme1' class='d-none' onClick={this.create}>KREIRAJ DEBATU</button>
                   
                <div className='margins'>
                
                <center><h2 className='colore'>VAŠE DEBATE</h2></center>
                <center>
                    <Table data={this.state.data} msg={this.state.msg} chageS={this.changeState}/>
                    <Pagination onChange={this.changePage} page={this.state.page} count={this.state.pages} color="primary" size='large'/>
                </center>
                
            </div>
            </div>
        )
    }
}

export default Profil;