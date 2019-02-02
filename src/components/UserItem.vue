<template>
    <div class="line" @click="toCard(item)">
        <div class="nomber pic">
            <span v-if="num>3">{{num}}</span>
            <span v-else :class="['pic'+num,'picImg']"></span>
            <img :src="item.icon" />
        </div>
        <div class="nick_name">{{item.nick_name}}</div>
        <!-- B50集资详情  -->
        <div class="money" v-if="$route.params.id == 'money'">{{item.all_money | parseFormatNum}} ￥</div>
        <div class="card" v-if="$route.params.id == 'money'">详情</div>
        <!-- B50集资详情弹窗 -->
        <Drawer v-model="MoneyBox" :closable="false" :title="item.nick_name">
            <div class="message" v-for="items in item.list">
                {{items.prodName}}<br> ￥ {{items.all_money | parseFormatNum}}
            </div>
        </Drawer>
        <!-- B50抽卡数据 -->
        <div class="money" v-if="$route.params.id == 'card'">{{item.cardNum}} / 48</div>
        <div class="card" v-if="$route.params.id == 'card' && item.cardNum">查卡</div>
        <div class="card" v-if="$route.params.id == 'card' && !item.cardNum">无卡</div>
        <!-- 五选集资 -->
        <div class="money" v-if="$route.params.id == 'five'">{{item.all_money | parseFormatNum}} ￥</div>
        <div class="card" v-if="$route.params.id == 'five' && item.hasGift">奖励查询</div>
        <div class="card" v-if="$route.params.id == 'five' && !item.hasGift">无奖励</div>
        <!-- 五选集资详情弹窗 -->
        <Drawer v-model="FiveBox" :closable="false">
            <div slot="header" class="header">
                <span>{{item.nick_name}}</span>
                <span>{{item.all_money | parseFormatNum}} ￥</span>
            </div>
            <div class="message" v-for="(items,i) in item.gift" :key="i" v-if="item.gift[i].length">
                <div class="title" v-if="!i">1.0奖励</div>
                <div class="title" v-if="i">2.0奖励</div>
                <div v-for="gift in items" class="gift">
                    <span>{{gift.name}}</span><span>{{gift.num}}</span>
                </div>
            </div>
        </Drawer>
        <!-- 生蛋集资  -->
        <div class="money" v-if="$route.params.id == 'birthday'">{{item.all_money | parseFormatNum}} ￥</div>
        <div class="card" v-if="$route.params.id == 'birthday'">详情</div>
        <!-- 生蛋集资弹窗  -->
        <Drawer v-model="Birthday" :closable="false" :title="item.nick_name">
            <div class="message money" v-for="items in item.money">
                <span>{{items.name}}</span><span>{{items.money | parseFormatNum}} ￥</span>
            </div>
        </Drawer>

    </div>
</template>
<script>
import {parseFormatNum} from '@/assets/js/filters'
export default {
    name: 'UserItem',
    filters:{
        parseFormatNum
    },
    props: {
        item: { // 数据对象
            type: Object
        },
        num: { // 排名
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            MoneyBox: false,
            FiveBox: false,
            Birthday: false
        }
    },
    methods: {
        toCard(item) {
            switch (this.$route.params.id) {
                case 'card':
                    if (!item.cardNum) {
                        return
                    }
                    this.$router.push({ name: 'cardList', params: { vid: item.vid } })
                    break;
                case 'money':
                    this.MoneyBox = true
                    this.FiveBox = false
                    this.Birthday = false
                    break;
                case 'five':
                    if (!item.hasGift) {
                        return
                    }
                    this.FiveBox = true
                    this.MoneyBox = false
                    this.Birthday = false
                    break;
                case 'birthday':
                    this.Birthday = true
                    this.MoneyBox = false
                    this.FiveBox = false
                    break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.header{
    @include flex;
    line-height: 2;
    font-size: px2rem(28);
    font-weight: bold;
}
.message {
    text-align: center;
    margin-bottom: px2rem(10);
    line-height: 1.8; 
    border-bottom: 1px solid $border1;
    // padding-bottom: px2rem(10);
    .title{
        border-bottom: 1px solid $border1;
        padding-top: px2rem(10);
        padding-bottom: px2rem(20);
    }
    .gift{
        @include flex;
        line-height: 2.5; 
    }
    &.money{
        @include flex;
    }
}

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
        span {
            margin-right: px2rem(20)
        }
    }
    .nick_name {
        @include textflow;
        flex: 1;
        margin-right: px2rem(10);
    }
    .money {
        width: px2rem(200);
        margin-right: px2rem(10);
        text-align: right;
    }
}
</style>
