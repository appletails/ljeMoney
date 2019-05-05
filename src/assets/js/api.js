import axios from 'axios'
import MD5 from 'js-md5'

let qs = require('qs');

//获得签名
export function getSign(json) {
	let keys = Object.keys(json).sort();
	let str = "";
	for (let i = 0; i < keys.length; i++) {
		str += keys[i] + "=" + eval('json.' + keys[i]) + "&"
	}
	let md5String = encodeURI(str);
	md5String += 'p=das41aq6'
	let sign = MD5(md5String).toString(16).substring(5, 21)
	return sign;
}

let AllDetail = null
async function getDetail(page_index) {
	let result = await axios.post(
		'http://mapi.modian.com/v45/user/build_product_list',
		qs.stringify({
			'to_user_id': 1624675,
			'json_type': 1,
			'page_index': page_index,
			'page_rows': 10
		})
	)
	return result.data.data
}
// 获取所有摩点项目信息

export async function getAllDetail() {
	if (!AllDetail) {
		let i = 0
		let data = []
		while(true){
			let result = await getDetail(i)
			if(result.length){
				data = data.concat(result)
				i += 10
			}else{
				break
			}
		}
		AllDetail = data
	}
	return AllDetail
}

// 获得rank信息
export async function getRankings(pro_id, page, type) {
	let types = ""
	if (type) {
		types = "day"
	} else {
		types = "amount"
	}
	let result = await axios.post(
		'http://mapi.modian.com/v45/product/backer_ranking_list',
		qs.stringify({
			"pro_id": pro_id,
			"user_id": 0,
			"json_type": 1,
			"page_index": page,
			"page_rows": 20,
			"type": types

		})
	)
	return result.data.data.ranking_list
}

// 定义有一个请求json的url
let url = function (api) {
	return 'http://www.crean.top/' + api + '.json'
}

// 请求五选集资列表.json
let UserFive = null
export async function getUserFive() {
	if (UserFive) {
		return UserFive
	}
	let result = await axios.get(url('api/lib/five/userData'))
	UserFive = result.data
	return UserFive
}
// 请求生蛋列表.json
let Birthday = null
export async function getBirthday() {
	if (Birthday) {
		return Birthday
	}
	let result = await axios.get(url('api/lib/five/birthday'))
	Birthday = result.data
	return Birthday
}
// 请求B50集资列表.json
let UserSix = null
export async function getUserSix() {
	if (UserSix) {
		return UserSix
	}
	let result = await axios.get(url('api/lib/six/user'))
	UserSix = result.data
	return UserSix
}
// 请求B50抽卡列表.json
let CardSix = null
export async function getCardSix() {
	if (CardSix) {
		return CardSix
	}
	let result = await axios.get(url('api/lib/six/card'))
	CardSix = result.data
	return CardSix
}
// 请求B50抽卡描述列表.json
let CardChance = null
export async function getCardChance() {
	if (CardChance) {
		return CardChance
	}
	let result = await axios.get(url('api/lib/chance'))
	CardChance = result.data
	return CardChance
}

// 小工具部分
// 口袋敏感字
export async function koudai(cont) {
	return await axios.get('http://ban2.lovelyctx.com/api', { params: { 'content': cont } })
}

// 鸡汤接口
let soupsDate = null
export async function soups() {
	let date1 = new Date();
	let date2 = new Date(date1);
	date2.setDate(date1.getDate() - 29);
	let start = {
		year: date2.getFullYear().toString(),
		month: ((date2.getMonth() + 1) < 10 ? '0' + (date2.getMonth() + 1) : (date2.getMonth() + 1)).toString(),
		date: (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate()).toString()
	}
	let startTime = start.year + start.month + start.date
	let end = {
		year: date1.getFullYear().toString(),
		month: ((date1.getMonth() + 1) < 10 ? '0' + (date1.getMonth() + 1) : (date1.getMonth() + 1)).toString(),
		date: (date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate()).toString()
	}
	let endTime = end.year + end.month + end.date
	if (soupsDate) {
		return soupsDate
	} else {
		soupsDate = await axios.get("http://api.fenfenriji.com/activity/wisdoms?start=" + startTime + "&end=" + endTime)
		// console.log(soupsDate.data)
		soupsDate = soupsDate.data.reverse().map(item => {
			item.date = {
				year: item.date.substring(0, 4),
				month: item.date.substring(4, 6),
				date: item.date.substring(6)
			}
			return item
		})
		return soupsDate
	}
}