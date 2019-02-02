<template>
  <div class="box">
    <div class="topMax">
      <slot name="left">
        <p class="left" v-if="$route.name != 'home'">
          <Icon type="ios-arrow-back" size="24" @click="$router.go(-1)" />
        </p>
      </slot>
      <slot name="title">
        <img  v-if="$route.name == 'home'" class="logo" src="../assets/img/logo.png" alt="logo" />
        <p :class="['title',$route.name == 'home'?'lefts':'']">{{title}}</p>
      </slot>
      <slot name="right">
        <p class="right">
          <span class="money" v-if="$route.name == 'home'">累计：{{allMoney | parseFormatNum}} ￥</span>
          <img v-else class="logo" src="../assets/img/logo.png" alt="logo" @click="$router.push('/')"/>
        </p>
      </slot>
    </div>
    <div class="h90"></div>
  </div>
</template>

<script>
import { getAllDetail } from '@/assets/js/api'
import { parseFormatNum } from '@/assets/js/filters'
export default {
  name: 'Head',
  filters: {
    parseFormatNum
  },
  props: {
    title: {
      type: String,
      default: '恩の金库'
    }
  },
  data() {
    return {
      data: []
    }
  },
  computed: {
    allMoney: function() {
      let money = 0
      this.$store.state.AllDetail.map(item => {
        money += parseFloat(item.backer_money)
      })
      return money
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.topMax {
  border-bottom: 1px solid $border1;
  padding: 0 px2rem(20);
  width: 100%;
  background-color: #fff;
  z-index: 100;
  height: px2rem(90);
  @include flex;
  img {
    height: px2rem(60);
    width: px2rem(60);
    border-radius: 50%;
    border: 1px solid $border2;
    overflow: hidden;
    display: block;
  }
  .logo {
    margin-right: px2rem(10);
  }
  p {
    color: $font2;
    font-size: px2rem(28);
    &.left {
      flex: 1;
      color: $font2;
      .left_icon {
        // background-image: url(../../static/img/icon/left.svg);
        background-size: auto px2rem(50);
        background-position: left center;
        background-repeat: no-repeat;
        display: block;
        height: px2rem(90);
      }
    }
    &.title {
      flex: 1;
      text-align: center;
      max-width: 70%;
      font-size: px2rem(28);
      color: $font1;
      &.lefts {
        text-align: left;
      }
    }
    &.right {
      flex: 1;
      text-align: right;
      img {
        float: right;
        margin-right: 0;
      }
      .money {
        background-color: $Primary;
        padding: px2rem(8) px2rem(14);
        border-radius: 4px;
        color: #fff;
        font-size: px2rem(20);
      }
    }
  }
}
/* 头部结束 */
</style>