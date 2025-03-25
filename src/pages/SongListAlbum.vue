<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src=attachImageUrl(singers.pic) alt="图片暂时没法加载">
      </div>
      <div class="album-info">
        <h2>简介：</h2>
        <span>{{singers.introduction}}</span>
      </div>
    </div>
    <div class="album-content">
      <div class="songs-body">
        <album-content :songList="listOfSongs">
          <template slot="title">{{singers.title}}</template>
        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin from '../mixins'
import AlbumContent from '../components/AlbumContent'
import { getSongOfId, getListSongOfSongId } from '../api/index'

export default {
  name: 'song-list-album',
  mixins: [mixin],
  components: {
    AlbumContent
  },
  data () {
    return {
      songLists: [],
      singers: {},
      // count: 0, // 点赞数
      songListId: '', // 歌单ID
      value3: 0,
      value5: 0
    }
  },
  computed: {
    ...mapGetters([
      'loginIn', // 登录标识
      'tempList', // 单个歌单信息
      'listOfSongs', // 存放的音乐
      'userId', // 用户ID
      'avator' // 用户头像
    ])
  },
  created () {
    this.songListId = this.tempList.id // 给歌单ID赋值
    this.singers = this.tempList
    this.getSongId() // 获取歌单里面的歌曲ID
  },
  methods: {
    // 收集歌单里面的歌曲
    getSongId () {
      getListSongOfSongId(this.songListId)
        .then(res => {
          // 获取歌单里的歌曲信息
          for (let item of res) {
            this.getSongList(item.songId)
          }
          this.$store.commit('setListOfSongs', this.songLists)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取歌单里的歌曲
    getSongList (id) {
      getSongOfId(id)
        .then(res => {
          this.songLists.push(res[0])
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list-album.scss';
</style>
