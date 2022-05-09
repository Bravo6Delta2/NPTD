import React from 'react'
import axios from 'axios';
import './css/Invitations.css'
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
class Invitations extends React.Component{
    constructor(props){
        super(props);
        this.state={data:[]}
    }

    remove(id){
        var filtered = this.state.data.filter(function(value, index, arr){ 
            return value.id != id;
        });
        this.setState({
            data:filtered
        })
    }
    componentDidMount(){
        axios.post('http://localhost:3001/invitations',{tkn:localStorage.getItem('token')}).then(
            (res)=>{
                this.setState({data:res.data.data,msg:res.data.msg})
            },
            (err)=>{
                window.alert('Error')
            }
        )
    }
    accept(id){
        axios.post('http://localhost:3001/accept',{tkn:localStorage.getItem('token'),id:id,prihvatio:true}).then(
            (res)=>{
                window.alert(res.data.msg)
            },
            (err)=>{
                window.alert('Error')
            })
            this.remove(id)
        }
    decline(id){
        axios.post('http://localhost:3001/accept',{tkn:localStorage.getItem('token'),id:id,prihvatio:false}).then(
            (res)=>{
                window.alert(res.data.msg)
            },
            (err)=>{
                window.alert('Error')
            })
            this.remove(id)
        }
    
    
    render(){
        if(this.state.msg!='GG'|| this.state.data.length == 0){
            return(
            <div className='margins-in3'>
                <h2 className='h1-in'>POZIVNICE</h2>
                <h3 className='h1-in'>Nema pozivnica</h3>
            </div>)
        }
        return(
            <div className='margins-in2'>
                <h2 className='h1-in'>POZIVNICE</h2>
                <table className='table table-dark table-striped table-hover'>
                    <thead className='thead-light'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAZIV</th>
                            <th scope="col">PRIHVATI</th>
                            <th scope="col">ODBI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((v,i)=>{
                            return(
                                <tr key={i}>
                                    <th scope="row">{i+1}</th>
                                    <td><Link className='links' to={{pathname:'/debata',id:v.id}}>{v.naziv}</Link></td>
                                    <td><button className='margins-in' onClick={()=>{this.accept(v.id)}}>PRIHVATI</button></td>
                                    <td><button className='margins-in' onClick={()=>{this.decline(v.id)}}>ODBI</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Invitations;
  