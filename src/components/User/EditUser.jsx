import React, {Component} from 'react';
import {connect} from "react-redux";
import {  addUser} from '../../actions/actions';
import  {BrowserRouter, Switch, Route, Redirect,Link, NavLink} from 'react-router-dom'
import axios from "axios";
import {token} from "../..";
import {URL} from '../..'


class EditUser extends Component {
    constructor(props) {
        super(props);
        this.save=[]
        this.state = {

            name: '',
            surname: '',
            roleId:'none',
            email: '',
            telephone: '',
            nom1:[],
        };
    }

    regDatos = (e) => {
        e.preventDefault();

    }
    introDatosNumber = (event) =>
    {
        if (event.target.value.match (/^([0-9]{1,3})*$/)){
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    introDatos = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {



        console.log('puffff', this.props.id[0])
        let obj = this.props.user.filter(user=> user._id === this.props.id[0])
        console.log('puffff', obj[0])
        this.setState(obj[0])

        }



    createUser = (state) => {


        console.log('create', state)

        var config = {
            headers: {'Authorization':  localStorage.getItem('accesToken')}
        };


        axios.put(`${URL}/user/${this.props.id[0]}`, state, config)
            .then(res => {
                console.log('' , res)
                this.props.addUsers(res.data,this.props.id[0])
            })
            .catch(err => console.log('No ha funcionado', err));

    }





    render() {

        return (
            <div className={""}>
                <nav className={"navbar navbar-dark mt-3"}>
                    {console.log('holaaaaaa',this.state.name)}
                    <h2 className={"text-white"}>Add user</h2>
                </nav>
                <form className={"card-header bg-dark"} onSubmit={this.regDatos}>
                    <div className={"divder"}>
                        <div>
                            <div className="form-group text-left">
                                <h4 className={"col-sm-2 text-left text-light"}>Namegit</h4>
                                <input required
                                    className={"stilo ml-3 col-sm-5"}//DIRECCION
                                    type="text"
                                    name={"name"}
                                    value={this.state.name}
                                    placeholder={this.state.name}
                                    onChange={this.introDatos}/>
                            </div>
                            <div className="form-group text-left">
                                <h4 className={"col-sm-2 text-left text-light"}>Surname</h4>
                                <input required
                                    className={"ml-3 col-sm-5"}//DIRECCION
                                    type="text"
                                    name={"surname"}
                                    value={this.state.surname}
                                    placeholder={this.state.surname}
                                    onChange={this.introDatos}/>
                            </div>
                            <div className={"row form-group text-left"}>
                                <h4 className={"col-sm-1 text-light mt-2 ml-3"}>Email:</h4>
                                <input required                                       //TELEFONO
                                    type="email"
                                    className="texl-left col-sm-3 ml-5"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.introDatos}
                                    placeholder={this.state.email}/>
                            </div>
                            <div className={"row form-group text-left"}>
                                <h4 className={"col-sm-1 text-light mt-2 ml-3"}>Contact:</h4>
                                <input required                                     //TELEFONO
                                    type="telephone"
                                    className="texl-left col-sm-3 ml-5"
                                    value={this.state.telephone}
                                    name="telephone"
                                    onChange={this.introDatosNumber}
                                    placeholder={this.state.telephone}
                                     disabled/>
                            </div>
                        </div>
                        <div className={"divleft"}>
                            <h4 className={"col text-left text-light mt-2"}>Role</h4>
                            <div className="form-group row">
                                <h6 className={"col-sm-2 text-left text-light mt-3 ml-3"}>Type </h6>

                                <select   required                                      //PAIS
                                    name="roleId"
                                    className="col-sm-3 mt-2 form-control  "
                                    value={this.state.roleId}
                                    onChange={this.introDatos}>
                                    <option>Selecciona un role</option>
                                    {this.props.role.map((usr) => {

                                        return (
                                            <option name="nom2" >{usr.name}</option>)})}

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"text-right col-dm-2"}>
                        <button type="submit" onClick={()=>
                            this.createUser(this.state)}  className="col-sm-2 ml-4  btn ">
                            <Link  to={'/user'} >Save Changes</Link>
                        </button>
                        <button type="submit"   className="col-sm-2 ml-4 text-light btn ">
                            <Link to={'/user'}>Go Back</Link>
                        </button>
                    </div>
                </form>
                {console.log('ojooo' +this.state.name)}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        id: state.editUser,
        user:state.user,
        role: state.role
    }

}
const dispastchToProps=(dispatch,props )=>{
    return{
        addUsers:(stado,id)=>dispatch(addUser(stado,id)),


    }
}


export default connect( mapStateToProps,dispastchToProps)(EditUser);