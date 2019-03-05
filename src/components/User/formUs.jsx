import React, {Component} from 'react';
import {connect} from "react-redux";
import { tareaSi } from '../../actions/actions';
import axios from "axios";
import {token} from "../..";
import {URL} from '../../index'


class FormUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            surname: '',
            email: '',
            telephone: '',
            roleId:'None',
            nom1:[],
        };
    }

    regDatos = (e) => {
        e.preventDefault();
        this.setState( {

            name: '',
            surname: '',
            email: '',
            telephone: '',
            roleId:'None',
            nom1:[],
        })

    }

    introDatos = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }

    introDatosNumber = (event) =>
    {
        if (event.target.value.match (/^([0-9]{1,3})*$/)){
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    createUser = (state) => {


        console.log('create', state)

        var config = {
            headers: {'Authorization':  localStorage.getItem('accesToken')}
        };


            axios.post(`${URL}/user`, state, config)
                .then(res => {
                    console.log('' , state)

                    this.props.tareaSino(res.data)
                })
                .catch(err => console.log('No ha funcionado', err));

    }


    render() {
        return (
            <div className={""}>
                <nav className={"navbar navbar-dark mt-3"}>
                    <h2 className={"text-white"}>Add user</h2>
                </nav>
                <form className={"card-header bg-dark"} onSubmit={this.regDatos}>
                    <div className={"divder"}>
                        <div>
                            <div className="form-group text-left">
                                <h4 className={"col-sm-2 text-left text-light"}>Name</h4>
                                <input
                                    className={"stilo ml-3 col-sm-5"}//DIRECCION
                                    type="text"
                                    name={"name"}
                                    value={this.state.name}
                                    placeholder={"name"}
                                    onChange={this.introDatos}
                                       required />
                            </div>
                            <div className="form-group text-left">
                                <h4 className={"col-sm-2 text-left text-light"}>Surname</h4>
                                <input
                                    className={"ml-3 col-sm-5"}//DIRECCION
                                    type="text"
                                    name={"surname"}
                                    value={this.state.surname}
                                    placeholder={"surname"}
                                    onChange={this.introDatos}
                                       required />
                            </div>
                            <div className={"row form-group text-left"}>
                                <h4 className={"col-sm-1 text-light mt-2 ml-3"}>Email:</h4>
                                <input                                             //TELEFONO
                                    type="email"
                                    className="texl-left col-sm-3 ml-5"
                                    value={this.state.email}
                                    name="email"
                                    onChange={this.introDatos}
                                    placeholder="email"
                                    required />
                            </div>
                            <div className={"row form-group text-left"}>
                                <h4 className={"col-sm-1 text-light mt-2 ml-3"}>Phone:</h4>
                                <input
                                     //TELEFONO
                                    type="telephone"
                                    className="texl-left col-sm-3 ml-5"
                                    value={this.state.telephone}
                                    name="telephone"
                                    onChange={this.introDatosNumber}
                                    placeholder="Phone"
                                    required />
                            </div>
                        </div>
                        <div className={"divleft"}>

                            <h4 className={"col text-left text-light mt-2"}>Role</h4>
                            <div className="form-group row">
                                <h6 className={"col-sm-2 text-left text-light mt-3 ml-3"}>Type </h6>
                                <select                                         //PAIS
                                    name="roleId"
                                    className="col-sm-3 mt-2 form-control  "
                                    value={this.state.roleId}
                                    onChange={this.introDatos}
                                    required>
                                    <option>Selecciona un role</option>
                                    {this.props.role.map((usr) => {
                                        return (
                                            <option   >{usr.name}</option>)})}

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"text-right col-dm-2"}>
                        <button type="submit" onClick={()=>
                            this.createUser(this.state)}  className="col-sm-2 ml-4 btn btn-primary">
                            <h5 className={'text-light'}>Create</h5>
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
        role: state.role
    }

}


const dispastchToProps=(dispatch,props )=>{
    return{
        tareaSino:(stado)=>dispatch(tareaSi(stado)),

    }
}


export default connect( mapStateToProps,dispastchToProps)(FormUs);