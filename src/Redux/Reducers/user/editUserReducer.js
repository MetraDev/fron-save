import {actionTypesNom} from "../cities/movDtaReducer";


export const actionTypesUserEdit = {
    editUser: '@Edit-->User'

}


const reducer = (state = [] , action) => {


    switch (action.type) {
        case actionTypesUserEdit.editUser:
            console.log('reducer'+ action.id)


            return [ action.id]


        default:
            return state;
    }
}

export default reducer;