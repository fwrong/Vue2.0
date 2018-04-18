import Vue from 'vue';
import Vuex from "vuex";
Vue.use(Vuex);

const  state = {
    count:1,
    count1:10
}
const mutations = {
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    },
    add1(state,n){
        state.count1+=n;
    },
    reduce1(state){
        state.count1--;
    }
}
const getters = {
    count:(state)=>state.count +=100 
}
export default new Vuex.Store({
    state,
    mutations,
    getters
})