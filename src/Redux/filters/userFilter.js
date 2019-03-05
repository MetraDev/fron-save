import {addCities, deleteCity, modCity, movNom} from "../../actions/actions";
import {connect} from "react-redux";

export const getTodoById = (todos, id) => {
    const item = todos.find(item => item.id === id);

    return item;
}

export const getTodoIndexById = (todos, id) => {
    const index = todos.findIndex(item => item.id === id);

    return index;
}



