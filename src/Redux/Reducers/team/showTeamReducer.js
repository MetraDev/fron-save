


export const actionTypesTeamShow = {

    showTeam: '@SHOW-->TEAM',
}


const reducer = (state =[] ,action) => {


    switch (action.type) {

        case actionTypesTeamShow.showTeam:
            console.log('reducer'+ action.data)




            return action.data


        default:
            return state;
    }
}

export default reducer;