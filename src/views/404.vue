<template>
  <div class="not">
    <div class="box">
      <img src="@/assets/img/404.png" alt>
      <p>亲~你请求的页面好像不存在哦~</p>
      <Button type="info" @click="$router.push('/')">返回首页</Button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.not {
  position: fixed;
  height: 100%;
  width: 100%;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-55%);
    width: 100%;
    text-align: center;
    img {
      width: px2rem(400);
      position: relative;
      left: -6%;
      opacity: 0.8;
    }
    p {
      font-size: px2rem(28);
      margin-top: px2rem(40);
    }
    button {
      margin-top: px2rem(40);
      width: px2rem(300);
      line-height: px2rem(70);
    }
  }
}
</style>
