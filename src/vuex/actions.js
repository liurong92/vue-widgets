// import { getTodoListAPI } from '../api/api';

export const getTodoMessage = ({ commit }) => {
    return commit('GET_TODO_MESSAGE', {message: 'this is get todo page message'});

    // return new Promise((resolve) => {
    //     getTodoListAPI().then((res) => {
    //         // get value from axios
    //         commit('GET_TODO_LIST', {message: 'this is get todo value'});
    //         resolve();
    //     });
    // });
};
