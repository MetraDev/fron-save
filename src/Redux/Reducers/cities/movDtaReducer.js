export const actionTypesNom = {

    envNom:"@ENV-->NOM"

}


const reducer = (state =[] ,action) => {


    switch (action.type) {

        case actionTypesNom.envNom:
            console.log('reducer'+ action.estado)


            return [ action.estado]


        default:
            return state;
    }
}

export default reducer;