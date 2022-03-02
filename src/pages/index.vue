<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">

      </div>

      <div class="ads-box"></div>
      <div class="banner"></div>
      <div class="product-box"></div>
    </div>
    <servicebar></servicebar>
  </div>
</template>
<script>



import servicebar from '../components/servicebar.vue'

export default {
  name: 'index',
  components: {
    servicebar,

  }, setup () {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
}
</script>

<style>
</style>