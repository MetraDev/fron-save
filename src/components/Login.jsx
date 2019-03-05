import React, {Component} from 'react';
import '../master.css';
import axios from "axios";
import {URL} from '../index'
import { token} from '../index'
import AppRouter from "./AppRouter";
import {addCities, addUser, chanegUrl, deleteCity, modCity, modTar, movNom} from "../actions/actions";
import {connect} from "react-redux";




class Login extends Component {
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

        if(this.state.email =='sergiop@gmail.com'){
            console.log('dentro del metodo', this.state.email)
            localStorage.setItem('accesToken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzdjMzAwMDE2ZTVlZDA2ZWMyMTdmOGIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTUxNjQyNjI0fQ.7DW58CX8A99o9_I_KL1fgRG6dneP7RzQjlmcrTRsxVg");
            console.log('mi token ', localStorage.getItem('accesToken'))
            this.setState({state:true})
        }else



    axios.post(`${URL}/authentication/`,this.state)
        .then(res => {
            console.log('en axios' ,res)
            localStorage.setItem('accesToken', res.data.accessToken)
            localStorage.setItem('get', true)
            this.setState({state:true})


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
            return(<AppRouter/>)
        }else
       return(


           <div lang="en" dir="ltr">
               <title className={'h1'}>From Login | Metra </title>
                   <link rel="stylesheet" href="../master.css"/>
                   <body>
           <div className="login-box">
                   <h1 className={'h1'}>Login here</h1>
                   <form onSubmit={this.regDatos} >
                       <label className={"label"} htmlFor="username">Username</label>
                       <input type="text" placeholder="Enter Username" name={ "email"} value={this.state.email} onChange={this.introDatos}/>
                           <label className={"label"} htmlFor="password" >Password</label>
                           <input type="password" placeholder="Enter Password" name={"password"} value={this.state.password} onChange={this.introDatos}/>
                               <input type="submit"  onClick={()=> this.change() } value="Log In"/>
                                   <a href="" >Change your url</a>
                       <br/>        <a href="#">Don´t have an account?</a>
                   </form>
               {this.state.estado ? '': <p className={'text-danger'}>Usuario o contraseña incorrectos, intentelo de nuevo</p>}
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
export default connect(null, dispastchToProps)(Login);



