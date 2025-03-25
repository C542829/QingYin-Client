<template>
  <div class="content-list">
    <div class="content-header">
      <h1 class="title">
        <slot name="title"></slot>
      </h1>
    </div>
    <p class="empty-tip" v-show="!contentList">暂无相关歌单</p>
    <ul class="section-content">
      <li
        class="content-item"
        v-for="(item, index) in contentList"
        :key="index"
        @click="goAblum(item)"
      >
        <div class="kuo">
          <img class="item-img" :src="attachImageUrl(item.pic)" alt="" />
          <div class="mask" @click="goAblum(item)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <p
          class="item-name"
          :style="{ textAlign: item.name === undefined ? 'left' : 'center' }"
        >
          {{ item.name || item.title }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from "../mixins";

export default {
  name: "song-list-transverse",
  mixins: [mixin],
  props: {
    contentList: Array,
    path: String
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
@import "../assets/css/song-list-transverse.scss";
</style>
