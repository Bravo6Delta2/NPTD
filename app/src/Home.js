import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Home.css'
import Table from './Table.js';
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles';
import Invitations  from './Invitations.js';
import {Tab,Tabs,Box,Typography} from '@mui/material/';
import { bgcolor, width } from '@mui/system';
class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={data:[],page:1,kat:1,pages:10}

    }
    componentDidMount(){
        let data = {page : this.state.page,kat:this.state.kat};
        axios.post('http://localhost:3001/home',data).then(

            (res)=>{
                console.log(res.data.data)
                if(res.data.msg=='GG'){
                    
                    this.setState({data:res.data.data}) 
                }
            },
            (err)=>{
                window.alert('Error')
            }

        )
    }
  
    changePage = (event, value) => {
        let data = {page : value,kat:this.state.kat};
        axios.post('http://localhost:3001/home',data).then(
            (res)=>{
                console.log(res.data.data)
                if(res.data.msg=='GG'){
                    
                    this.setState({data:res.data.data}) 
                }
            },
            (err)=>{
                window.alert('Error')
            }
        )
    }

    chageNav=(e,v)=>{
        let data = {page :1,kat:v};
        axios.post('http://localhost:3001/home',data).then(

            (res)=>{
                console.log(res.data.data)
                if(res.data.msg=='GG'){
                    
                    this.setState({data:res.data.data,kat:v,page:1})
                
                }
            },
            (err)=>{
                window.alert('Error')
            }

        )
    
    };
    
    render(){
        if (this.state.data.length==0){
            return(
                <div className='colore'>NEMA DEBATA</div>
            )
        }
        return(
            <>
               <Box
               
               >
           <Tabs
           centered
           value={this.state.kat}
           onChange={this.chageNav}
           indicatorColor="secondary"
           aria-label="Vertical tabs example"
          
           >
       <Tab disableRipple={true} value={1} sx={{color:"aliceblue",width:'max-content'}} label="PROGRAMIRANJE" />
       <Tab disableRipple={true} value={2} sx={{color:"aliceblue", width:'max-content'}} label="OBRAZOVANJE" />
     </Tabs>
     </Box>
            
            <div className='margins'>
                <center><h2 className='colore'>TRENUTNE DEBATE</h2></center>
                <center>
      {(() => {
                    if (this.props.msg=='pr1') {
                    return (
                      <tr key="1">
                       <td colSpan={4}>NEMA DEBATA</td>
                      </tr>
                    )
                    } else {
                    return (

                        <table className='table table-dark table-striped table-hover'>
                 <thead className='thead-light'> 
                 <tr>
                    <th className='tr1' scope="col">NAZIV</th>
                    <th className='tr3' scope="col"><center>LINK</center></th>
                    <th className='tr3' scope="col"><center>IME</center></th>
                    <th className='tr3' scope="col"><center>PREZIME</center></th>
                </tr>
                </thead>
                <tbody>
                    {this.state.data.map(post => (
                        <>
                        <tr key={post.id}>
                            <td id={"i"+post.id}><Link className='links' to={{pathname:"/debata",id:post.id}}>{post.naziv}</Link></td>
                            <td><center><a className='links' href={post.link_2}>JOIN</a></center></td>
                            <td><center>{post.ime}</center></td>
                            <td><center>{post.prezime}</center></td>
                         </tr>
                         </>
                    ))}
                    </tbody>
                         </table>
                    )
                    } 
                })()}
                 <Pagination onChange={this.changePage} page={this.state.page} count={this.state.pages} color="primary" size='large'/>
            </center>
            </div>
            </>
        )

    }


}
export default Home;