import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
    todoPage: []
};

const mutations = {
    GET_TODO_MESSAGE(state, data) {
        state.todoPage = data;
    }
};

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
