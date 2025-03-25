<template>
  <div class="the-header">
    <!-- 搜索框 -->
    <ul class="navbar" ref="change">
      <li>
        <div class="header-search">
          <div class="search-column">
            <input
              type="text"
              placeholder="搜索音乐"
              @keyup.enter="goSearch(), getSearchList()"
              v-model="keywords"
            />
            <span @click="goSearch(), getSearchList()"
              ><i class="el-icon-search"></i
            ></span>
          </div>
        </div>
      </li>
    </ul>
    <!--登录注册提示-->
    <div class="login-sinUp" v-show="!loginIn">
      <p
        :class="{ active: item.name === activeName }"
        v-for="item in loginMsg"
        :key="item.type"
        @click="goPage(item.path, item.name)"
      >
        {{ item.name }}
      </p>
    </div>
    <!--头像&设置-->
    <div class="header-right" v-show="loginIn">
      <div id="user">
        <img :src="attachImageUrl(avator)" alt="" />
      </div>
      <span id="username">&nbsp;cai</span>
      <ul class="menu">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          @click="goMenuList(item.path)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../mixins";
import { navMsg, loginMsg, menuList } from "../assets/data/header";
import { getSongListOfLikeTitle } from "../api/index";

export default {
  name: "the-header",
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
    document.querySelector("#username").addEventListener(
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
    },
    // 搜索歌单
    getSearchList() {
      if (!this.$route.query.keywords) return;
      getSongListOfLikeTitle(this.$route.query.keywords).then(res => {
        if (!res.length) {
          this.$store.commit("setSongList", []);
          this.notify("暂无该歌单", "warning");
        } else {
          this.$store.commit("setSongList", res);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/the-header.scss";
</style>
