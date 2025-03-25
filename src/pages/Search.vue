<template>
  <div class="search">
    <div
      class="song-list-search">
      <searchSongs>
      </searchSongs>
    </div>
    <div
      class="songList-list-search">
      <searchSongLists>
      </searchSongLists>
    </div>
  </div>
</template>

<script>
import searchSongs from '../components/search/SearchSongs.vue'
import searchSongLists from '../components/search/SearchSongLists.vue'
import { mapGetters } from 'vuex'
import mixin from '../mixins'

export default {
  name: 'search',
  mixins: [mixin],
  components: {
    searchSongs,
    searchSongLists
  },
  data () {
    return {
      toggle: 'Songs',
      currentView: 'searchSongs'
    }
  },
  computed: {
    ...mapGetters(['searchword'])
  },
  watch: {
    searchword: function () {
      this.getSong()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/search.scss';
</style>
