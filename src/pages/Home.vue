<template>
  <div class="home">
    <!--轮播图-->
    <swiper class="my-swiper" :swiperList="swiperList" />
    <!--每日推荐-->
    <daily-recommend class="daily-recommend" :songList="recommendList">
      <template slot="title">每日歌曲推荐</template>
    </daily-recommend>
  </div>
</template>

<script>
import { swiperList } from "../assets/data/swiper";
import Swiper from "../components/Swiper";
import ContentList from "../components/ContentList";
import DailyRecommend from "../components/DailyRecommend";
import { getRandomSong } from "../api/index";

export default {
  name: "home",
  components: {
    Swiper,
    ContentList,
    DailyRecommend
  },
  data() {
    return {
      swiperList: [], // 轮播图列表
      recommendList: [] // 每日推荐列表
    };
  },
  created() {
    this.swiperList = swiperList;
    // 获取每日推荐列表
    this.getRecommendList();
  },
  mounted() {
    const swiper_height = document.querySelector(".my-swiper").offsetHeight;
    const home_height = document.querySelector(".home").offsetHeight;
    document.querySelector(".daily-recommend").style.height =
      home_height - swiper_height + "px";
  },
  methods: {
    // 获取每日推荐列表
    getRecommendList() {
      getRandomSong()
        .then(res => {
          this.recommendList = res.sort();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/home.scss";
</style>
