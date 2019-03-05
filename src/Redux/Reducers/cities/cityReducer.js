export const actionTypes = {
    addCity: '@ADD-->CITY',
    deleteCity: '@DELETE-->CITY',
    modCity: '@MOD-->CITY',
    addCities: '@ADD_CITIES',
    formCity:'@form--CITY'
}

const reducer = (state = [], action) => {

    switch (action.type) {


        case actionTypes.addCity:
            console.log('llllll' + action.id + 'ssssssssssssss' + action.stado.address)

            state = state.map(item => {
               if(item._id === action.id.toString()){
                   item = action.stado
               }
               return item
            });

            return [...state];


        case actionTypes.addCities:
            console.log('el actioon' , action.data);
            if(action.data !== action.data)
                action.data += action.data
            return [ ...state,...action.data];

        case actionTypes.deleteCity:

            state = state.filter(item => {
                return item._id !== action.id
            });
            return [...state];

        case actionTypes.modCity:
            state = state.filter
            (item => {
                item._id === action.data.id ?
                    item.users[action.data.indx].id = action.data.nom : console.log()

                return item._id
            })
            return [...state];

        case actionTypes.formCity:


            return [...state, action.data.stado]


        default:
            return state;
    }
}

export default reducer;