<template>
  <div class="swiper">
    <div class="swiper-container">
      <el-carousel :interval="4000" type="card" height="180px">
        <el-carousel-item v-for="(item, index) in swiperList" :key="index">
          <img :src="item.picImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiper',
  props: {
    swiperList: Array
  },
  mounted () {
    document.querySelector('.swiper-container .el-carousel__indicators--outside').style.marginLeft = '0px !important'
    document.querySelector('.swiper-container .el-carousel__indicators').style.marginLeft = '0px !important'
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/swiper.scss';
</style>
