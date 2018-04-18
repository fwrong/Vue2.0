import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Hi3 from '@/components/Hi3'
import Hi4 from '@/components/Hi4'
import params from '@/components/params'
import Error from '@/components/Error'
import Count from '@/components/Count'



Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path:'*',
      component:Error
    },
    {
      path: '/',
      name: 'HelloWorld',
      components:{
        default:HelloWorld,
        left:Hi3,
        right:Hi4
      } 
    },
    {
      path:"/Hi",
      // name:"Hi", 
      component:Hi,
      alias:'/H31',
      children:[
        {path:'/',name:'h1',component:Hi},
        {path:'Hi1',name:'Hi1',component:Hi1},
        {path:"Hi2/:username/:id(\\d+)",name:'Hi2',component:Hi2},
      ]
    },
   
    {
      path:"/params/:newsId/:newsTitle",
      component:params,
      name:'Params'
    },
    
    {
      path:'/Count',
      component:Count
    } 
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      console.log(to)
      return { x: 0, y: 0 }
    }
  }
});

export default router
