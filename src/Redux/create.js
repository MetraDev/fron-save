import { createStore, combineReducers} from 'redux';
import userReducer from './Reducers/user/usersReducer';
import ideaReducer from './Reducers/ideas/ideasReducer';
import cityReducer from './Reducers/cities/cityReducer';
import pagReducer from './Reducers/ideas/pagIdeaReducer';
import teamReducer from './Reducers/team/teamReducer';
import movDtaReducer from './Reducers/cities/movDtaReducer';
import  showTeamReducer from './Reducers/team/showTeamReducer';
import  editUserReducer from './Reducers/user/editUserReducer';
import  roleReducer from './Reducers/role/roleReducer';
import  businessmodelReducer from './Reducers/businessmodel/businessmodelReducer';
import  urlReducer from './Reducers/urlReducer';

export const store = () => {
    const tempStore = createStore(
        combineReducers({
            user: userReducer,
            viewIdea: pagReducer,
            viewAdd: ideaReducer,
            city: cityReducer,
            team:teamReducer,
            teamShow:showTeamReducer,
            movNom:movDtaReducer,
            editUser:editUserReducer,
            role:roleReducer,
            business:businessmodelReducer,
            url:urlReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    return tempStore;
}

export default store;