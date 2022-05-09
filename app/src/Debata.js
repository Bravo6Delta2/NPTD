import axios from 'axios';
import React from 'react';
import "./css/Debata.css";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
class Debata extends React.Component{

    constructor(props){
        super(props);
        
        this.state={id:window.location.pathname.split('/')[2]}
    }
    componentDidMount(){
    
        if(this.state.id == 0)
        return
        let data = {id:this.state.id};
        console.log(data)
        axios.post('http://localhost:3001/debata',data).then(
            (res)=>{
                if(res.data.msg=='GG'){
                    this.setState({
                        data:res.data.data,
                        msg:res.data.msg,
                    })
                }
            },
            (err)=>{}
        )
           
    }
   
    render(){
        console.log(this.state.data)
        if (this.state.id == 0){
            return null;
        }
        else if(this.state.msg !="GG"){
            return(
                <div>
                    <h1>{this.state.msg}</h1>
                </div>
            )
        }
        return(
            <div className='debata1 container-fluid'>
                <h3>STANJE : {(() => {
                                        switch (this.state.data.stage) {
                                        case 1:   return  (<span className='uskoro1'>USKORO</span>);
                                        case 2:   return  (<span className='trenutno'>TRENUTNO</span>);
                                        case 3:   return (<span className='zavrseno'>ZAVRSENO</span>);
                                        default:      return "#FFFFFF";
                                        }
                                    })()}</h3>
                <h3>ORGANIZATOR : {this.state.data.ime} {this.state.data.prezime}</h3><br/>
                <h3>DATUM : {this.state.data.datum}</h3> <h3>DUZINA : {this.state.data.duzina} minuta</h3><br/>
                <h3>KATEGORIJA : {(() => {
                                        switch (this.state.data.kat) {
                                        case 1:   return "PROGRAMIRANJE";
                                        case 2: return "OBRAZOVANJE";
                                        default:      return "#FFFFFF";
                                        }
                                    })()}</h3>
               <center><h3>OPIS : </h3></center> 
                <p>{this.state.data.opis}</p>
                <button className='btn btn-primary'>PRIJAVI DEBATU</button>
            </div>
        )

    }

}

export default Debata;
