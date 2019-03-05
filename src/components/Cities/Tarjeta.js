import React, {Component} from 'react';
import Formulario from './Formulario'
import '../../taridea.css';
import {connect} from "react-redux";
import axios from "axios";
import {business, cities, role, token, tokens} from '../../index'
import {Link} from 'react-router-dom'
import {deleteCity, modCity, addCities, movNom, modTar, addUser} from "../../actions/actions";
import {getCities} from '../../index'
import {URL} from '../../index'



class Tarjeta extends Component {
    constructor(props, envios, respu) {
        super(props);

        this.envios = 0;
        this.state = {
            variable: [],
            datos: [],
            err:false
        }



    }



    deleteC = (id,city) => {

        var config = {

            headers: {'Authorization': localStorage.getItem('accesToken')}
        };
        axios.delete(`${URL}/city/${id}`, config)
            .then(res => {
                this.props.deleteCityy(id)


             city && city.users.map(item=>{
                    item.telephone = 'No tiene ciudad'
                    return axios.put(`${URL}/user/${item._id}`, item, config)
                        .then( res => {
                            this.props.addUsers(item,  item._id)
                        }).catch(err => console.log('error de city',err))
                })

                /*console.log('la promseeeeee' ,promises)
                Promise.all(promises).then(values => {

                    let res = values.map ((item,index) => item && item.data)
                    console.log('dataas promises' ,res,res._id )
                    res.map(item =>{  return this.props.addUsers(item,  item._id)})
                    // [3, 1337, "foo"]
                });*/




               let team = this.props.team.filter(item => item && item.cityId && item.cityId._id === id)

                let teams= team[0]

                if(teams){
                    teams.cityId=''
                    console.log('filacityaaa', teams.cityId )
                    console.log('filacityaaa', teams )
                    this.props.addTeami(teams,teams._id)
                }

            })
            .catch(err => this.setState({err:false})
            );
    }

    change=()=>{
        this.setState({err:false})
    }

    


    /*encontrarUs = (id, dos) => { // id del usuario, id de la tarjeta
        var config = {
            headers: {'Authorization': token}
        }

        if (id[1] === undefined) {

            console.log('ouqhsaudhe', id)
        } else

            axios.get(`http://52.213.25.226:3030/user/${id[1].id}`, config) // DESCARGAMOS DATOS DEL USUARIO
                .then(res => {
                        // si los el ide del usuario coincide con el de la ciudad/user
                        for (let index in this.props.city) {
                            if (this.props.city[index]._id === dos) {           // si el id de la tarjeta(obj) es igual que el segundo parametro
                                this.props.modCityy(dos, res.data.name, 1)
                                //modificamos el cityuser por el nombre de user
                            }
                        }
                    }
                )
                .catch(err => console.log('No ha funcionado traer', err));


        if (id[0] === undefined) {

            console.log('ouqhsaudhe')
        } else

            axios.get(`http://52.213.25.226:3030/user/${id[0].id}`, config) // DESCARGAMOS DATOS DEL USUARIO
                .then(res => {
                        // si los el ide del usuario coincide con el de la ciudad/user
                        for (let index in this.props.city) {
                            if (this.props.city[index]._id === dos) {           // si el id de la tarjeta(obj) es igual que el segundo parametro
                                this.props.modCityy(dos, res.data.name, 0)
                                //modificamos el cityuser por el nombre de user

                            }
                        }
                    }
                )
                .catch(err => console.log('No ha funcionado traer', err));
    }*/


    render() {
        if (this.state.err === true){

            return(<a onClick={()=>this.change()}><h1 className={'bg-danger text-dark'}>

                ERROR DE CARGA , VUELVA A INTENTARLO MAS TARDE


            </h1></a>)
        }else

        this.envios++
        const todo = this.props.city.map((todo) => {
            return (

                <div className={"col-md-4"}>
                    <div className={"carder card mt-4"}>

                        <div className={"bg-dark"}>
                            <div className={"card-header text-left"}>
                                <h5 className={"text-white"}>{todo && todo.name}</h5>
                            </div>
                        </div>
                        <div className={"card-Body"}>
                            <h5 className={"text-left text-primary ml-3 mt-2"}>{'Address'}</h5>
                            <p className={"text-left ml-3"}>{todo.address}</p>
                            <p className={"text-left ml-3"}></p>
                            <p className={"text-left ml-3"}>{'Phone: ' + todo.telephone}</p>
                            <h6 className={"text-left ml-3 text-primary"}>Demium Team</h6>
                            <p > {todo.users && todo.users.map(usuario =>{return(
                                <p className={"text-left ml-3 "}>
                                    {usuario && usuario.name} {usuario && usuario.roleId}
                                </p>)})}</p>
                            <p className={"text-right mr-3"}>
                                <button className={"text-rigth badge badge-primary mr-10"}
                                        onClick={() => {this.deleteC(todo._id,todo)}}>
                                    <h6 className={"text-light"}>{'DEL'}</h6>
                                </button >
                                <button className={"text-rigth badge badge-danger mr-10"}
                                        onClick={() => this.props.movNoms(todo)}>
                                    <Link to={`/city/${todo._id}`}><h6 className={"text-light"}>{'EDIT'}</h6></Link>
                                </button>
                            </p>

                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className={"container"}>
                <div className={"row mt-4"}>
                    {todo}
                </div>
                <div className={"mb-6"}>
                    <Formulario insertAll={this.insertarForm}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.city,
        user: state.user,
        team: state.team,
    }

}

const dispastchToProps = (dispatch, props) => {
    return {
        deleteCityy: (id) => dispatch(deleteCity(id)), // la primera son los props con los que se le llama y la segunda el metodo d Actions
        modCityy: (id, nom, indx) => {
            dispatch(modCity(id, nom, indx))
        },
        addCities: (cities) => dispatch(addCities(cities)),
        movNoms: (estado) => dispatch(movNom(estado)),
        addTeami:(stado,id)=> dispatch (modTar(stado,id)),
        addUsers:(stado,id)=>dispatch(addUser(stado,id)),
    }
}
export default connect(mapStateToProps, dispastchToProps)(Tarjeta);