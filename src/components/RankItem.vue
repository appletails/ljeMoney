<template>
    <div class="line">
        <div class="nomber pic">
            <span v-if="num>3">{{num}}</span>
            <span v-else :class="['pic'+num,'picImg']"></span>
            <img :src="item.icon" />
        </div>
        <div class="nick_name">{{item.nickname}}</div>
        <div class="money" v-if="!types">{{item.back_money}} ￥</div>
        <div class="money" v-else>{{item.back_days}} 天</div>
    </div>
</template>
<script>
export default {
    name: 'RankItem',
    props: {
        item: { // 数据对象
            type: Object
        },
        num: { // 排名
            type: Number,
            default: 1
        },
        types: { // 0是集资榜 1是打卡榜
            type: Number,
            default: 0
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.line {
    @include flex;
    @include Card;
    height: px2rem(100);
    padding: px2rem(20);
    border-radius: px2rem(8);
    margin-bottom: px2rem(20);
    &:last-of-type {
        margin-bottom: 0;
    }
    .nomber {
        // width: px2rem(200);
        margin-right: px2rem(20);
        height: 100%;
        @include flex;
        .picImg {
            width: px2rem(30);
            height: 100%;
            background-size: 90%;
            background-position: left center;
            background-repeat: no-repeat;
        }
        .pic1 {
            background-image: url(https://s.moimg.net/img/web4-0/wds_project/gold@2x.png);
        }
        .pic2 {
            background-image: url(https://s.moimg.net/img/web4-0/wds_project/silver@2x.png);
        }
        .pic3 {
            background-image: url(https://s.moimg.net/img/web4-0/wds_project/bronze@2x.png);
        }
        img {
            width: px2rem(60);
            height: px2rem(60);
            border-radius: px2rem(8); // display: block;
        }
        span{
            margin-right: px2rem(20)
        }
    }
    .nick_name {
        @include textflow;
        flex: 1;
        margin-right: px2rem(10);
    }
    .money {
        width: px2rem(140);
        margin-right: px2rem(10);
        text-align: right;
    }
}
</style>
