<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Header />
    <router-view></router-view>

    <Footer v-show="isShowFooter"></Footer>
    <!-- 也可以通过路由元信息来处理 -->
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer"; //这是静态组件

 import Swiper from 'swiper'

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    this.$store.dispatch("categoryList");
    //this.$store.dispatch('bannerList')
    
  },
  computed: {
    // isShowFooter(){
    //   if(this.$route.path=='/home'||this.$route.path=='/search')
    //   return true
    //   else
    //   return false
    // }
    isShowFooter() {
      return this.$route.meta.show; //meta在路由中定义
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
