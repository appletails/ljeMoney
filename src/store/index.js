
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {//要设置的全局访问的state对象
    AllDetail:{},
    color: {
        "458335": "#f05a28",
        "614728": "#fb3569",
        "608997": "#6927ff",
        "530440": "#009f9d",
        "614739": "#f3d516",
        "707369": "#ff8484",
        "614733": "#5c3b6f",
        "594005": "#34a7b2",
        "614731": "#9873b9",
        "614735": "#ffe98a",
        "614755": "#e61c5d",
        "874500": "#c70039",
        "614742": "#ff8b00",
        "679462": "#d34848",
        "867888": "#ff8162",
        "614750": "#ffcd60",
        "614741": "#41aaa8",
        "874717": "#ef6c57",
        "867896": "#113f67",
        "528336": "#34699a",
        "874698": "#408ab4",
        "614761": "#65c6c4",
        "528339": "#ffa45c",
        "707365": "#ffcdab",
        "867895": "#4f9da6",
        "407108": "#233142",
        "874508": "#ff5959",
        "614730": "#5dc0a6",
        "874723": "#f6b8d1",
        "407130": "#fb3569",
        "874505": "#774898",
        "867899": "#e4734f"
    },
    idftData:{}
};
const mutations = {
    // 获取所有摩点项目信息
    DETAIL(state,data){
        state.AllDetail = data
    },
    GETIDFT(state,data){
        state.idftData = data
    }
}

const store = new Vuex.Store({ state, mutations });

export default store;