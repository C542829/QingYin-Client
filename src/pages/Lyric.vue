<template>
  <div class="lyric-play-bar">
    <div class="play-list">
        <album-content :songList="listOfSongs">
          <template slot="title">播放列表</template>
        </album-content>
    </div>
    <div class="song-lyric">
      <h1 class="lyric-title">{{ title }}</h1>
      <div class="lyr-bar">
        <div class="lyric-box" @wheel="pauseAutoScroll = true" @mouseleave="pauseAutoScroll = false">
          <transition-group name="lyric-fade">
            <!--有歌词-->
            <ul :style="{top:lrcTop}" class="has-lyric" v-if="lyr.length" key="has-lyric">
              <li v-for="(item, index) in lyr" v-bind:key="index">
                {{ item[1] }}
              </li>
            </ul>
            <!--没歌词-->
            <div v-else class="no-lyric" key="no-lyric">
              <span>暂无歌词</span>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="blurBar">
      <div class="blur"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import mixin from '../mixins'
import AlbumContent from '../components/AlbumContent'

export default {
  name: 'lyric',
  mixins: [mixin],
  data () {
    return {
      lrcTop: '200px', // 歌词滑动
      showLrc: false, // 切换唱片和歌词
      lyr: [], // 当前歌曲的歌词
      pauseAutoScroll: false, // 是否暂停歌词滚动
      currentScrollTop: 0, // 当前歌词滚动高度
      currentScrollTopCopy: 0 // 当前歌词滚动高度
    }
  },
  components: {
    AlbumContent
  },
  computed: {
    ...mapGetters([
      'curTime',
      'id', // 歌曲ID
      'title', // 歌名
      'lyric', // 歌词
      'listOfSongs', // 存放的音乐
      'listIndex', // 当前歌曲在歌曲列表的位置
      'picUrl' // 歌曲图片
    ]),
    // 滚动条位置
    scrollTop: {
      get () {
        return this.lyr.length === 0 ? 0 : this.getScrollTopByLyrLen()
      },
      set (val) {
        this.currentScrollTop = val
      }
    }
  },
  watch: {
    id: function () {
      console.log('切歌：', this.id)
      this.lyr = this.parseLyric(this.listOfSongs[this.listIndex].lyric)
      this.pauseAutoScroll = false
      document.querySelector('.lyric-box').scrollTop = 0
      this.scrollTop = (this.lyr.length === 0 ? 0 : this.getScrollTopByLyrLen())
      this.currentScrollTop = this.scrollTop[0]
      this.currentScrollTopCopy = this.scrollTop[0]
      this.getBGPic()
      // 获取歌词列表
      let $li = document.querySelectorAll('.has-lyric li')
      // 恢复歌词颜色和字体大小
      $li.forEach(function (item) {
        item.style.color = 'black'
        item.style.fontSize = '16px'
      })
    },
    currentScrollTopCopy: function () {
      // let div = document.querySelector('.lyric-box')
      // if (this - div.scrollTop > 40) {
      //   console.log('滚动条滚动')
      //   let timer = setInterval(() => {
      //     div.scrollTop - this.currentScrollTop > 0 ? div.scrollTop -= 1 : div.scrollTop += 1
      //     let sc = parseInt(div.scrollTop)
      //     // 如果当前滚动条的位置大于设定的滚动条的位置，则清除定时器
      //     if (sc === this.currentScrollTop) {
      //       clearInterval(timer)
      //     }
      //   }, 0.2)
      // }
    },
    // 播放时间的开始和结束
    curTime: function () {
      // 处理歌词位置及颜色
      if (this.lyr.length !== 0) {
        // 循环匹配歌词
        for (let i = 0; i < this.lyr.length; i++) {
          // 匹配歌词时间搓
          if (parseInt(this.curTime) === parseInt(this.lyr[i][0])) {
            // 限定歌词滚动高度
            this.currentScrollTop = this.scrollTop[i]
            // 去重处理
            if (!this.pauseAutoScroll && this.currentScrollTop === this.scrollTop[i]) {
              if (this.currentScrollTopCopy !== this.currentScrollTop) {
                // 获取歌词列表
                let $li = document.querySelectorAll('.has-lyric li')
                // 恢复歌词颜色和字体大小
                $li.forEach(function (item) {
                  item.style.color = 'black'
                  item.style.fontSize = '16px'
                })
                // 通过定时器设置滚动条的位置来实现过渡效果
                let timer = setInterval(() => {
                  let div = document.querySelector('.lyric-box')
                  div.scrollTop += 1
                  // 如果当前滚动条的位置大于设定的滚动条的位置，则清除定时器
                  if (div.scrollTop >= this.currentScrollTop) {
                    clearInterval(timer)
                  }
                }, 6)
                // 设置当前歌词的字体颜色和大小
                $li[i].style.color = '#ffa502'
                $li[i].style.fontSize = '20px'
              }
            }
          }
        }
      }
    },
    pauseAutoScroll: function (newVal, oldVal) {
      if (oldVal) {
        this.setScrollTopByTimer()
      }
    },
    currentScrollTop () {
      this.currentScrollTopCopy = this.currentScrollTop
    }
  },
  created () {
    this.lyr = this.lyric ? this.lyric : []
  },
  mounted () {
    this.getBGPic()
    this.setScrollTopByTimer()
  },
  methods: {
    // 动态定位滚动条位置
    setScrollTop () {

    },
    // 延时来实现滚动过渡效果
    setScrollTopByTimer () {
      let timer = setInterval(() => {
        let div = document.querySelector('.lyric-box')
        div.scrollTop - this.currentScrollTop > 0 ? div.scrollTop -= 1 : div.scrollTop += 1
        let sc = parseInt(div.scrollTop)
        // 如果当前滚动条的位置等于设定的滚动条的位置，则清除定时器
        if (sc === this.currentScrollTop) {
          clearInterval(timer)
        }
      }, 0.2)
    },
    // 获取背景图片
    getBGPic () {
      let bg = document.querySelector('.blur')
      bg.style.background = `url(${this.picUrl}) center`
      bg.style.backgroundSize = 'cover'
    },
    // 根据歌词数量设置滚动条的高度
    getScrollTopByLyrLen () {
      let scrollTopList = []
      let top = 40
      for (let i = 0; i < this.lyr.length; i++) {
        scrollTopList.push(top)
        top += 40
      }
      return scrollTopList
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '../assets/css/lyric.scss';
</style>
