<template>
	<div>
		<div class="side"></div>
		<div class="Pc_box">
			<Input v-model="cont" type="textarea" placeholder="请输入待检测的内容：" :autosize="{minRows: 5}" class="textarea" />
			<div class="word_num">
				<p>输入字数：{{cont.length}}/200</p>
				<div style="flex:1;"></div>
				<Button @click="wordResult" type="error" class="none">清空</Button>
				<Button @click="copyTxt(cont)" type="info" class="none">复制</Button>
			</div>
			<Button @click="wordTest" type="info" class="btu">检测</Button>
			<div class="listBox">
				<p class="line">敏感字：</p>
				<p v-if="list.length" v-html="box"></p>
				<p v-else>暂无敏感词1</p>
			</div>
		</div>
	</div>
</template>
<script>
import { koudai } from '@/assets/js/api'
export default {
	data() {
		return {
			cont: "",
			list: [],
			box: ''
		}
	},
	methods: {
		copyTxt(value) {
			if (!this.cont.length) {
				this.$Modal.info({
					title: '提示',
					content: '你什么都没打复制个屁啊'
				});
				return
			}
			var _input = document.createElement("input");     // 直接构建input
			_input.value = value;   // 设置内容
			document.body.appendChild(_input);        // 添加临时实例
			_input.select();      // 选择实例内容
			document.execCommand("Copy");     // 执行复制
			document.body.removeChild(_input);  // 删除临时实例
			this.$Modal.info({
				title: '提示',
				content: '已复制到剪切板'
			});
		},
		wordResult: function() {
			this.$Modal.confirm({
				title: "警告",
				content: "<p>清空了自己重打的啊</p>",
				okText: "清空",
				onOk: () => {
					this.cont = ''
					this.list = []
				}
			});
		},
		wordTest: function() {
			if (!this.cont.length) {
				this.$Modal.info({
					title: '提示',
					content: '你什么都没打测个屁啊'
				});
				return
			}
			koudai(this.cont).then(value => {
				var result = value.data
				if (!result.list.length) {
					this.$Modal.info({
						title: "提示",
						content: "牛逼啊，竟然没有违禁词"
					});
					return
				}
				this.list = result.list
				this.box = this.cont
				this.list.forEach(word => {
					this.box = this.box.replace(new RegExp(word, 'g'), '<span style="color:#F56C6C;">' + word + '</span>')
				})
			})
		}
	},
	created() {
	}
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.side {
	width: 100%;
	height: px2rem(240);
	background-size: cover;
	background-position: center;
	background-image: url(http://www.crean.top/img/word.jpg);
}

.textarea {
	resize: none;
	width: 94%;
	margin: px2rem(20) auto;
	display: block;
}

.btu {
	width: 94%;
	display: block;
	height: px2rem(80);
	margin: px2rem(20) auto;
	border-radius: px2rem(10);
	font-size: px2rem(28);
}

.listBox {
	width: 94%;
	margin: px2rem(20) auto 0;
	.line {
		height: px2rem(60);
		line-height: px2rem(60);
	}
}

.word_num {
	@include flex;
	width: 94%;
	margin: px2rem(20) auto 0;
	height: px2rem(60);
	.none {
		font-size: px2rem(24);
		height: 100%;
		width: px2rem(120);
		border-radius: px2rem(10);
		margin-left: px2rem(18);
	}
}

</style>