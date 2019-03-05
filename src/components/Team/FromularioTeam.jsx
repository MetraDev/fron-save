import React, {Component} from 'react';
import '../../team.css'
import {addUser, fromTeam, modIdea} from "../../actions/actions";
import {connect} from "react-redux";
import  {Link} from 'react-router-dom'
import {token} from '../../index'
import axios from "axios";
import {URL} from '../../index'

class FormTeam extends Component {
    constructor(props) {
        super(props);


        this.state={
            name:'',
            cityId:'',
            usersDemium:[],
            users:[],

        }

    }

    regDatos = (e) => {

        e.preventDefault();





    }
    añadirCity= (nom) =>{
        this.state.nom2 = JSON.parse(nom)
        this.setState({cityId:this.state.nom2, usersDemium :this.state.nom2.users})


    }

    añadirIdea= (nom) =>{
        this.state.nom3 = JSON.parse(nom)
        console.log('el porque de las ocasas' , this.state.nom3)

        let idea = this.state.nom3.name
        console.log('el porque de las ocasas' , idea)
        this.setState({
            ['name']: idea
        });
        console.log('el porque de las ocasas' , this.state.name)


    }

    añadirUser = (nom) =>{
        this.state.nom1 = JSON.parse(nom)


        if (this.state.users.some(item => this.state.nom1.name === item.name || this.state.nom1.roleId === item.roleId ))
        {alert('ya hay un role ')
        } else {

            this.setState({users:[...this.state.users ,this.state.nom1]})

        }}



    remove = name => {
        this.setState({users:this.state.users.filter(item => item.name !== name)});
    };

    introDatos = (event) =>
    {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }



    createTEAMS=(stado)=>{

        if(this.state.name === '' || this.state.users === [] || this.state.cityId === ''){
            return alert('debes rellenar los campos idea , ciudad y al menos un usuario para crear un team')
        }
        var config = {

            headers: {'Authorization':  localStorage.getItem('accesToken')}}

            //stado.cityId = stado.cityId._id
        console.log('el estado'+this.state.name)

        if (this.state.name === '' || this.state.users.length === 0 ){
            alert('Debes seleccionar un nombre y añadir un usuario')
        }
            console.log('this.state.users', this.state.users)
        const promises = this.state.users.map(item=>{
            item.telephone = this.state.name
            return axios.put(`${URL}/user/${item._id}`, item, config)


        })
        console.log('la promseeeeee' ,promises)
        Promise.all(promises).then(values => {
            console.log('vaya los valos ',values)
           let res = values.map ((item,index) => item && item.data)
            console.log('dataas promises' ,res,res._id )
            res.map(item =>{  return this.props.addUsers(item,  item._id)})
            // [3, 1337, "foo"]
        });


        axios.post(`${URL}/team`, this.state, config) // DESCARGAMOS DATOS DEL USUARIO
            .then(res => {
                    // si los el ide del usuario coincide con el de la ciudad/user
                const idea = res.data
                        res.data.cityId = this.state.cityId

                    this.props.fromTeams(res.data)
                this.setState({nom3: {...this.state.nom3, teamId:res.data._id }})

                stado.nom3.teamId =res.data
                console.log(' stado.name.teamId =res.data._id', stado.nom3.teamId)
                axios.put(`${URL}/idea/${this.state.nom3._id}`, this.state.nom3, config) // DESCARGAMOS DATOS DEL USUARIO
                    .then(res => {
                            // si los el ide del usuario coincide con el de la ciudad/user
                            res.data.businessModelId = this.state.nom3.businessModelId
                            res.data.teamId = stado.nom3.teamId
                        res.data.teamId.cityId = stado.nom3.teamId.cityId

                            this.props.modIdeas(res.data,this.state.nom3._id)
                        }
                    )
                    .catch(err => console.log('No ha funcionado el put', err));


                }


            )
            .catch(err => console.log('No ha funcionado el put', err));
    }


    render() {

            const ideas = this.props.idea.filter(item =>{if (item.teamId === undefined) return item})
        const names = this.props.team.map (team => team )
        const users =  this.props.user.map (user => user)
        const res = users.filter(user => {
            let temp =  names.some(name => user.telephone === name.name)
            if(!temp)
                return user
        })
        console.log('hola teams',names)
        console.log('hola teams',res)



        return (
            <div className={"card-header text-light"}>
                <nav className={"navbar navbar-dark mt-3"}>
                    <h2 className={"text-white"}>Edit team</h2>
                </nav>
                <form className={"card-header bg-dark"} onSubmit={this.regDatos} >
                    <div className={"text-left"}>
                        <h4 className={"colores"}>Idea </h4>
                        <p className={"text-light "}>Please select the idea that the team will be developing</p>
                    </div>
                    <div className={"form-gruop row text-left"}>
                        <h6 className={"col-sm-2 text-left "}>Selected idea</h6>
                        <select className={'select form-control col-sm-2'} id={'select'}
                                name={'nom3'}
                                onChange={this.introDatos}
                                required>
                            <option selected={'true' }  disabled>Select idea</option>
                            {ideas.map((idea) => {
                                return (
                                    <option name={'nom3'} value={JSON.stringify(idea)}>{idea.name}</option>)})}
                        </select>
                        <button className={"col-sm-2 ml-4 btn  btn-primary text-light"} onClick={()=> this.añadirIdea(this.state.nom3)}>SELECT</button>
                    </div>
                    <div className={"text-left"}>
                        <h4 className={"colores"}>Headquarter </h4>
                        <p className={"text-light "}>Please select the headquarter where the team is located</p>
                    </div>
                    <div className={"form-gruop row text-left"}>
                        <h6 className={" col-sm-2 text-left"}>Selected city</h6>
                        <select className={'select  form-control col-sm-2' } id={'select'}
                                name={'nom2'}
                                onChange={this.introDatos} required >
                            <option selected={'true' }  disabled>Selecciona una ciudad</option>
                            {this.props.city.map((city) => {
                                return (
                                    <option name={'nom2'} value={JSON.stringify(city)}>{city.name}{': '}{city.address}</option>)})}
                        </select>
                        <button className={"col-sm-2 ml-4 btn  btn-primary text-light"}
                                onClick={(e)=>{e.preventDefault()
                                    this.añadirCity(this.state.nom2)}}>
                            <h6>SELECT</h6>
                            {console.log('nameeeeeeeeeeee' +this.state.name)}
                            {console.log('nom2' +this.state.cityId)}
                            {console.log('stado' +this.state.usersDemium)}
                        </button>
                    </div>
                    <div className={"text-left"}>
                        <h4 className={"colores mt-3"}>Team members </h4>
                        <p className={"text-light "}>Please select the team members and choose their roles </p>

                    </div>
                    <h5 className={"colores text-left"}>Selected members </h5>
                    <div className={'form-group row'}>
                    <select
                            className={'select ml-3  form-control col-sm-2'} id={'select'}
                            name={'nom1'}
                            onChange={this.introDatos}
                            required>
                        <option selected={'true' }  disabled>Selecciona un usuario</option>
                        {res.map((usr) => {
                            return (
                                <option name={'nom1'} value={JSON.stringify(usr)}>{usr.name} {':' + usr.roleId}</option>)})}
                    </select>
                    <button className="col-sm-1 ml-4 btn btn-primary"
                            onClick={(e)=>{e.preventDefault()
                                this.añadirUser(this.state.nom1)}}>
                        <h6>Add</h6>
                        {console.log('nom1' +this.state.nom1)}
                        {console.log('stado' +this.state.users )}
                        {console.log('el porque de las ocasas rendeeer' , this.state.cityId)}
                    </button></div>
                    <div>
                        {this.state.users.map(added =>{return(
                            <div>
                                {added.name}{added.roleId}

                                <button className={"col-sm-1 mt-2 ml-4 btn  btn-danger text-light"} onClick={()=>this.remove(added.name)}>Remove</button>
                            </div>)})}
                    </div>
                    <div className={"text-left"}>
                        <h4 className={"colores mt-3"}>Demium Team</h4>
                        <p className={"text-light "}>Please select the team members  </p>
                    </div>
                    <div className={"form-group row"}>
                        <p > {this.state.usersDemium && this.state.usersDemium.map(usuario =>{return(
                            <p className={"text-left ml-3 "}>
                                {usuario && usuario.name} {usuario && usuario.roleId}
                            </p>)})}</p>
                    </div>
                    <div className={"text-right"}>
                        <button className={"col-sm-2 ml-4 btn  btn-primary text-light"} onClick={()=>this.createTEAMS(this.state)}>
                            <Link to={"/teamcard"}><h5 className={'text-light'}>Save</h5></Link>
                        </button>
                        <button className={"col-sm-2 ml-4 btn  btn-danger text-light"}><Link to={"/teamcard"}><h5 className={'text-light'}>Cancel</h5></Link></button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        obj: state.teamShow,
        city: state.city,
        user: state.user.filter(item => { if( item.roleId === "DP" || item.roleId === "TM" ){console.log(item.roleId)} else return item}),
        idea: state.viewAdd,
        team: state.team,


    }
}

const dispastchToProps=(dispatch,props )=>{
    return{
        fromTeams:(state)=> dispatch (fromTeam(state)),
        modIdeas:(stado,id)=>dispatch(modIdea(stado,id)),
        addUsers:(stado,id)=>dispatch(addUser(stado,id)),

    }
}

export default connect(mapStateToProps,dispastchToProps)(FormTeam);