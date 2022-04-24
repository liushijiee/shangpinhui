<template>
  <div>
    
    <TypeNav />
    
    <ListContainer />
    <Recommand />
    <Rank />
    <Like />
    <Floor v-for="(floor) in floorList" :key="floor.id" :List="floor"/>
    <Brand />
  </div>
</template>

<script>
import Recommand from "@/pages/Home/Recommand/";
import Rank from "@/pages/Home/Rank/";
import Like from "@/pages/Home/Like/";
import Floor from "@/pages/Home/Floor/";
import Brand from "@/pages/Home/Brand/";

export default {
  name: "",
  
  computed: {
    floorList() {
      return this.$store.state.home.floorList;
    },
  },
  mounted() {
    //console.log('请求数据');
    this.$store.dispatch('floorList');
    //在首页获取用户信息
    // this.$store.dispatch('getUserInfo')
  },
  components: {
    Recommand,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style>
</style>