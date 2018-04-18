<template>
  <div>
      <h2>{{msg}}</h2>
      <button @click="$store.commit('reduce')">减</button>
      <span>{{count}}</span>
      <button @click="$store.commit('add',10)">加</button>
      <button @click="reduce1">减</button>
      <span>{{count1}}</span>
      <button @click="add1(10)">加</button>
  </div>
</template>
<script>
import store from "@/vuex/store";
import { mapState, mapMutations,mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: "Hello Vuex"
    };
  },
  //方法一
  //   computed:{
  //       count(){
  //           return this.$store.state.count;
  //       }
  //   },
  //方法二
  // computed:mapState({
  //     count:(state)=>state.count
  // }),
  //方法三
  //computed: mapState(["count","count1"]),//把store.js中的state值赋值给我们模板中的data值
 computed:{
   ...mapState(["count","count1"]),
  //  count(){
  //    return this.$store.getters.count;
  //  }
  ...mapGetters(['count'])
 },
  methods:{
    ...mapMutations(['add1','reduce1']),//在模板中直接使用我们的reduce1或者add1方法
    },
  store
};
</script>

