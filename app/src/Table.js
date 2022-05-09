import axios from 'axios';
import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { pink,red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import  Pagination  from '@mui/material/Pagination';
import { appBarClasses } from '@mui/material';
const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[900],
    '&:hover': {
      backgroundColor: alpha(red[900], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[900],
  },
}));

class Table extends React.Component{

    constructor(props){
        super(props);
        console.log(props)
        this.state={br:0,pass:props.pass}
    }
    privatna = (e,v) => {
        let data = {
            tkn:localStorage.getItem('token'),
            id:e.target.name,
            private:v
        }
      axios.post('http://localhost:3001/setprivate',data).then(
            (res)=>{
                    this.props.chageS(e.target.name,v)
            },
            (err)=>{
                window.alert('Error')
            }
      )
    }
    pusti = (e,v) => {
        let data = {
            tkn:localStorage.getItem('token'),
            id:e.target.name,
            pusti:v
        }
      axios.post('http://localhost:3001/setprivate',data).then(
            (res)=>{
                if(res.data.msg=='GG'){
                    e.target.checked=v;
                }
            },
            (err)=>{
                window.alert('Error')
            }
      )
    }
    ugasi = (e) => {
        axios.post('http://localhost:3001/ugasi',{tkn:localStorage.getItem('token'),id:e.target.name,pass:this.state.pass}).then()
    }
render(){
    return(
        <center>
        <h2 className='colore'>VAŠE DEBATE</h2>
<table className='table table-dark table-striped table-hover'>
                 <thead className='thead-light'> 
                 <tr>
                    <th className='tr1' scope="col">NAZIV</th>
                    <th className='tr3' scope="col"><center>MODERATOR LINK</center></th>
                    <th className='tr3' scope="col"><center>LINK ZA KORISNIKA</center></th>
                    <th className='tr3' scope="col"><center>LINK ZA DEAKTVACIJU</center></th>
                    <th className='tr3' scope="col"><center>PRIVATNA</center></th>
                    <th className='tr3' scope="col"><center>PUSTI LINK</center></th>
                    <th className='tr3' scope="col"><center>STANJE</center></th>
                </tr>
                </thead>
                <tbody>
                {(() => {
                    if (this.props.msg=='pr1') {
                    return (
                      <tr key="1">
                       <td colSpan={4}>NEMA DEBATA</td>
                      </tr>
                    )
                    } else {
                    return (
                    this.props.data.map(post => (
                        <>
                        <tr key={post.id}>
                            <td id={"i"+post.id}><Link target="_blank" className='links' to={{pathname:"/debata/"+post.id,id:post.id}}>{post.naziv}</Link></td>
                            <td><center><a className='links' href={post.link_1}>JOIN</a></center></td>
                            <td><center><a className='links' href={post.link_2}>JOIN</a></center></td>
                            <td><center><a name={post.id} onClick={this.ugasi} className='links' href={post.link_3}>UGASI</a></center></td>
                            <td><center><GreenSwitch checked={post.privatna} name={post.id} onChange={this.privatna}/></center></td>
                            <td><center><GreenSwitch checked={post.pusti} name={post.id} onChange={this.pusti}/></center></td>
                            <td><center> {(() => {
                                        switch (post.stage) {
                                        case  1:   return  (<span className='uskoro1'>USKORO</span>);
                                        case  2:   return  (<span className='trenutno'>TRENUTNO</span>);
                                        case  3:   return (<span className='zavrseno'>ZAVRSENO</span>);
                                        case  4:   return (<span className='zavrseno'>UGASENA OD ADMINA</span>);
                                        default:      return "#FFFFFF";
                                        }
                                    })()}</center></td>
                         </tr>
                         </>
                    ))
                    )
                    } 
                })()}

                </tbody>
            </table>
            
            </center>
    )
}


}

export default Table;