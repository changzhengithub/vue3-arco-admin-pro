<template>
  <div class="index-swiper">
    <div class="swiper-btn">
      <a-space>
        <a-button @click="nextClick">后退</a-button>
        <a-button type="primary" @click="prevClick">前进</a-button>
      </a-space>
    </div>
    <swiper
      :modules="swiperModules"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      navigation
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <div class="swiper-item">
          <img src="@/assets/images/banner01.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item">
          <img src="@/assets/images/banner02.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item">
          <img src="@/assets/images/banner03.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-item">
          <img src="@/assets/images/banner04.png" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts" name="SwiperExample">
/**
 * @desc 轮播图
 * 使用swiper最新版结合Vue3写法，和Vue2写法有很大差别，全部放到swiper写
 * API地址：https://swiperjs.com/vue
 * @author changz
 * */

import { ref } from 'vue'
// import useGlobalProperties from '@/hooks/globalProperties'
// const { global } = useGlobalProperties()

// 引入swiper
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/vue' // 核心组件
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules' // 引入模块
import type { Swiper as SwiperInstance } from 'swiper/types'

// 实例
const swiperInstance = ref<SwiperInstance>()
// 模块列表
const swiperModules = [Autoplay, Navigation, Pagination, A11y]

const onSwiper = (swiper: SwiperInstance) => {
  swiperInstance.value = swiper
  console.log(swiperInstance.value)
}
const onSlideChange = () => {
  console.log('slide change')
}

const prevClick = () => {
  swiperInstance.value?.slideNext()
}
const nextClick = () => {
  swiperInstance.value?.slidePrev()
}
</script>

<style lang="less" scoped>
  .index-swiper {
    width: 100%;
    .swiper-btn {
      width: 100%;
      margin-bottom: 10px;
    }
    .swiper {
      width: 100%;
      height: 500px;
    }
    .swiper-item {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>