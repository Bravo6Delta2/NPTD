import React from 'react';
import './css/Profil.css'
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";
class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state={msg:'',ss:'dd',name:'',duration:0,category:1,description:'',date:0,page:1,pages:0,data:[],value:1}
    }
    textChanged = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
        
        axios.post('http://localhost:3001/create',data).then(
            (res)=>{
                <Redirect to={{ pathname: '/profil' }} />
            },
            (err)=>{
                <Redirect to={{ pathname: '/login' }} />
            }
        )
    }

    render() {
        return (
            <>
                <div id='div11' class='d-flex pading flex-column'>
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
                    <button id='dugme1'  onClick={this.create}>KREIRAJ DEBATU</button>
                </div>
               
                    
            </>
        )
    }
}
export default Create;