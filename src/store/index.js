
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {//要设置的全局访问的state对象
    AllDetail:[],
};
const mutations = {
    // 获取所有摩点项目信息
    DETAIL(state,data){
        state.AllDetail = data
    },
}

const store = new Vuex.Store({ state, mutations });

export default store;