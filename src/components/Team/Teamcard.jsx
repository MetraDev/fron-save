import React, {Component} from 'react';
import '../../taridea.css';
import {addTeam, addUser, deleteUser, delTeam, modIdea, modTeam, showTeam} from "../../actions/actions";
import {connect} from "react-redux";
import {token} from "../../index";
import axios from "axios";
import  {Link} from 'react-router-dom'
import Cityid from "../Cities/Cityid";
import {URL} from '../../index'



class Teamcard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variable:[],
            name:'',
            cityId:'',
            user:''
        }
    }



    /* componentWillMount() {
         console.log('this.props.team' , this.props.team)
         console.log('this.props.team' , this.props.user)

         const teams = this.props.team;
         const users = this.props.user;

         const citiesWithUsers = teams.map(teams => {
             teams.users = teams.users.map(user => users.find(el => user.userId  === el._id ) );
             return teams
         })
         console.log('cities index'+citiesWithUsers)
         this.props.addteams(citiesWithUsers)




     }*/


    deleteC = (id,team) => {

        var config = {

            headers: {'Authorization': localStorage.getItem('accesToken')}
        };
        axios.delete(`${URL}/team/${id}`, config)
            .then(res => {
                this.props.delTeams(id)

                team && team.users.map(item=>{
                    item.telephone = 'No tiene team'
                    return axios.put(`${URL}/user/${item._id}`, item, config)
                        .then(res =>{
                            this.props.addUsers(item,  item._id)
                        }).catch(err =>{console.log('error en team ' , err)})

                })

              let idea = this.props.idea.find(item => item && item.name === team.name)
                console.log(' team por idea ' , idea)
                if(idea){
                    delete idea.teamId

                    axios.put(`${URL}/idea/${idea._id}`, idea, config)
                        .then(res =>{
                            this.props.modIdeas(idea,  idea._id)
                        }).catch(err =>{console.log('error en team ' , err)})


                }




            })
            .catch(err => console.log('No ha funcionado delete', err));
    }
    autoDelete=(user,id, team)=>{
        var config = {

            headers: {'Authorization': localStorage.getItem('accesToken')}
        };
        console.log('user',user)
        if(user.length < 0 || user[0] == null ){
            alert(`el equipo ${team.name} fue eliminado por falta de usuarios`)

            this.deleteC(id,team)

           /* console.log('user',user)
            axios.delete(`http://52.213.25.226:3030/team/${id}`, config)
                .then(res => this.props.delTeams(id))
                .catch(err => console.log(err))*/
        }

    }



    render() {
       /* const teams = this.props.team;
        const city = this.props.city;
        const resultado =  teams.map(team => {
            team.cityId= city.find(el =>team.cityId && team.cityId === el._id )
            return team
        })*/

        const team = this.props.team.map((team) => {
            return (
                <div className={" col-md-4 mb-3"}>
                    {this.autoDelete(team.users,team._id,team )}
                    <div className={"carder card  mt-4"}>
                        <div className={""}>
                            <div className={" card-header bg-primary text-left"}>
                                <h5 className={"text-danger"}>{team.name}</h5>
                            </div>
                        </div>
                        <div className={"card-Body"}>
                            <div className={" form-group row"}>
                                <h6 className={"typeee text-left mt-3 ml-4"}>Idea</h6>
                                <h6 className={" text-left mt-3 ml-3"}>{team.name || ''}</h6>
                            </div>
                            <div className={"form-group row"}>
                                <h6 className={"typeeeb name text-left ml-4"}>City</h6>
                                <h6 className={" text-left ml-3"}>{team.cityId && team.cityId.name || team.cityId }</h6>

                            </div>
                            <h5 className={"typeeeb text-left ml-2"}>Team members</h5>
                            <p > {team.users.map(usuario =>{return(
                                <p className={"text-left ml-3 "}>
                                    {usuario && usuario.name} {usuario && usuario.roleId}
                                </p>)})}</p>
                            <div className={"form-group"}>
                                <h5 className={"typeeeb text-left ml-2"}>Demium team</h5>
                                <p > {team.cityId && team.cityId.users && team.cityId.users.map(usuario =>{return(
                                    <p className={"text-left ml-3 "}>
                                        { usuario && usuario.name} { usuario && usuario.roleId}
                                    </p>)})}</p>
                            </div>
                            <div className={'form-group text-right'}>

                                <Link  to={'/teamedit'}><button className={'text-right bg bg-primary'} onClick={()=> this.props.showTeamm(team)}> Edit</button></Link>

                               <button className={'ml-2 text-right bg bg-danger'} onClick={()=> this.deleteC(team._id,team)}> Delete</button>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className={"container"}>
                <div className={"row mt-4"}>
                    {team}
                </div>
                <div className={'text-right'}>
                    <Link to={'/formteam'}> <h1>Add</h1>
                    </Link>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        team: state.team,
        user: state.user,
        city: state.city,
        idea: state.viewAdd
    }
}

const dispastchToProps=(dispatch,props )=>{
    return{

        showTeamm:(data) =>dispatch(showTeam(data)),
        delTeams:(id) =>dispatch(delTeam(id)),
        addteams:(stado) =>dispatch(addTeam(stado)),
        addUsers:(stado,id)=>dispatch(addUser(stado,id)),
        modIdeas:(stado,id)=>dispatch(modIdea(stado,id)),



    }
}
export default connect(mapStateToProps,dispastchToProps)(Teamcard);