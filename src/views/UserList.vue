<template>
    <div>
        <TitlePhone :title="names.title"/>
        <div class="item___box">
            <UserItem v-for="(item,i) in list" :key="i" :item="item" :num="i+1"/>
        </div>
    </div>
</template>
<script>
import UserItem from '@/components/UserItem'
import TitlePhone from '@/components/TitlePhone'
import { getUserFive, getBirthday, getUserSix, getCardSix } from '@/assets/js/api'
export default {
    components: {
        UserItem,
        TitlePhone
    },
    data() {
        return {
            names:{},
            list:[]
        }
    },
    async created(){
        switch (this.$route.params.id) {
            case 'card':
                this.list = await getCardSix()
                this.names = this.$Project[0].list[1]
                break;
            case 'money':
                this.list = await getUserSix()
                this.names = this.$Project[0].list[0]
                break;
            case 'five':
                this.list = await getUserFive()
                this.names = this.$Project[1].list[0]
                break;
            case 'birthday':
                this.list = await getBirthday()
                this.names = this.$Project[1].list[1]
                break;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
</style>
