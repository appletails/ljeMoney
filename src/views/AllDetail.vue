<template>
    <div>
        <div class="item___box">
            <Item v-for="(item,i) in AllDetail" :key="i" :item="item"/>
        </div>
    </div>
</template>
<script>
import Item from '@/components/Item'
import { getAllDetail } from '@/assets/js/api'
export default {
    components: {
        Item
    },
    data() {
        return {
            AllDetail: []
        }
    },
    async created() {
        // 获取全部集资项目
        let result = await getAllDetail()
        this.AllDetail = result
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
</style>
