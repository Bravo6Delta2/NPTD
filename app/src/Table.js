import axios from 'axios';
import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { pink,red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import Debata  from './Debata.js';
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
        this.state={br:0}
    }
    privatna = (e,v) => {
        let data = {
            tkn:localStorage.getItem('token'),
            id:e.target.name,
            private:v
        }
        console.log(data)
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
        console.log(data)
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
render(){
    return(
        <>
<table className='table table-dark table-striped table-hover'>
                 <thead className='thead-light'> 
                 <tr>
                    <th className='tr1' scope="col">NAZIV</th>
                    <th className='tr3' scope="col"><center>MODERATOR LINK</center></th>
                    <th className='tr3' scope="col"><center>LINK ZA KORISNIKA</center></th>
                    <th className='tr3' scope="col"><center>LINK ZA DEAKTVACIJU</center></th>
                    <th className='tr3' scope="col"><center>PRIVATNA</center></th>
                    <th className='tr3' scope="col"><center>PUSTI LINK</center></th>
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
                            <td id={"i"+post.id}><Link className='links' to={{pathname:"/debata",id:post.id}}>{post.naziv}</Link></td>
                            <td><center><a className='links' href={post.link_1}>JOIN</a></center></td>
                            <td><center><a className='links' href={post.link_2}>JOIN</a></center></td>
                            <td><center><a className='links' href={post.link_3}>JOIN</a></center></td>
                            <td><center><GreenSwitch checked={post.privatna} name={post.id} onChange={this.privatna}/></center></td>
                            <td><center><GreenSwitch checked={post.pusti} name={post.id} onChange={this.pusti}/></center></td>
                         </tr>
                         </>
                    ))
                    )
                    } 
                })()}

                </tbody>
            </table>
            </>
    )
}


}

export default Table;