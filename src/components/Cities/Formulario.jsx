import React, {Component} from 'react';
import '../../forms.css';
import {connect} from "react-redux";
import {addCities, addUser, editUser, formCity} from "../../actions/actions";
import axios from "axios";
import {token} from '../../index'
import validator from 'validator';
import {URL} from '../../index'


class Formulario extends Component {
    constructor(props) {
        super(props);
        this.count =0;
        this.state = {

            name:'',
            address: '',
            telephone: '',
            users:[],
            nom1:[],
            nom2:''
        };




    }

    regDatos = (e) => {
        e.preventDefault()

        if(this.state.users === []){
           alert('añade 2 usuarios')
        }

        this.setState({
            name:'',
            address: '',
            telephone: '',
            users:[],
            nom1:[],
            nom2:''
        });


    }

    introDatos = (event) =>
    {
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




    añadirUser = (nom) =>{
        this.state.nom2 = JSON.parse(nom)


        if (this.state.users.some(item => this.state.nom2.name === item.name || this.state.nom2.roleId === item.roleId ))
              {alert('ya hay un role ')
                } else {

                    this.setState({users:[...this.state.users ,this.state.nom2]})

            }}



    remove = name => {
        this.setState({users:this.state.users.filter(item => item.name !== name)});
    };



    createCity = (state) => {


        var config = {
            headers: {'Authorization':  localStorage.getItem('accesToken')}
        };

        if (state.users=== null){

           alert('pollitos')
        }else


        var n1 = this.state.users && this.state.users[0]
        var n2 = this.state.users && this.state.users[1]


       if(n1){
            n1.telephone =this.state.name
        axios.put(`${URL}/user/${n1._id}`, n1, config)
            .then(res => {

                this.props.addUsers(n1,n1._id)



            })
            .catch(err => console.log('no ha  funcionado',err) );}

        if(n2){
            n2.telephone =this.state.name
            axios.put(`${URL}/user/${n2._id}`, n2, config)
                .then(res => {

                    if(n2){


                        this.props.addUsers(n2,n2._id)}

                })
                .catch(err => this.setState({err:true}) );}






        axios.post(`${URL}/city`, state, config)
            .then(res => {

                this.props.addCities(res.data)

            })
            .catch(err => console.log('no ha  funcionado',err) );


    }

    render() {

        const names = this.props.city.map (city => city )
        const users =  this.props.user.map (user => user)
        const res = users.filter(user => {
            let temp =  names.some(name => user.telephone === name.name)
            if(!temp)
                return user
        })
        console.log('hola teams',names)
        console.log('hola teams',res)


        return (

            <div className={"mb-3"}>
                <nav className={"navbar navbar-dark mt-5"}>
                    <h2 className={"text-white"}>Add city</h2>
                </nav>
                <form className={"card-header"} onSubmit={this.regDatos}>
                    <div className={"divder"}>
                        <div>
                            <h3 className={"col text-left text-light mt-2"}> Location</h3>
                            <div className={"row form-group"}>
                            </div>
                            <div className={"form-group row"}>
                                <h5 className={"col-sm-2 text-left text-light ml-3"}>City</h5>
                                <select  required                                       //CIUDAD
                                    name="name"
                                    className="col-sm-3 form-control "
                                    value={this.state.name}
                                    onChange={this.introDatos}>
                                    <option>Madrid</option>
                                    <option>Valencia</option>
                                    <option>Barcelona</option>
                                    <option>Londres</option>
                                    <option>Bilbao</option>
                                    <option>Milan</option>
                                    <option>Moscu</option>
                                    <option>Minsk</option>
                                    <option>Oporto</option>
                                </select>
                            </div>
                            <div className="form-group text-left">
                                <h3 className={"col-sm-2 text-left text-light"}>Address</h3>
                                <input
                                    className={"stilo ml-3 col-sm-5"}//DIRECCION
                                    type="text"
                                    name={"address"}
                                    value={this.state.address}
                                    placeholder={"Full Adress"}
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
                                    placeholder="Phone" required={true}/>
                            </div>
                        </div>
                        <div className={"divleft"}>
                            <h3 className={"col text-left text-light mt-2"}> Demium team</h3>
                            <div className={"row form-group"}>
                            </div>
                            <div className={"form-group row"}>
                                <h5 className={"col-sm-2 text-left text-light ml-3"}>Team</h5>
                                <select className={'select form-control col-sm-5'} id={'select'}
                                        name={'nom2'}
                                        onChange={this.introDatos} >
                                    <option selected={'true' } value={''} disabled>Selecciona un usuario</option>
                                    {res.map((usr) => {
                                    return (
                                    <option name={'nom2'} value={JSON.stringify(usr)}>{usr.name}{':'} {usr.roleId}</option>)})}
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
                                {this.state.users.map(added =>{return(
                                    <div>
                                        {added.name}
                                        <span className={'text-danger'} onClick={() => this.remove(added.name)}> {' '}x</span>

                                    </div>)})}
                            </div>
                        </div>,
                    </div>
                    <div className={"text-right col-dm-2"}>
                        <button onSubmit={this.regDatos} type="submit"  onClick={()=>{this.createCity(this.state)
                        }}className="col-sm-2 ml-4 btn btn-primary">
                            <h5>Create</h5>
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}

const mapStateToProps = (state ,props) => {
    return {
        user: state.user.filter(item =>{if (item.roleId === "TM" ||item.roleId === "DP" ) return item}),
        objs: state.movNom,
        role: state.role,
        city: state.city,
    }

}

const dispastchToProps=(dispatch,props )=>{
    return{
        addCities:(stado)=>dispatch(formCity(stado)),
        addUsers:(stado,id)=>dispatch(addUser(stado,id)),


    }
}

export default connect(mapStateToProps,dispastchToProps)(Formulario);