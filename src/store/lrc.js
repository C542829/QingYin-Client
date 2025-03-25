const lrc = {
  state: {
    nowScrollTop: [] // 当前歌词滚动位置
  },
  getters: {
    nowScrollTop: state => {
      let nowScrollTop = state.nowScrollTop
      if (!nowScrollTop.length) {
        nowScrollTop = JSON.parse(window.sessionStorage.getItem('nowScrollTop') || null)
      }
      return nowScrollTop
    }
  },
  mutations: {
    setNowScrollTop: (state, nowScrollTop) => {
      state.nowScrollTop = nowScrollTop
      window.sessionStorage.setItem('nowScrollTop', JSON.stringify(nowScrollTop))
    }
  },
  actions: {}
}

export default lrc
