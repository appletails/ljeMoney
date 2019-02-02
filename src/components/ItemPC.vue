<template>
  <a :href="'https://zhongchou.modian.com/item/'+item.id+'.html'" target="_blank">
    <Layout class="item_box">
      <Content class="top" :style="{'background-image':'url('+item.logo_4x3+')'}">
        <div class="peice"></div>
      </Content>
      <div class="circle"><p :style="{'width':widths}" :class="item.status == '众筹中'?'':'gray'"></p></div> 
      <div class="circle_bg">{{price | numToFixed}}</div> 
      <Content class="foot">
        <div class="title">{{item.name}}</div>
        <div class="cont">
          <p>进度：{{item.backer_money}}￥ / {{item.install_money}}￥</p>
          <p>参与人数：{{item.backer_count}}</p>
        </div>
      </Content>
    </Layout>
  </a>
</template>
<script>
export default {
  name: 'Item-PC',
  props:{
    item:Object
  },
  data() {
    return {
    }
  },
  computed:{
    price(){
      let price = parseFloat(this.item.backer_money)/parseFloat(this.item.install_money)
      return price
    },
    widths(){
      let wid = this.price*210 + 'px'
      return wid
    }
  }
}
</script>
<style lang="scss" scoped=''>
@import '../assets/css/global.scss';
.ivu-layout-content {
  height: 50%;
  overflow: hidden;
  background-color: #fff;
}
a{
  margin: 10px;
}
.item_box {
  flex: none;
  width: 210px;
  height: 266px;
  position: relative;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  .top {
    @include bgImg;
  }
  .circle {
    @include absolute;
    width: 100%;
    height: 4px;
    background-color: $Disabled;
    overflow: hidden;
    p{
      position: absolute;
      background-color: $Primary;
      left: 0;
      top: 0;
      height: 100%;
    }
    .gray{
      background-color: $border1;
    }
  }
  .circle_bg{
    @include absolute;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    border: #fff solid 4px;
    background-color: $Primary;
    color: #fff;
    line-height: 56px;
    text-align: center;
    font-size: 12px;
  }
  .foot{
    padding: 36px 10px 10px;
    .title{
      font-size: 14px;
      font-weight: bold;
      color: $Title;
      margin-bottom: 2px;
      height: 45px;
    }
    .cont{
      font-size: 12px;
      color: $Cont;
    }
  }
}
</style>