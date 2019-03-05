import {actionTypesTeam} from "../team/teamReducer";
import {actionTypesUser} from "../user/usersReducer";


export const actionTypesIdeas = {

    viewAdd: '@ADD-->VIEW',
    modIdea: '@Mod-->Idea',
    crearIdea: '@crear-->Idea',
    deleteIdea: '@delete-->Idea',

}


const reducer = (state = [], action) => {


    switch (action.type) {


        case actionTypesIdeas.viewAdd:
            console.log('las ideas'+ action.data)
            state = action.data
            return [...state]

        case actionTypesIdeas.modIdea:

            console.log('llllll' + action.id + 'ssssssssssssss' + action.stado)

            state = state.map(item => {
                if(item._id === action.id){
                    item = action.stado
                }
                return item
            });

            return [...state];

        case actionTypesIdeas.crearIdea:
            console.log('las ideas'+ action.data)

            return [...state,action.stado]

        case actionTypesIdeas.deleteIdea:
            console.log('ihoinobobnobojn'+action.id);

            state = state.filter( item =>  {
                return item._id !== action.id});
            return [...state];


        default:
            return state;
    }
}

export default reducer;