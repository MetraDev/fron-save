import React, {Component} from 'react';
import '../../forms.css';
import {connect} from "react-redux";
import {addCity, addUser, modTar} from "../../actions/actions";
import axios from "axios";
import {token} from '../../index'
import {Link} from 'react-router-dom'
import {URL} from '../../index'



class Cityid extends Component {
    constructor(props) {
        super(props);
        this.count =0;
        this.state = {
            name: '',
            address: '',
            telephone: '',
            users:[],

        };





    }


    añadirUser = (nom) =>{
        this.state.nom2 = JSON.parse(nom)

            console.log('')
        if (this.state.users.some(item => this.state.nom2.name === item.name || this.state.nom2.roleId === item.roleId))
        {alert('ya hay un role ')
        } else {

            this.setState({users:[...this.state.users ,this.state.nom2]})

        }}



    remove = name => {
        var config = {
            headers: {'Authorization':  localStorage.getItem('accesToken')}
        };
        let newUsers = this.state.users.filter(item =>item && item.name !== name.name)
        this.setState({users:newUsers});
        console.log('telephone',name.telephone, name )
        name.telephone = 'No City'
        axios.put(`${URL}/user/${name._id}`, name, config)
            .then(res => {

                    this.props.addUsers(res.data, res.data._id)
                }

            )
        let team = this.props.team.find(item => item && item.cityId && item.cityId.name === this.state.name)
        console.log('el removeee',newUsers, team)
        if(team){
            team.cityId.users = newUsers
            this.props.addTeami(team, team._id)
        }

    };


    componentDidMount() {
        var config = {
            headers: {'Authorization':  localStorage.getItem('accesToken')}
        };

        console.log('puffff', this.props.obj)
        let obj = this.props.city.filter(city=> city._id === this.props.obj[0]._id)
        console.log('puffff', obj[0])
        this.setState(obj[0])
        }







    regDatos = (e) => {
        e.preventDefault()

        if(this.state.users == ''){
            alert('añade 2 usuarios')
        }


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





    createCity = (state) => {

        var config = {
            headers: {'Authorization':  localStorage.getItem('accesToken')}
        };
        console.log('el estado',this.props.obj)

        var n1 = this.state.users && this.state.users[0]
        var n2 = this.state.users && this.state.users[1]

        if(n1){
            n1.telephone =this.state.name
            axios.put(`${URL}/user/${n1._id}`, n1, config)
                .then(res => {

                    this.props.addUsers(n1,n1._id)

                    if(n2){
                        n2.telephone =this.state.name
                        axios.put(`${URL}/user/${n2._id}`, n2, config)
                            .then(res => {

                                if(n2){


                                    this.props.addUsers(n2,n2._id)}

                            })
                            .catch(err => this.setState({err:true}) );}

                })
                .catch(err => this.setState({err:true}) );}


        let team = this.props.team.find(item => item && item.cityId && item.cityId.name === this.state.name)
        console.log('el removeee',this.state.users, team)
        if(team){
            team.cityId.users = this.state.users
            this.props.addTeami(team, team._id)
        }

        axios.put(`${URL}/city/${this.props.obj[0]._id}`, state, config)
                .then(res => {

                    console.log('el estado', res.data)
                    this.props.addCities(res.data,this.props.obj[0]._id)


                })
                .catch(err => console.log('No ha funcionado', err));

    }

    render() {

        const names = this.props.city.map (city => city )
        const users =  this.props.user.map (user => user)
        const res = users.filter(user => {
            let temp =  names.some(name => user.telephone === name.name)
            if(!temp)
                return user
        })

            return (
            <div className={"mb-3"}>
                <nav className={"navbar navbar-dark mt-5"}>
                    <h2 className={"text-white"}>Add city</h2>
                    {console.log('el estado',this.props.obj)}
                </nav>
                <form className={"card-header"} onSubmit={this.regDatos}>
                    <div className={"divder"}>
                        <div>
                            <h3 className={"col text-left text-light mt-2"}> Location</h3>
                            <div className={"row form-group"}>
                            </div>
                            <div className={"form-group row"}>
                                <h5 className={"col-sm-2 text-left text-light ml-3"}>City</h5>
                                <select disabled required                                       //CIUDAD
                                         name="name"
                                         className="col-sm-3 form-control "
                                         value={this.state.name}
                                         onChange={this.introDatos}>
                                    <option>Madrid</option>
                                    <option>Valencia</option>
                                    <option>Barcelona</option>
                                    <option>Zaragoza</option>
                                    <option>Bilbao</option>
                                </select><h6 className={' ml-2 text-danger'}>change unavailable</h6>
                            </div>
                            <div className="form-group text-left">
                                <h3 className={"col-sm-2 text-left text-light"}>Address</h3>
                                <input
                                    className={"stilo ml-3 col-sm-5"}//DIRECCION
                                    type="text"
                                    name={"address"}
                                    value={this.state.address}
                                    placeholder={this.state.address}
                                    onChange={this.introDatos} required={true}/>
                            </div>
                            <div className={"row form-group text-left"}>
                                <h5 className={"col-sm-1 text-light mt-2 ml-3"}>Phone:</h5>
                                <input                                             //TELEFONO
                                    type="text"
                                    className="texl-left col-sm-3 ml-5"
                                    value={this.state.telephone}
                                    name="telephone"
                                    onChange={this.introDatosNumber}
                                    placeholder={this.state.telephone} required={true}/>
                            </div>
                        </div>
                        <div className={"divleft"}>
                            <h3 className={"col text-left text-light mt-2"}> Demium team</h3>
                            <div className={"row form-group"}>
                            </div>
                            <div className={"form-group row"}>
                                <h5 className={"col-sm-2 text-left text-light ml-3"}>Team</h5>
                                <select className={'select  form-control col-sm-5'} id={'select'}
                                        name={'nom2'}
                                        onChange={this.introDatos} >
                                    <option selected={'true' } value={''} disabled>Selecciona un usuario</option>
                                    {res.map((usr) => {
                                        return (
                                            <option name={'nom2'} value={JSON.stringify(usr)}>{usr.name}</option>)})}
                                </select>
                                <button className="col-sm-2 ml-4 btn btn-primary"
                                        onClick={(e)=>{e.preventDefault()
                                            this.añadirUser(this.state.nom2)}}>
                                    <h6>Add</h6>
                                    {console.log('nom2' +this.state.nom2)}
                                    {console.log('stado' +this.state.users)}
                                </button>
                            </div>
                            <div>
                                {this.state.users && this.state.users.map(added =>{return(
                                    <div>
                                        {added && added.name}
                                        <span className={'text-danger'} onClick={() => this.remove(added)}> {' '}x</span>

                                    </div>)})}
                            </div>
                        </div>
                    </div>
                    <div className={"text-right col-dm-2"}>
                        <button type="submit"  onClick={()=>{this.createCity(this.state)
                        }}className="col-sm-2 ml-4 btn">
                            <Link to={'/cities'}>Save</Link>
                        </button>
                    </div>
                </form>
            </div>
            )}
    }

const mapStateToProps = (state ,props) => {
    return {
        obj: state.movNom,
        user: state.user.filter(item =>{if (item.roleId === "TM" ||item.roleId === "DP" ) return item}),
        city: state.city,
        team: state.team
    }

}

const dispastchToProps=(dispatch,props )=>{
    return{
        addCities:(stado,id)=>dispatch(addCity(stado,id)),
        addUsers:(stado,id)=>dispatch(addUser(stado,id)),
        addTeami:(stado,id)=> dispatch (modTar(stado,id)),


    }
}

export default connect(mapStateToProps,dispastchToProps)(Cityid);