<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to='/'>首页</router-link>
      <router-link to='/Hi'>Hi</router-link>
      <router-link to='/Hi/Hi1'>Hi1页面</router-link>
      <router-link :to='{name:"Hi2",params:{username:"Fwrong",id:"123"}}'>Hi2页面</router-link>
      <router-link to='/params/129/1mdzz'>params页面</router-link>
      <router-link to='/Count'>Count页面</router-link>
    </div>
    <transition name="fade" mode="out-in">
    <router-view></router-view>
     </transition>
    <router-view name="left"></router-view>
    <router-view name="right"></router-view>
   
    <p>{{$route.name}}</p>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 180px;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
transition: opacity .5s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  transition: opcity .5s;
}
</style>
