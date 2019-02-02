<template>
	<div class="cardBox">
		<div class="item___box">
			<OneCard v-for="item in soupsDate" :key="item.id" :item="item" @click.native="soupBox(item.id)" />
		</div>
		<transition name="winShow">
			<div class="soup_box" v-show="boxShow" @click="closeBox" @touchmove.prevent>
				<img :src="soup_box.image_large" alt="每日一语" ref="img1" />
				<div class="tips_content">
					<div class="days">
						<div class="day">{{soup_box.date.date}}</div>
						<div class="year">{{soup_box.date.year}}年{{soup_box.date.month}}月</div>
						<div class="text">
							<span>{{soup_box.content}}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<Icon type="ios-loading" size="18" class="demo-spin-icon-load loading" v-if="loading"></Icon>
	</div>
</template>
<script>
import OneCard from '@/components/oneCard'
import { soups } from '@/assets/js/api'
export default {
	components: {
		OneCard
	},
	data() {
		return {
			soupsDate: [], //全部的每日一语
			boxShow: false, // 弹出层的显示状态
			soup_box: { // 弹出层的内容详情
				image_large: "",
				date: {
					year: "",
					month: "",
					date: ""
				}
			},
			loading: false // 图片加载的loading状态
		}
	},
	methods: {
		// 显示遮罩层
		soupBox: function(id) {
			// 过滤出前需要的对象
			this.soup_box = this.soupsDate.filter(item => item.id == id)[0]
			// 新建Img用来判断图片是否已加载
			var img = new Image();
			img.src = this.soup_box.image_large
			var _this = this
			// 打开loading
			this.loading = true
			if (img.complete) {
				// console.log('该图片已经存在于缓存之中，不会再去重新下载');
				_this.loading = false
				_this.boxShow = true
			} else {
				// console.log('图片不存在缓存之中');
				this.$refs.img1.onload = function() {
					_this.loading = false
					_this.boxShow = true
				}
			}
			this.stop()
		},
		// 关闭遮罩层
		closeBox: function() {
			var id = this.$route.query.id
			if (id) {
				this.$router.push('/sweet')
			}
			this.boxShow = false
			this.move()
		},
		/***滑动限制***/
		stop() {
			var mo = function(e) { e.preventDefault(); };
			document.body.style.overflow = 'hidden';
			document.addEventListener("touchmove", mo, false);//禁止页面滑动
		},
		/***取消滑动限制***/
		move() {
			var mo = function(e) { e.preventDefault(); };
			document.body.style.overflow = '';//出现滚动条
			document.removeEventListener("touchmove", mo, false);
		}
	},
	async created() {
		// 获取全部的每日一语
		this.soupsDate = await soups()
	}
}
</script>
<style lang="scss" scoped="">
@import '@/assets/css/global.scss';
.item___box {
	padding-top: 0;
}

.soup_box {
	padding: 0;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	z-index: 105;
	img {
		position: absolute;
		width: 100%;
		min-height: 100%;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}
	.tips_content {
		height: auto;
		bottom: px2rem(100);
		left: 0;
		position: absolute;
		padding: 0 px2rem(60);
		width: 100%;
		.days {
			.day {
				color: #fff;
				font-family: HelveticaUltra;
				font-size: px2rem(120);
				line-height: px2rem(120);
				text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
			}
			.year {
				font-size: px2rem(42);
				color: #fff;
				font-family: HelveticaThin;
				line-height: px2rem(42);
				text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
			}
			.text {
				color: #fff;
				font-size: px2rem(30);
				line-height: px2rem(50);
				margin-top: px2rem(30);
				text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
			}
		}
	}
}

.loading {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	z-index: 100;
}
</style>