import React, {Component} from 'react';
import '../../file.css'
import FormUs from "./formUs";
import {connect} from 'react-redux';
import {addCity, deleteUser, editUser, modIdea, modTar} from "../../actions/actions";
import {token} from "../..";
import {Link} from 'react-router-dom'
import axios from "axios";
import {URL} from '../..'


class Fila extends Component {
    constructor(props) {
        super(props);


        this.state = {
            variable: []
        }


    }


    deleteC = (id,team) => {
        var config = {
            headers: {'Authorization': localStorage.getItem('accesToken')}
        };
        axios.delete(`${URL}/user/${id}`, config)
            .then(res => {

                this.props.deleteUserS(id)
            }
            )
            .catch(err => console.log('No ha funcionado delete', err));


        let teams =this.props.team && this.props.team.find(item => item && item.name === team)
        console.log('filaaaa133', teams)
        let result = teams && teams.users.filter(item => item && item._id !== id)
        console.log('filaaaa11', result)

        if (teams) {
            teams.users = result

            axios.put(`${URL}/team/${teams._id}`, teams, config)
                .then(res =>{
                    console.log('filaaaa2', teams.users)
                    this.props.addTeami(teams, teams._id)
                })

                .catch(err => console.log('no lo has conseguido'  ,err))
        }

        let city = this.props.city.find(item => item && item.name === team)
        let cityRes = city && city.users.filter(item => item && item._id !== id)
        console.log('result', cityRes)

        if (city) {
            city.users = cityRes
            axios.put(`${URL}/city/${city._id}`, city, config)
                .then(res =>{
                    console.log('filacityaaa', city.users)
                    this.props.addCities(city, city._id)
                })

                .catch(err => console.log('no lo has conseguido city'  ,err))
        }

        let teamsCity = this.props.team.find(item=> item && item.cityId &&  item.cityId.name === team )
        if(teamsCity && teamsCity.cityId) {

            teamsCity.cityId.users  =  cityRes
            axios.put(`${URL}/team/${teamsCity._id}`, teamsCity, config)
                .then(res =>{
                    console.log('filac9090980', teamsCity)
                    this.props.addTeami(teamsCity, teamsCity._id)
                })

                .catch(err => console.log('no lo has conseguido team final'  ,err))
        }

    }





    render() {
        const user = this.props.obj.map((user) => {

                return (
                    <tr>
                        <td colSpan={"1"}><Link to={'/user/:id'}
                                                onClick={() => this.props.editUser(user._id)}>{user.name + ' ' + user.surname}</Link></td>
                        <td colSpan={"1"}>{user.email}</td>
                        <td colSpan={"1"}>{user.roleId}</td>
                        <td colSpan={"1"}>{user.telephone }</td>
                        <td width="1" height="50" >
                        <button  onClick={() => this.deleteC(user._id,user.telephone)} className="col-sm-5 text-center btn btn-dark">
                            <h5 className={'text-center'}>X</h5>
                        </button></td>
                    </tr>

                )
            }
        )


        return (


            <div>
                {console.log(this.props.obj)}
                <table className={"table table-hover table-dark mt-3"}>
                    <thead className={"thead-dark  table-hover text-left"}>
                    <tr className={"stc"}>
                        <td className={"ml-4"}><h4>Users</h4></td>
                        <td colSpan={"4"} className={""}></td>
                    </tr>
                    <tr >
                        <th width="250" height="39"> Name && Surname</th>
                        <th width="250" height="39"> Email</th>
                        <th width="250" height="39"> Role</th>
                        <th width="250" height="39"> Headquarter</th>
                    </tr>
                    {user}
                    </thead>
                </table>
                <FormUs/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        obj: state.user,
        team: state.team,
        city: state.city

    }
}
const dispastchToProps = (dispatch, props) => {
    return {
        editUser: (id) => dispatch(editUser(id)),
        deleteUserS: (id) => dispatch(deleteUser(id)),
        modIdeas:(stado,id)=>dispatch(modIdea(stado,id)),
        addTeami:(stado,id)=> dispatch (modTar(stado,id)),
        addCities:(stado,id)=>dispatch(addCity(stado,id)),
    }
}

export default connect(mapStateToProps, dispastchToProps)(Fila);
