import {actionTypes} from '../Redux/Reducers/cities/cityReducer'
import {actionTypesIdeas} from '../Redux/Reducers/ideas/ideasReducer'
import {actionTypesUser} from "../Redux/Reducers/user/usersReducer";
import {actionTypesIdeasPages} from "../Redux/Reducers/ideas/pagIdeaReducer";
import {actionTypesTeam} from "../Redux/Reducers/team/teamReducer";
import {actionTypesTeamShow} from "../Redux/Reducers/team/showTeamReducer";
import {actionTypesNom} from "../Redux/Reducers/cities/movDtaReducer";
import {actionTypesUserEdit} from "../Redux/Reducers/user/editUserReducer";
import {actionTypesUrl} from "../Redux/Reducers/urlReducer";



export const tareaSi = (stado) => {
    return {
        type: actionTypesUser.addUsuarios,

            stado




    }
}
export const deleteUser= (id) => {
    return {
        type: actionTypesUser.deleteUser,
        id



    }
}
export const addUser= (state,id) => {
    return {
        type: actionTypesUser.addUser,
        state,id



    }
}
export const addCity = (stado,id) => {
    return {
        type: actionTypes.addCity,

            stado,id




    }
}

export const viewIdeass = (idea) => {
    return {
        type: actionTypesIdeasPages.viewIdea,
        data: idea




    }
}

export const viewAdd = (stado) => {
    return {
        type: actionTypesIdeas.viewAdd,
         stado




    }
}

export const addTeam = (stado) => {                 // igual la lio
    return {
        type: actionTypesTeam.addTeam,
        data: stado




    }
}
export const deleteCity =(id) => {
    return {
        type: actionTypes.deleteCity,
        id



    }
}
export const modCity =(id,nom,indx) => {
    return {
        type: actionTypes.modCity,
        data: {id,nom,indx}



    }
}


export const modTeam=(name,user1,user2,id) => {
    return {
        type: actionTypesTeam.modTeam,
        data:{
            name,
            user1,
            user2,
            id}



    }
}

export const showTeam=(data) => {
    return {
        type: actionTypesTeamShow.showTeam,
        data



    }
}

export const modTar=(stado,id) => {
    return {
        type: actionTypesTeam.modTar,
        stado,id


    }
}
export const movNom =(estado) => {
    return {
        type: actionTypesNom.envNom,
        estado


    }
}

export const addCities =(data) => {
    return {
        type: actionTypes.addCities,
        data


    }
}

export const formCity = (stado) => {
    return {
        type: actionTypes.formCity,
        data:{
            stado
        }



    }
}

export const editUser =(id) => {
    return {
        type: actionTypesUserEdit.editUser,
        id


    }
}
export const delTeam =(id) => {
    return {
        type: actionTypesTeam.delTeam,
        id



    }
}
export const fromTeam =(state) => {
    return {
        type: actionTypesTeam.fromTeam,
        state
    }
}

export const modIdea=(stado,id) => {
    return {
        type: actionTypesIdeas.modIdea,
        stado,id


    }
}

export const createIdea = (stado) => {
    return {
        type: actionTypesIdeas.crearIdea,
        stado




    }
}

export const deleteIdea = (id) => {
    return {
        type: actionTypesIdeas.deleteIdea,
        id




    }
}
export const chanegUrl = (bool) => {
    return {
        type: actionTypesUrl.editUrl,
        bool




    }
}




















