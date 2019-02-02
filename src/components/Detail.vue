<template>
    <Layout class="max_box">
        <Header class="title">
            <span>{{detail.name}}</span>
            <span class="money">{{detail.backer_money}} ￥</span>
        </Header>
        <Footer class="circle_bg">
            <p :style="{'width':widths}"></p>
        </Footer>
        <Layout class="item_box">
            <Sider hide-trigger class="top" width="110" :style="{'background-image':'url('+detail.logo+')'}">
            </Sider>
            <Content class="foot">
                <div class="cont">
                    <p>目标：{{detail.install_money}}￥</p>
                    <p>参与人数：{{detail.backer_count}}</p>
                </div>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
export default {
    name: 'detail',
    props: {
        detail: {
            type: Object
        }
    },
    computed: {
        widths() {
            let wid = parseFloat(this.detail.backer_money) / parseFloat(this.detail.install_money) * 100 + '%'
            return wid
        }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.max_box {
    @include Card;
    margin: px2rem(20) 0;
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
                color: $font2;
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
        span{
            @include textflow;
        }
        .money{
            background-color: $Primary;
            padding: px2rem(10) px2rem(20);
            border-radius: 4px;
            color: #fff;
        }
    }
}
</style>
