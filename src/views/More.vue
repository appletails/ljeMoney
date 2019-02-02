<template>
    <div>
        <div v-for="(item,i) in $Project">
            <TitlePhone :title="item.title" />
            <div class="item___box nav">
                <router-link class="item" v-for="(items,i) in item.list" :key="i" :to="{name:items.name,params:items.params}" :style="{'background-color':item.bgc}">
                    <p>{{items.title}}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import TitlePhone from '@/components/TitlePhone'
export default {
    components: {
        TitlePhone
    },
    data() {
        return {
        }
    },
    async created() {
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.nav {
    @include flex;
    .item {
        @include flex;
        justify-content: center;
        height: px2rem(170);
        background-color: $Primary;
        width: 49%;
        color: #fff;
        border-radius: 4px;
        font-size: px2rem(24);
        text-align: center;
    }
}
</style>
