export const actionTypesRole = {

    descargaRole: '@LOAD-->rOle'

}


const reducer = (state = [], action) => {


    switch (action.type) {


        case actionTypesRole.descargaRole:

            state = action.data

            return [...state]


        default:
            return state;
    }
}

export default reducer;