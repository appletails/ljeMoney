<template>
    <div>
        <div class="item___box">
            <Detail :detail="detail"/>
            <div class="nav">
                <p :class="[types?'':'active']" @click="change(0)">集资榜</p>
                <p :class="[types?'active':'']" @click="change(1)">打卡榜</p>
            </div>
            <RankItem v-for="(item,i) in data" :key="i" :item="item" :num="i+1" :types="types" />
        </div>
        <div class="more" @click="more">{{hasMore.title}}</div>
    </div>
</template>
<script>
import Detail from "@/components/Detail"
import RankItem from "@/components/rankItem"
import { getRankings, getAllDetail } from "@/assets/js/api"
export default {
    components: {
        RankItem,
        Detail
    },
    data() {
        return {
            data: [], // 集资榜或者打卡榜的 list
            types: 0, // 显示的是集资还是打卡
            index: 0, // 当前显示的第几页，每一页index+200=
            hasMore: {
                has: true, // 是否还有更多数据
                title: "加载更多..."
            },
            detail: {} // 当前项目的详情
        }
    },
    methods: {
        // 获取榜单
        async getRank(id) {
            // 通过id获取当前集资项目的详情
            let result = await getRankings(id, this.index, this.types)
            this.data = result
        },
        // 获取更多
        async more() {
            // 判断是否还有更多
            if (!this.hasMore.has) { return }
            let id = this.$route.params.id
            // 下一页增加20条数据
            this.index += 20
            let result = await getRankings(id, this.index, this.types)
            // 如果数据为空或是为null则没有数据
            if (result == null || !result.length ) {
                this.hasMore.has = false
                this.hasMore.title = "没有更多了"
                return
            }
            // 拼接list
            this.data = this.data.concat(result)

        },
        // 切换显示
        async change(num){
            // 当前点击是否与显示相同
            if(this.types == num){
                return
            }
            let id = this.$route.params.id
            // 切换显示重置页数
            this.types = num
            this.index = 0
            let result = await getRankings(id, this.index, this.types)
            this.data = result
            this.hasMore.has = true
            this.hasMore.title = "加载更多..."
        }
    },
    async created() {
        let id = this.$route.params.id
        this.getRank(id)
        let result = await getAllDetail()
        // 过滤出当前显示的内容
        this.detail = result.filter(item => item.id == id)[0]
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.nav{
    @include flex;
    line-height: px2rem(80);
    margin-bottom: px2rem(20);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
    p{
        border-bottom: 1px solid $border1;
        text-align-last: center;
        flex: 1;
        background-color: #fff;
    }
    .active{
        border-bottom: 1px solid $Primary;
        background-color: $Primary;
        color: #fff;
    }
}
.more {
    text-align: center;
    line-height: px2rem(80);
}
</style>
