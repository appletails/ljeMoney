<template>
    <div>
        <a href="https://weibo.com/u/5863012981" target="_blank">
            <div class="banner"></div>
        </a>
        <TitlePhone :title="'快速入口'" :icon="'md-bookmarks'" class="topTitle">
            <span slot="more" @click="$router.push('/more')">
                <Icon type="ios-more" size="16" />
            </span>
        </TitlePhone>
        <div class="item___box nav">
            <router-link class="line" :to="{name:$Project[0].list[0].name,params:$Project[0].list[0].params}">
                <p>{{$Project[0].list[0].title}}</p>
            </router-link>
            <router-link class="line" :to="{name:$Project[0].list[1].name,params:$Project[0].list[1].params}">
                <p>{{$Project[0].list[1].title}}</p>
            </router-link>
            <router-link class="line" :to="{name:$Project[1].list[0].name,params:$Project[1].list[0].params}">
                <p>{{$Project[1].list[0].title}}</p>
            </router-link>
            <router-link class="line pink" :to="{name:'more'}">
                More
            </router-link>
        </div>
        <TitlePhone :title="'每日一语'">
            <span slot="more" @click="$router.push('/sweet')">
                <Icon type="ios-more" size="16" />
            </span>
        </TitlePhone>
        <div class="item___box">
            <OneCard :item="soupsDate" :types="false" @click.native="toSoup(soupsDate.id)" />
        </div>
        <TitlePhone :title="'集资项目'" :icon="'md-clipboard'">
            <span slot="more" @click="$router.push('/allDetail')">
                <Icon type="ios-more" size="16" />
            </span>
        </TitlePhone>
        <div class="loading" v-if="load">
            <Icon type="ios-loading" size="18" class="demo-spin-icon-load" :color="'#5cadff'"></Icon>
        </div>
        <div class="item___box" v-else>
            <Item v-for="(item,i) in AllDetail" :key="i" :item="item" v-if="i<5" />
        </div>
    </div>
</template>
<script>
import TitlePhone from '@/components/TitlePhone'
import Item from '@/components/Item'
import OneCard from '@/components/oneCard'
import { getAllDetail, soups } from '@/assets/js/api'
export default {
    components: {
        TitlePhone,
        Item,
        OneCard
    },
    data() {
        return {
            soupsDate: {}, // 当前每日一语的内容
            load: false //load的状态
        }
    },
    methods: {
        toSoup: function(id) {
            this.$router.push({ path: '/sweet' })
            return
            // 若需要点击显示删除上面两行
            if (document.body.clientWidth >= 1100) {
                return
            }
            // 新建Img用来判断图片是否已加载
            var img = new Image();
            img.src = this.soupsDate.image_large
            var _this = this
            // 打开loading
            if (img.complete) {
                // console.log('该图片已经存在于缓存之中，不会再去重新下载');
                this.$router.push({ path: '/sweet', query: { id: id } })
            } else {
                // console.log('图片不存在缓存之中');
                img.onload = function() {
                    // console.log("下载完成")
                    _this.$router.push({ path: '/sweet', query: { id: id } })
                }
            }
        }
    },
    async created() {
        // 获取每日一语
        var resultSoups = await soups()
        this.soupsDate = resultSoups[0]
        this.load = true
        // 获取全部集资项目
        let result = await getAllDetail()
        this.$store.commit("DETAIL",result);
        this.load = false
    },
    computed:{
        AllDetail(){
            return this.$store.state.AllDetail
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.banner {
    width: 100%;
    height: px2rem(300);
    background-image: url(http://www.crean.top/img/banner1.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: $Primary;
}

.more {
    text-align: center;
    line-height: px2rem(80);
}

.loading {
    text-align: center;
    line-height: px2rem(100);
}

.nav {
    @include flex;
    .line {
        @include flex;
        justify-content: center;
        height: px2rem(170);
        background-color: $Primary;
        width: px2rem(170);
        color: #fff;
        border-radius: 50%; // padding: px2rem(20);
        font-size: px2rem(24);
        text-align: center;
        p {
            width: 80%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        &.pink {
            background-color: $pink;
        }
    }
}
</style>
