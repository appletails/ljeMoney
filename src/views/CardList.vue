<template>
	<div>
		<Collapse simple value="0">
			<Panel class="card_title" v-for="(items,i) in level" :key="i" :name="i.toString()" :style="{backgroundColor:items.bgColor,borderColor:items.bgColor}" v-if="JSON.stringify(card[i]) != '[]'">
				<span>{{items.level}}</span>
				<span class="flex1"></span>
				<span>{{card[i] | nums}} / {{items.num}}</span>
				<div slot="content" class="img_box">
					<Card v-for="(item,index) in card[i]" :key="index" class="mag_bt" :padding="6" :style="{border:'1px solid ' + items.bgColor}">
						<img :src="'http://www.crean.top/img/card/lje/' + item + '.jpg'" @click="showTime(item)" />
						<span>{{item}}</span>
					</Card>
					<div></div>
					<div></div>
				</div>
			</Panel>
		</Collapse>
		<!-- 弹窗 -->
		<transition name="winShow">
			<div v-if="srcShow.type" class="bg_box" @click="srcShow.type = false" @touchmove.prevent>
				<div class="img_show">
					<img v-if="srcShow.src" :src="'http://www.crean.top/img/card/lje/' + srcShow.src + '.jpg'" />
					<p>{{srcShow.src}}：{{srcShow.cardMsg}}</p>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import { getCardSix, getCardChance } from '@/assets/js/api'
export default {
	filters: {
		nums(item) {
			if (!item) return;
			let num = 0
			num = item.length
			return num
		}
	},
	data() {
		return {
			// 卡册列表
			card: [
				// [],[],[],[]
			],
			// 弹窗
			srcShow: {
				src: "",
				cardMsg:"",
				type:false
			},
			level: [
				{
					level: "一星卡",
					bgColor: "#cccccc",
					num: 24
				},
				{
					level: "二星卡",
					bgColor: "#a9cbdb",
					num: 11
				},
				{
					level: "三星卡",
					bgColor: "#c0a7c6",
					num: 8
				},
				{
					level: "四星卡",
					bgColor: "#f79f4f",
					num: 5
				}
			]
		}
	},
	methods: {
		async showTime(value) {
			let msgList = await getCardChance()
			this.srcShow.src = value
			this.srcShow.cardMsg = msgList.filter( item =>{
				if(item[0] == value){
					return item[1]
				}
			})[0][1]
			this.srcShow.type = true
		}
	},
	async created() {
		var vid = this.$route.params.vid
		let result = await getCardSix()
		this.card = result.filter(item => {
			return item.vid == vid
		})[0].hasCard
		this.chance = await getCardChance()
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';

/* 弹窗 */

.bg_box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999990;
	background-color: rgba(0, 0, 0, 0.7);
	width: 100%;
	height: 100%;
	opacity: 1;
	transform: scale(1);
	.img_show {
		position: absolute;
		top: 50%;
		width: 80%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		img{
			border-radius: px2rem(10);
			width: 100%;
		}
		p{
			color: #fff;
			padding: px2rem(10);
		}
	}
}

.flex1 {
	flex: 1;
}

.card_title {
	margin: px2rem(15);
	border-radius: px2rem(8);
	border: 1px solid #fff;
	.img_box {
		@include flex;
		justify-content: space-between;
		padding: 0 px2rem(10);
		&>div {
			width: px2rem(178);
		}
		.mag_bt {
			width: px2rem((750-30)/4);
			margin-top: px2rem(32);
			text-align: center;
			img {
				display: block;
				width: 100%;
				border-radius: 2px;
				margin-bottom: px2rem(10);
			}
			span {
				color: $font2;
			}
		}
	}
}
</style>