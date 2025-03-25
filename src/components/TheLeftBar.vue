<template>
  <div class="the-leftBar">
    <!--LoGo-->
    <div class="header-logo" @click="goHome">
      <div
        class="logo"
        :style="{
          background:
            'url(./static/img/logo_loukong.png) no-repeat center center',
          backgroundSize: 'contain'
        }"
      ></div>
    </div>
    <ul class="navbar" ref="change">
      <li
        :class="{ active: item.name === activeName }"
        v-for="item in navMsg"
        :key="item.path"
        @click="goPage(item.path, item.name)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../mixins";
import { navMsg, loginMsg, menuList } from "../assets/data/header";

export default {
  name: "the-LeftBar",
  mixins: [mixin],
  data() {
    return {
      musicName: "Yin-music",
      navMsg: [], // 左侧导航栏
      loginMsg: [], // 右侧导航栏
      menuList: [], // 用户下拉菜单项
      keywords: ""
    };
  },
  computed: {
    ...mapGetters(["userId", "activeName", "avator", "username", "loginIn"])
  },
  created() {
    this.navMsg = navMsg;
    this.loginMsg = loginMsg;
    this.menuList = menuList;
  },
  mounted() {
    document.querySelector("#user").addEventListener(
      "click",
      function(e) {
        document.querySelector(".menu").classList.add("show");
        e.stopPropagation(); // 关键在于阻止冒泡
      },
      false
    );
    // 点击“菜单”内部时，阻止事件冒泡。(这样点击内部时，菜单不会关闭)
    document.querySelector(".menu").addEventListener(
      "click",
      function(e) {
        e.stopPropagation();
      },
      false
    );
    document.addEventListener(
      "click",
      function() {
        document.querySelector(".menu").classList.remove("show");
      },
      false
    );
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    goPage(path, value) {
      document.querySelector(".menu").classList.remove("show");
      this.changeIndex(value);
      if (!this.loginIn && path === "/my-music") {
        this.notify("请先登录", "warning");
      } else {
        this.$router.push({ path: path });
      }
    },
    changeIndex(value) {
      this.$store.commit("setActiveName", value);
    },
    goMenuList(path) {
      if (path === 0) {
        this.$store.commit("setIsActive", false);
      }
      document.querySelector(".menu").classList.remove("show");
      if (path) {
        this.$router.push({ path: path });
      } else {
        this.$store.commit("setLoginIn", false);
        this.$router.go(0);
      }
    },
    goSearch() {
      this.$store.commit("setSearchword", this.keywords);
      this.$router.push({
        path: "/search",
        query: { keywords: this.keywords }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/the-leftBar.scss";
</style>
