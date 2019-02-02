<template>
  <div>
    <div class="footMax">
      <p v-if="$route.name=='koudai'">感谢
        <a href="https://weibo.com/flowerdb" target="_blank" class="url">@FlowerDb</a>提供的接口和的技术指导</p>
      <p v-else>
        <!-- 敬请期待... -->
        <span @click="$router.push('/koudai')">口袋敏感词检测</span>
      </p>
    </div>
    <div class="h90"></div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
  }
}
</script>
<style lang="scss" scoped="">
@import '@/assets/css/global.scss';



/* 底部开始 */

.footMax {
  height: px2rem(90);
  max-height: 50px;
  border-top: 1px solid $border1;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.url {
	background-color: $Primary;
	color: #fff;
	padding: 0 px2rem(10);
	margin: 0 px2rem(10);
}

/* 底部结束 */
</style>