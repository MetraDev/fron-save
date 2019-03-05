import React, {Component} from 'react';
import '../master.css';
import axios from "axios";
import {URL} from '../index'
import { token} from '../index'
import AppRouter from "./AppRouter";
import {addCities, addUser, chanegUrl, deleteCity, modCity, modTar, movNom} from "../actions/actions";
import {connect} from "react-redux";
import Login from "./Login";




class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            strategy: "local",
            state:false,
            estado:true
        }

    }





    regDatos = (e) => {

        e.preventDefault()


    }


    change=()=> {

        axios.post(`${URL}/auth-users/`,this.state)
                .then(res => {
                    console.log('en axios' ,res)
                    this.setState({state:true, estado:true})


                })
                .catch(err => console.log('No ha funcionado salud', err),
                    localStorage.setItem('get', false), this.setState({estado:false}))

    }


    introDatos = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }




    render() {
        if(this.state.state === true){
            console.log('estamos dentro')
            return(<Login/>)
        }else
            return(


                <div lang="en" dir="ltr">
                    <title className={'h1'}>From Login | Metra </title>
                    <link rel="stylesheet" href="../master.css"/>
                    <body>
                    <div className="login-box">
                        <h1 className={'h1'}>Register</h1>
                        <form onSubmit={this.regDatos} >
                            <label className={"label"} htmlFor="username">Username</label>
                            <input type="text" placeholder="Enter Username" name={ "email"} value={this.state.email} onChange={this.introDatos}/>
                            <label className={"label"} htmlFor="password" >Password</label>
                            <input type="password" placeholder="Enter Password" name={"password"} value={this.state.password} onChange={this.introDatos}/>
                            <input type="submit"  onClick={()=> this.change() } value="Submit"/>
                            <a href="" >Change your url</a>
                            <br/>        <a href="#">Don´t have an account?</a>
                        </form>
                        {this.state.estado ? '': <p className={'text-danger'}>Try again</p>}
                    </div>
                    </body>
                </div>


            )
    }
}
const dispastchToProps=(dispatch)=>{
    return{
        changeUrl:(url)=> dispatch (chanegUrl(url)),


    }
}
export default connect(null, dispastchToProps)(Register);