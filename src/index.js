import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./components/AppRouter";
import createStore from './Redux/create';
import {connect, Provider} from 'react-redux';
import axios from "axios";
import {actionTypesUser} from "./Redux/Reducers/user/usersReducer";
import {actionTypesTeam} from "./Redux/Reducers/team/teamReducer";
import {actionTypesIdeas} from "./Redux/Reducers/ideas/ideasReducer";


//localStorage.setItem('accesToken',  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzc0NTUxZDQxMzEzYzFjNWM1ZDg2MjYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTUxMTI3ODM3fQ.HNL_Jfde9K3f6K5FJPxA8u53iWUiJ1Q0EStZd2GC_30")



const store = createStore();
export const urls =()=> {
    let temp = store.getState().url

    console.log('temp', temp)
    let temp2 = ''
    if (temp === 'true') {
        console.log('es true')

        return temp2 = 'http://localhost:8080'

    }
    if (temp === 'false') {
        console.log('es false')

        return temp2 = 'http://52.213.25.226:3030'
    }
}

export const URL = 'http://52.213.25.226:3030'


var log={
    "email": "sergiop.pias@gmail.com",
    "password": "porlamadre3",
    "strategy": "local",
}




//----------------------------------------------------------------------------------------------------------------------
//AUTHENTICATION
//----------------------------------------------------------------------------------------------------------------------


axios.post('http://52.213.25.226:3030/authentication/', log)
    .then(res => {
        if (token ==  res.data.accessToken){
            alert('tu sesiónn ha caducado')
        }


    })
    .catch(err=> console.log('No ha funcionado users', err))

export const token = localStorage.getItem('accesToken')



var config = {
    headers: {'Authorization':  localStorage.getItem('accesToken')}

};




//----------------------------------------------------------------------------------------------------------------------
// CITIES
//----------------------------------------------------------------------------------------------------------------------





export const cities =()=> {
    var config = {
        headers: {'Authorization':  localStorage.getItem('accesToken')}

    };
    axios.get(`${URL}/city`, config)
    .then(rescity => {
        console.log('rescity',rescity)
        axios.get(`${URL}/user`, config)
            .then(resuser => {
                console.log('resuser',resuser)
                const cities = rescity.data.data;
                const users = resuser.data.data;
                console.log('stadoo city' , cities)

                const citiesWithUsers = cities.map(city => {
                    city.users =city.users && city.users.map(user => user && users.find(el =>el && user.id || user._id === el._id ) );
                    return city
                })

                console.log('cities index'+citiesWithUsers)
                store.dispatch({
                    type: '@ADD_CITIES',
                    data:citiesWithUsers
                })


            })
            .catch(err=> console.log('No ha funcionado users', err))
    })
    .catch(err=> console.log('No ha funcionado users', err))}

//----------------------------------------------------------------------------------------------------------------------
//USERS
//----------------------------------------------------------------------------------------------------------------------
export const users =()=> {
    var config = {
        headers: {'Authorization':  localStorage.getItem('accesToken')}

    };

axios.get(`${URL}/user`, config)
    .then(res => {

        store.dispatch({type: actionTypesUser.createUser,
            data: res.data.data})
    })
    .catch(err => console.log('No ha funcionado users', err));}
//----------------------------------------------------------------------------------------------------------------------
//TEAMS
//----------------------------------------------------------------------------------------------------------------------
export const teams =()=> {
    var config = {
        headers: {'Authorization':  localStorage.getItem('accesToken')}

    };
axios.get(`${URL}/team`, config)
    .then(resteam => {
        axios.get(`${URL}/city`, config)
            .then(rescity => {
                const cities = rescity.data.data;
                const team = resteam.data.data;

                const citiesWithUsers = team.map(team => {
                    team.cityId= cities.find(el =>team.cityId && team.cityId === el._id )
                    return team
                })
                console.log('la ciudad ' ,resteam)

                axios.get(`${URL}/user`, config)
                    .then(resuser => {
                        const users = resuser.data.data

                        const resultado = citiesWithUsers.map(teams => {
                            teams.users = teams.users.map(user => users.find(el => user.userId || user._id === el._id ) );
                            return teams
                        })
                        console.log('holaaaaa' ,resultado)


                        store.dispatch({
                            type: actionTypesTeam.addTeam,
                            data :resultado})


                    })
                    .catch(err=> console.log('No ha funcionado users', err))


            })
            .catch(err=> console.log('No ha funcionado users', err))
    })
    .catch(err=> console.log('No ha funcionado users', err))}

//----------------------------------------------------------------------------------------------------------------------
//IDEAS
//----------------------------------------------------------------------------------------------------------------------

export const ideas =()=> {
    var config = {
        headers: {'Authorization':  localStorage.getItem('accesToken')}

    };


axios.get(`${URL}/idea`, config)
    .then(residea => {
        axios.get(`${URL}/businessmodel`, config)
            .then(resbusinessmodel => {
                const businessmodel = resbusinessmodel.data.data;
                const idea = residea.data.data;


                const ideasWithUsers = idea.map(idea => {
                    idea.businessModelId = businessmodel.find(el =>idea.businessModelId === el._id )
                    return idea
                })



                axios.get(`${URL}/team`, config)
                    .then(resteam => {
                        const teams = resteam.data.data

                        console.log('noseeee', teams)

                        const result = ideasWithUsers.map(idea => {
                            console.log('noseeee', idea.teamId )
                            idea.teamId = idea.teamId && teams.find(el => el &&  idea.teamId === el._id  ) ;
                            return idea
                        })
                        console.log('holaaaaa' ,result)


                        store.dispatch({
                            type: actionTypesIdeas.viewAdd,
                            data: result})


                    })
                    .catch(err=> console.log('No ha funcionado users', err))

            })
            .catch(err=> console.log('No ha funcionado users', err))
    })
    .catch(err=> console.log('No ha funcionado users', err))}

/*axios.get('http://52.213.25.226:3030/idea', config)
    .then(res => {

        store.dispatch({type: '@ADD-->VIEW',
            data: res.data.data})
    })
    .catch(err => console.log('No ha funcionado users', err));*/




//----------------------------------------------------------------------------------------------------------------------
//ROLE
//----------------------------------------------------------------------------------------------------------------------

export const roles =()=> {
    var config = {
        headers: {'Authorization':  localStorage.getItem('accesToken')}

    };
axios.get(`${URL}/role`, config)
    .then(res => {
        console.log('resss mi api 2222 ' , res)
        store.dispatch({type: '@LOAD-->rOle',
            data: res.data.data})
    })
    .catch(err => console.log('No ha funcionado users', err));}




//----------------------------------------------------------------------------------------------------------------------
//businessmodel
//----------------------------------------------------------------------------------------------------------------------
export const business =()=> {
    var config = {
        headers: {'Authorization':  localStorage.getItem('accesToken')}

    };
axios.get(`${URL}/businessmodel`,config)
    .then(res => {
        console.log('resss mi api ' , res)


        store.dispatch({type: '@LOAD-->business',
            data: res.data.data})
    })
    .catch(err => console.log('No ha funcionado users', err));
}
urls();
cities();
business();
ideas();
roles();
teams();
users();




//----------------------------------------------------------------------------------------------------------------------
//RENDER
//----------------------------------------------------------------------------------------------------------------------

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>, document.getElementById('root'));
