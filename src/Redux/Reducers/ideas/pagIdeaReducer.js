import {idea} from '../../../idea.json';
const defaultState = []



export const actionTypesIdeasPages = {
    viewIdea: '@View-->IDEA',


}


const reducer = (state = [] , action) => {


    switch (action.type) {


        case actionTypesIdeasPages.viewIdea:
            console.log('ideaaas' +action.data)
            return [action.data]
        default:
            return state;
    }
}

export default reducer;