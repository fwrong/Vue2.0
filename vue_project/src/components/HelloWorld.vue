<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <h2>Essential Links</h2> -->
    <h3 v-if="msg1!=undefined">{{msg1}}</h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg1: ""
    };
  },
  beforeRouteEnter: (to, from, next) => {
    this.msg1 = to.query.plan;
    console.log(from);
    //传入回调获取this对象
    next(vm => {
      vm.msg1 = to.query.plan +" "+ to.query.mdzz;
      console.log("vm" + vm.goBack);
    });
  },
  beforeRouteUpdate: (to, from, next) => {
    console.log(from);
    next();
  },
  methods: {
    goBack() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
