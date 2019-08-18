import axios from 'axios';

export const getTodoListAPI = params => {
    return axios.get(`/todo`, {
        params: params
    });
};
