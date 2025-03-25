const songList = {
  state: {
    songList: [] // 当前歌单列表
  },
  getters: {
    songList: state => {
      let songList = state.songList
      if (!songList.length) {
        songList = JSON.parse(window.sessionStorage.getItem('songList') || null)
      }
      return songList
    }
  },
  mutations: {
    setSongList: (state, songList) => {
      state.songList = songList
      window.sessionStorage.setItem('songList', JSON.stringify(songList))
    }
  },
  actions: {}
}

export default songList
