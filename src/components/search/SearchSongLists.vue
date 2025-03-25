<template>
  <div class="search-song-Lists">
    <song-list-transverse :contentList="songList" path="song-list-album">
      <template slot="title">搜索到的歌单</template>
    </song-list-transverse>
  </div>
</template>

<script>
import SongListTransverse from "../SongListTransverse";
import mixin from "../../mixins";
import { mapGetters } from "vuex";

export default {
  name: "search-song-Lists",
  mixins: [mixin],
  components: {
    SongListTransverse
  },
  computed: {
    ...mapGetters(["songList"])
  },
  data() {
    return {
      albumDatas: []
    };
  },
  mounted() {
    this.getSongList();
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/search-song-Lists.scss";
</style>
