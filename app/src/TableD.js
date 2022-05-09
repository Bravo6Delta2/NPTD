import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
class TableD extends React.Component{
    constructor(props){
        super(props);
        this.state={msg:'',kind:props.kind}
    }

    componentDidMount(){
        let data = {tkn:localStorage.getItem('token'),kind:this.state.kind};
        axios.post('http://localhost:3001/td',data).then(
            (res)=>{
                if(res.data.msg=='GG'){
                    this.setState({msg:res.data.msg,data:res.data.data})
                }
            },
            (err)=>{}
        )
    }

    render(){
        if (this.state.msg!='GG'){
            return(<h2>DEBATE <br/> NEMA DEBATA</h2>)
        }
        return(
            <div>
                     <div className='margins-in2'>
                <h2 className='h1-in'>DEBATE</h2>
                <table className='table table-dark table-striped table-hover'>
                    <thead className='thead-light'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAZIV</th>
                            <th scope="col">LINK</th>
                            <th scope="col">DATUM</th>
                            <th scope="col">PRIVATNA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((v,i)=>{
                            return(
                                <tr key={i}>
                                    <th scope="row">{i+1}</th>
                                    <td><Link target="_blank" className='links' to={{pathname:'/debata',id:v.id}}>{v.naziv}</Link></td>
                                    <td><Link to={v.link_2} className='links'>JOIN</Link></td>
                                    <td>{v.datum}</td>
                                    <td>{v.private?<PublicIcon/>:<LockIcon/>}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            </div>
        )
    }
}

export default TableD;