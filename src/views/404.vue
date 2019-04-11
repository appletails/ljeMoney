<template>
  <div class="not">
    <img src="@/assets/img/404.png" alt>
    <p>亲~你请求的页面好像不存在哦~</p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.not {
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-55%);
  img {
    width: px2rem(400);
    position: relative;
    left: -12%;
    opacity: 0.8;
  }
  p {
    font-size: px2rem(28);
    margin-top: px2rem(40);
  }
}
</style>
