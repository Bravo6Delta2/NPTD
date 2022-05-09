import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Profil.css'
import Table from './Table.js';
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles';
import Invitations  from './Invitations.js';
import {Tab,Tabs,Box,Typography} from '@mui/material/';
import { bgcolor } from '@mui/system';
import Create from './Create.js';
import TableD from './TableD.js';
class Profil extends React.Component{
  
    
    constructor(props){
        super(props);
        this.state={msg:'',ss:'dd',name:'',duration:0,category:1,description:'',date:0,page:1,pages:0,data:[],value:1}
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
        axios.post('http://localhost:3001/profil',data).then(
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
    
    chageNav=(e,v)=>{
        console.log(v)
        this.setState({value:v});
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
                <Box
                    sx={{bgcolor: 'transparent', display: 'flex', }}
                >
            <Tabs
            value={this.state.value}
            onChange={this.chageNav}
            indicatorColor="secondary"
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{bgcolor:'#0A1929',width:'max-content',height:'max-content',color:'aliceblue',hight:'max-content',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}
            >
        <Tab disableRipple={true} value={1} sx={{color:"aliceblue"}} label="VASE DEBATE" />
        <Tab disableRipple={true} value={2} sx={{color:"aliceblue"}} label="KREIRAJ DEBATU" />
        <Tab disableRipple={true} value={3} sx={{color:"aliceblue"}} label="POZIVINICE"/>
        <Tab disableRipple={true} value={4} sx={{color:"aliceblue"}} label="DEBATE"/>
      </Tabs>
            {this.state.value==1? <div className='margins'>
                    <Table data={this.state.data} msg={this.state.msg} chageS={this.changeState}/>
                    <Pagination onChange={this.changePage} page={this.state.page} count={this.state.pages} color="primary" size='large'/>
                </div>:<></>}
            {this.state.value==2? <Create/>:<></>}
            {this.state.value==3? <Invitations/>:<></>}
            {this.state.value==4? <TableD kind="0"/>:<></>}
        </Box>
        </div>
           
        )
    }
}

export default Profil;
