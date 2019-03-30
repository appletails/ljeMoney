<template>
  <div class="line">
      <span><Icon :type="icon" :size="'14'" class="icon"/>{{title}}</span>
      <slot name="more">
        <span>&nbsp;</span>
      </slot>
  </div>
</template>
<script>
export default {
    name:'TitlePhone',
    props:{
        title:{ // 标题
            type:String,
            default:'Line'
        },
        icon:{
            type:String,
            default:'md-pricetags'
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.line{
    @include flex;
    font-size: px2rem(24);
    border-bottom: 1px solid $border1;
    // margin-bottom: px2rem(20);
    background-color: #fff;
    color: $font2;
    span{
        @include flex;
        padding: px2rem(20) px2rem(20);
        .icon{
            margin-right: px2rem(10);
        }
    }
}
</style>
