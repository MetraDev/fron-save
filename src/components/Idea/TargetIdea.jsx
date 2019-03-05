import React, {Component} from 'react';
import '../../taridea.css';
import { viewIdeass, deleteIdea} from "../../actions/actions";
import {connect} from "react-redux";
import  {Link} from 'react-router-dom'
import uuid from "uuid";
import {token} from "../../index";
import axios from "axios";
import {URL} from '../../index'


class TargetIdea extends Component {
    constructor(props) {
        super(props);
        this.state = {

            name: 'Madrid',
            businessModelId: 'España',
            description: 'Tigre! ¡Tigre!, fuego que ardes' +
                'En los bosques de la noche,' +
                '¿Qué mano inmortal, qué ojo' +
                'Pudo idear tu terrible simetría?' +
                '¿En qué distantes abismos, en qué cielos,' +
                'Ardió el fuego de tus ojos?' +
                '¿Con qué alas osó elevarse?' +
                '¿Y que mano osó tomar ese fuego?' +
                '¿Y que hombro y qué arte,' +
                'podrían retorcer la nervadura de tu corazón' +
                'Y cuando tu corazón comenzó a latir' +
                '¿Qué formidable mano, qué formidables pies?',
            teamId: '',
            businessModel:[]
        }
    }



    deleteI = (id) => {

        var config = {

            headers: {'Authorization': localStorage.getItem('accesToken')}
        };
        console.log('deletei' ,id)
        axios.delete(`${URL}/idea/${id}`, config)
            .then(res => {

                this.props.deleteIdeass(id)
            })
            .catch(err => console.log('No ha funcionado delete', err));
    }

    getCities=(team)=>{
        let city= ''

        if(team)
         city = this.props.city.filter(item => item._id === team.cityId)

        console.log('pufffffffffff', city)

        if(city[0])
        return(
            <h6>{city[0].name}</h6>


        )


    }



    render() {



        let todo =this.props.idea.map((idea) => {
            return (
                <div className={" col-md-4 mb-3"}>
                    <div className={"carder card  mt-4"}>
                        <div className={""}>
                            <div className={" card-header bg-primary text-right"}>
                                <span className={'text-danger bg-transparent'} onClick={()=> this.deleteI(idea._id)}>X</span>
                            </div>
                        </div>
                        <div className={"card-Body"}>
                            <div className={" form-group row"}>
                                <h6 className={"typeee text-left mt-3 ml-4"}>Type</h6>
                                <h6 className={" text-left mt-3 ml-3"}>{idea.businessModelId.name}</h6>
                            </div>
                            <div className={"form-group row"}>
                                <h6 className={"typeeeb name text-left ml-4"}>Name</h6>
                                <h6 className={" text-left ml-3"}>{idea.name}</h6>
                            </div>
                            <h5 className={"typeeeb text-left ml-2"}>Description</h5>
                            <p className={"final text-left ml-2"}>{idea.description}</p>
                            <div className={"form-group row"}>
                                {console.log('las xityyyy' , idea.teamId ? idea.teamId: '' )}
                                <h6 className={"typeeeb text-left ml-4"}>Headquarter</h6>
                                <h6 className={" text-left ml-3"}>{ idea.teamId === undefined ? '': idea.teamId.cityId === undefined ? '' :idea.teamId.cityId.name ? idea.teamId.cityId.name :this.getCities(idea.teamId)}</h6>

                            </div>
                            <div className={"form-group row"}>
                                <h6 className={"typeeeb text-left ml-4"}>Team</h6>
                                <h6 className={" text-left ml-3"}>{idea.teamId === undefined ?  '' :idea.teamId.name }</h6>
                            </div>
                            <p className={"text-right mr-3"}>
                                <button className={"text-rigth btn btn-primary mr-10"} >
                                    <Link to={"/ideaspag"}  onClick={()=>{this.props.view( idea)}}> <h5 className={"text-light"}>{'VIEW'}</h5></Link>

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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        idea: state.viewAdd,
        team: state.team,
        city: state.city
    }
}
const dispatchToProps=(dispatch,props )=>{
    return{
        view:(idea)=>dispatch(viewIdeass(idea)),
        deleteIdeass:(id)=>dispatch(deleteIdea(id)),

    }
}

export default connect( mapStateToProps,dispatchToProps)(TargetIdea);



