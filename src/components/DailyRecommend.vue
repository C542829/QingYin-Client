<template>
  <div class="content">
    <div class="content-header">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>
    </div>
    <div class="song-list-bar">
      <div class="list-title song-item">
        <span class="item-index" style="width: 13%;"></span>
        <span class="item-title">歌曲名</span>
        <span class="item-name">歌手</span>
        <span class="item-intro">专辑</span>
        <span class="item-duration">时长</span>
      </div>
      <ul>
        <li class="list-content" v-for="(item, index) in songList" :key="index">
          <div
            class="song-item"
            :class="{ 'is-play': id === item.id }"
            @click="
              toplay(item.id, item.url, item.pic, index, item.name, item.lyric)
            "
          >
            <span class="item-index">
              <span v-if="id !== item.id">{{ index + 1 }}</span>
              <svg v-if="id === item.id" class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinliang"></use>
              </svg>
            </span>
            <span class="item-pic">
              <img :src="HOST + item.pic" alt="none" />
            </span>
            <span class="item-title">{{ replaceFName(item.name) }}</span>
            <span class="item-name">{{ replaceLName(item.name) }}</span>
            <span class="item-intro">{{ item.introduction }}</span>
            <span class="item-duration">{{ item.duration.slice(3, 8) }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../mixins";

export default {
  name: "daily-recommend",
  mixins: [mixin],
  props: {
    songList: Array
  },
  computed: {
    ...mapGetters([
      "id", // 音乐ID
      "HOST" // 静态资源服务器
    ])
  },
  methods: {
    goAblum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `/${this.path}/${item.id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/daily-recommend.scss";
</style>
