import axios  from 'axios';
import React from 'react';
import crypto from 'crypto-js';
import Table from './Table.js';
import Pagination from '@mui/material/Pagination';
class Admin extends React.Component{

    constructor(props){
        super(props);
        this.state={pass:'',pass1:'',page:1,pages:10,data:null}
    }
    Prijava=()=>{
        axios.post('http://localhost:3001/loga',{pass:crypto.SHA256(this.state.pass).toString()}).then(
            (res)=>{
                console.log(res.data)
                if(res.data.msg=='GG'){
                    this.setState({
                        pass1:crypto.SHA256(this.state.pass).toString()
                    })
                    this.getData(1);
                }
            },
            (err)=>{
                window.alert('Error');
            }
        )
    }

    getData=(v)=>{
        axios.post('http://localhost:3001/reports',{pass:this.state.pass1,page:v}).then(
            (res)=>{
                    if (res.data.msg == 'GG'){
                        this.setState({data:res.data.data})
                    }
            },
            (err)=>{
                window.alert('Error');
            }
        )
    }

    changePage = (e,v) =>{
        this.getData(v);
        this.setState({page:v})
    }

    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      
    }
    render(){
        if(this.state.pass1 == '') 
        return(
            <div className='d-flex justify-content-center colore container-fluid'>
            <div class="content">
     <div class="text"><center>Prijava</center></div>
     
        <div class="field">
          <span class="fa fa-lock"></span>
          <input id="pass" name='pass' type="password" placeholder="Password" onChange={this.textChanged}/>
          
        </div>
        
        <button onClick={this.Prijava}>Prijavi se</button>
      </div>
    </div>
        )
        else{
            if(this.state.data == null){
                return(
                    <>NEMA PRIJAVA</>
                )
            }
            else
            return(
                <div className='margins'>
                <Table data={this.state.data} msg={this.state.msg} chageS={this.changeState} pass={this.state.pass1}/>
                <Pagination onChange={this.changePage} page={this.state.page} count={this.state.pages} color="primary" size='large'/>
                </div>
            )
        }
    }
}
export default Admin; 