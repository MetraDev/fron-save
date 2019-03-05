export const actionTypesBusiness = {

    descargaBusiness: '@LOAD-->business'

}


const reducer = (state = [], action) => {


    switch (action.type) {


        case actionTypesBusiness.descargaBusiness:

            state = action.data

            return [...state]


        default:
            return state;
    }
}

export default reducer;