<template>
  <div id="app">
    <div>
      <!-- 左导航 -->
      <the-LeftBar class="leftBar" />
      <div class="page-content">
        <!-- 头部导航 -->
        <the-header />
        <!-- 播放列表 -->
        <the-aside></the-aside>
        <!-- 主体内容 -->
        <div class="music-content-bar">
          <router-view />
        </div>
      </div>
    </div>
    <song-audio />

    <!-- 播放控制块 -->
    <play-bar />
    <!--    <scroll-top/>-->
    <!--    <the-footer/>-->
  </div>
</template>

<script>
import SongAudio from "./components/SongAudio";
import TheHeader from "./components/TheHeader";
import PlayBar from "./components/PlayBar";
import TheAside from "./components/TheAside";
import TheLeftBar from "./components/TheLeftBar";

export default {
  name: "App",
  components: {
    SongAudio,
    TheHeader,
    TheAside,
    PlayBar,
    TheLeftBar
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "./assets/css/app.scss";
</style>
