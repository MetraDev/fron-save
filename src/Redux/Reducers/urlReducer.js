


export const actionTypesUrl = {
    editUrl: '@Edit-->User'

}


const reducer = (state = localStorage.getItem('state') , action) => {


    switch (action.type) {
        case actionTypesUrl.editUrl:

            if (state=== 'true'){
                state = 'false'
                localStorage.setItem('state', state)
            }else {
                state = 'true'
                localStorage.setItem('state', state)

            }

            console.log('url',state)
            return state


        default:
            return state;
    }
}

export default reducer;