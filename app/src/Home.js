import React from 'react';
import Link from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Home.css'
import Table from './Table.js';
class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={data:[]}

    }
    componentDidMount(){

        axios.post('http://localhost:3001/home',null).then(

            (res)=>{
                if(res.data.msg=='GG'){
                    this.state.data=res.data.data;
                    this.forceUpdate();
                }
            },
            (err)=>{
                window.alert('Error')
            }

        )
    }
    
    render(){
        if (this.state.data.length==0){
            return(
                <div className='colore'>NEMA DEBATA</div>
            )
        }
        return(
            <div className='margins'>
                <center><h2 className='colore'>TRENUTNE DEBATE</h2></center>
                <center>
                <Table data={this.state.data}/>
            </center>
            </div>
        )

    }


}
export default Home;