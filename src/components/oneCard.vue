<template>
    <!-- 每日一语 -->
    <Layout class="btm">
        <Header v-if="types" class="date">
            {{item.date.year}}年{{item.date.month}}月{{item.date.date}}日
        </Header>
        <div class="chicken_soup">
            <div class="img">
                <img :src="item.image_small" alt="img" />
            </div>
            <div class="say">
                {{item.content}}
            </div>
        </div>
    </Layout>
</template>
<script>
export default {
    name: 'oneCard',
    props: {
        item: Object,
        types: { // 是否显示日期，首页不显示日期
            type: Boolean,
            default: true
        }
    }
}
</script>
<style lang="scss" scoped="">
@import '@/assets/css/global.scss';
// 每日一句
.date {
    margin: px2rem(20) 0 px2rem(10);
    color: $font3;
    height: auto;
    line-height: inherit;
    background-color: transparent;
}

.btm {
    .chicken_soup {
        width: 100%;
        background-color: #fff;
        border-radius: 4px;
        padding: px2rem(18);
        @include flex;
        @include Card;
        justify-content: left;
        .img {
            margin-right: px2rem(20);
            flex-basis: auto !important;
            background-color: #fff;
            img {
                border-radius: 4px;
                display: block;
                width: px2rem(120)
            }
        }
        .say {
            @include flex;
            flex: 1;
            font-size: px2rem(24);
            color: $font2;
            align-content: center;
            background-color: #fff;
        }
    }
}
</style>

