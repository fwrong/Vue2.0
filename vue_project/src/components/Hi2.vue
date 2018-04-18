<template>
  <div class="helllo">
      <h1>{{msg}}--{{$route.params.username}}</h1>
  </div>
</template>
<script>
export default {
  name:'Hi2',
  data:function(){
      return {
          msg:"I am Hi2"
      }
  }
}
</script>
<style scoped>

</style>