import {actionTypesUser} from "../user/usersReducer";

const defaultState = []

export const actionTypesTeam = {

    addTeam: '@ADD-->TEAM',
    modTeam: '@MOD-->TEAM',
    modTar: '@MOD-->TAR',
    delTeam: 'DEL-->TEAM',
    fromTeam:'form-->TEAM'
}


const reducer = (state =defaultState, action) => {

    switch (action.type) {

        case actionTypesTeam.addTeam:
console.log('en el reducer team', action.data)
            state = action.data

            return [ ...state];

        case actionTypesTeam.modTeam:

            state = state.filter( item => {if (item._id === action.data.id){
                item.cityId= action.data.name
                    item.users[0].id= action.data.user1
                    item.users[1].id= action.data.user2
            }
            return item._id})
            return[...state]

        case actionTypesTeam.modTar:

            console.log('llllll' + action.id + 'ssssssssssssss' + action.stado)

            state = state.map(item => {
                if(item._id === action.id.toString()){
                    item = action.stado
                }
                return item
            });

            return [...state];

        case actionTypesTeam.delTeam:
            console.log('ihoinobobnobojn'+action.id);
            state = state.filter( item =>  {
                return item._id !== action.id.toString()});

            return [...state];
        case actionTypesTeam.fromTeam:
                state.push(action.state)
            return [...state];




        default:
            return state;
    }
}

export default reducer