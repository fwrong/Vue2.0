
<template>
    <div>
        <h2>{{ msg }}</h2>
        <p>新闻ID：{{ $route.params.newsId}}</p>
        <p>新闻标题：{{ $route.params.newsTitle}}</p>
        <button @click="goHome">带query参数跳转到首页</button>
    </div>
</template>
 
<script>
export default {
  name: "params",
  data() {
    return {
      msg: "params page"
    };
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/",
        query: {
          plan: "private",
          mdzz: "this is a test"
        }
      });
    }
  },
  beforeRouteEnter: (to, from, next) => {
    console.log(to);
    console.log(from);
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log(to);
    console.log(from);
    next();
  },
  beforeRouteUpdate: (to, from, next) => {
    console.log(to);
    console.log(from);
    next();
  }
};
</script>