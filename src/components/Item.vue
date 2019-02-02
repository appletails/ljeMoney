<template>
  <Layout class="max_box">
    <router-link :to="{name:'rank',params:{id:item.id}}">
      <Header class="title">
        <span>{{item.name}}</span>
        <span :class="['money',item.status == '众筹中'?'':'gray']">{{item.backer_money | parseFormatNum}} ￥</span>
      </Header>
      <Footer class="circle_bg">
        <p :style="{'width':widths}" :class="item.status == '众筹中'?'':'gray'"></p>
      </Footer>
      <Layout class="item_box">
        <Sider hide-trigger class="top" width="110" :style="{'background-image':'url('+item.logo+')'}">
        </Sider>
        <Content class="foot">
          <div class="cont">
            <p>进度：{{item.backer_money}}￥ / {{item.install_money}}￥</p>
            <p>参与人数：{{item.backer_count}}</p>
          </div>
        </Content>
      </Layout>
    </router-link>
  </Layout>
</template>
<script>
import { parseFormatNum } from '@/assets/js/filters'
export default {
  name: 'Item',
  props: {
    item: Object
  },
  filters:{
    parseFormatNum
  },
  data() {
    return {
    }
  },
  computed: {
    widths() {
      let wid = parseFloat(this.item.backer_money) / parseFloat(this.item.install_money) * 100 + '%'
      return wid
    }
  }
}
</script>
<style lang="scss" scoped=''>
@import '@/assets/css/global.scss';
a {
  display: block;
}

.max_box {
  @include Card;
  margin-bottom: px2rem(20);
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  .item_box {
    // height: 50px;
    background: #fff;
    .top {
      @include bgImg;
    }
    .foot {
      padding: px2rem(16);
      @include flex;
      .cont {
        font-size: px2rem(24);
        color: $font3;
      }
    }
  }
  .circle_bg {
    height: 3px;
    width: 100%;
    background-color: $border1;
    top: 100%;
    padding: 0;
    p {
      height: 100%;
      background-color: $Primary;
    }
    .gray {
      background-color: $font4;
    }
  }
  .title {
    color: $font2;
    font-size: px2rem(24);
    background: #fff;
    height: auto;
    line-height: normal;
    padding: px2rem(16);
    text-align: center;
    @include flex;
    span {
      @include textflow;
      max-width: px2rem(440);
    }
    .money {
      background-color: $Primary;
      padding: px2rem(10) px2rem(20);
      border-radius: 4px;
      color: #fff;
      max-width: px2rem(200);
    }
    .gray {
      background-color: $font4;
    }
  }
}
</style>