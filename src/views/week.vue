<template>
    <div class="week">
        <div class="top">
            <div class="big_title"><span>{{NEEDDATA[0] | dataFormate}}-{{NEEDDATA[1] | dataFormate}}</span></div>
            <section class="pocket_msg">
                <div class="title">
                    <b>口袋消息</b>/Pocket<span>////</span>
                </div>
                <div class="msg">
                    <div class="line"><Icon type="md-star" class="icon"/>这周也是勤劳的一周呀，小唐一共在口袋发了<span>{{ALLNUMBER}}</span>条消息呢！</div>
                    <div class="line"><Icon type="md-star" class="icon"/><span>{{MAN[1].dataTime[0] | dataFormate}}</span>号这天你没休息好吧，晚上<span>{{MAN[1].dataTime[1] | timeFormate}}</span>还在口袋发消息</div>
                    <div class="line"><Icon type="md-star" class="icon"/><span>{{MAN[0].dataTime[0] | dataFormate}}</span>号似乎是很重要的日子，这天<span>{{MAN[0].dataTime[1] | timeFormate}}</span>就开始营业了呢</div>
                    <div class="line"><Icon type="md-star" class="icon"/><span>{{DAY.day | dataFormate}}</span>这天好像肥肠想念大家，这天留言了<span>{{DAY.num}}</span>条呢！</div>
                </div>
            </section>
            <section class="pocket_msg">
                <div class="title">
                    <b>口袋图片</b>/Pocket<span>////</span>
                </div>
                <div class="msg">
                    <!-- <div class="line"><Icon type="md-images" class="icon"/>这一周的你有丢丢的倦怠了喽，一张皂片都没有分享~</div> -->
                    <div class="line"><Icon type="md-images" class="icon"/>这周你在口袋分享了<span>{{IMAGENUM}}</span>张照片，真是一场视觉盛宴的感受呢！</div>
                </div>
            </section>
            <section class="pocket_pic">
                <div class="pic_box">
                    <div :style="{backgroundImage:`url(${IMAGE[4].url})`}"></div>
                    <div :style="{backgroundImage:`url(${IMAGE[2].url})`}"></div>
                    <div :style="{backgroundImage:`url(${IMAGE[0].url})`}"></div>
                </div>
                <div class="pic_box">
                    <div :style="{backgroundImage:`url(${IMAGE[5].url})`}"></div>
                    <div :style="{backgroundImage:`url(${IMAGE[3].url})`}"></div>
                    <div :style="{backgroundImage:`url(${IMAGE[1].url})`}"></div>
                </div>
            </section>
            <div style="clear:both;"></div>
        </div>
        <div class="btm">
            <div class="small_tittle">
                <img src="@/assets/img/small_title.png" alt="">
            </div>
            <section class="btm_msg">
                <div class="title">
                    <b>口袋翻牌</b>/Pocket<span>////</span>
                </div>
                <div class="msg">
                    <div class="line"><Icon type="md-paper" class="icon"/>这周也有积极营业呢，总共在口袋翻牌了<span>{{REPLYNUM+FLIPCARD}}</span>次，占据了总留言的<span>{{REPLYS}}</span>呢！</div>
                    <div class="line"><Icon type="md-paper" class="icon"/>这周共有<span>{{REPLY.user}}</span>位聚聚被翻牌了，好羡慕他们，最多的一位被翻了<span>{{REPLY.num}}</span>次呢</div>
                </div>
            </section>
            <section class="btm_msg">
                <div class="title">
                    <b>其他消息</b>/Pocket<span>////</span>
                </div>
                <div class="msg">
                    <div class="line"><Icon type="ios-film" class="icon"/>这周还发了<span>{{VIDEO}}</span>次小视频、<span>{{AUDIO}}</span>次语音和<span>{{LIVEPUSH}}</span>次直播/电台~继续加油哦~</div>
                </div>
            </section>
            <section class="wb_cont">
                注：统计可能和实际数值有微差属正常情况~
            </section>
        </div>
    </div>
</template>
<script>
import { getWeek } from "@/assets/js/api"
export default {
    filters:{
        dataFormate(date){
            if (!date) return;
            let value = date.split("-")
            return `${value[1][0] == '0' ? value[1][1]: value[1]}月${value[2][0] == '0' ? value[2][1]: value[2]}日`
        },
        timeFormate(times){
            if (!times) return;
            let value = times.split(":")
            return `${value[0][0] == '0' ? value[0][1]: value[0]}点${value[1][0] == '0' ? value[1][1]: value[1]}分`
        }
    },
    data() {
        return {
            ALLNUMBER:0,
            IMAGENUM:0,
            IMAGE:[{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}],
            REPLYNUM:0,
            REPLY:{},
            LIVEPUSH:0,
            FLIPCARD:0,
            AUDIO:0,
            VIDEO:0,
            EXPRESS:0,
            OTHER:0,
            DAY:{day:'',num:0},
            MAN:[{dataTime:[]},{dataTime:[]}],
            NEEDDATA:[]
        }
    },
    computed:{
        REPLYS(){
            return ((this.REPLYNUM+this.FLIPCARD)/this.ALLNUMBER*100).toFixed(2) + "%"
        }
    },
    async created() {
        let request = await getWeek()
        this.ALLNUMBER = request.ALL.ALLNUMBER
        this.IMAGENUM = request.ALL.IMAGE
        this.IMAGE = request.IMAGE
        this.REPLYNUM = request.ALL.REPLY
        this.REPLY = request.REPLY
        this.LIVEPUSH = request.ALL.LIVEPUSH
        this.FLIPCARD = request.ALL.FLIPCARD
        this.AUDIO = request.ALL.AUDIO
        this.VIDEO = request.ALL.VIDEO
        this.EXPRESS = request.ALL.EXPRESS
        this.OTHER = request.ALL.OTHER
        this.DAY = request.DAY
        this.NEEDDATA = request.NEEDDATA
        this.MAN = request.MAN
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
$orange: #ff7b89;
.week{
    background-color: #fff;
    padding: px2rem(18);
    .top{
        height: px2rem(780);
        .big_title{
            background: url(../assets/img/big_title.png) center;
            background-size: cover;
            width: px2rem(200);
            height: px2rem(780);
            float: left;
            margin-right: px2rem(10);
            position: relative;
            span{
                position: absolute;
                top: px2rem(370);
                left: px2rem(40);
                transform: rotate(90deg);
                display: block;
                width: px2rem(250);
                color: #fff;
                // font-weight: bold;
            }
        }
        .pocket_msg{
            margin-left: px2rem(210);
            margin-bottom: px2rem(10);
            .title{
                width: 100%;
                height: px2rem(60);
                background-color: $orange;
                color: #fff;
                line-height: px2rem(60);
                padding: 0 px2rem(20);
                span{
                    float: right;
                }
            }
            .msg{
                border: 1px solid $orange;
                padding-top: px2rem(8);
                padding-left: px2rem(16);
                padding-right: px2rem(16);
                font-size: px2rem(24);
                .line{
                    color: #555;
                    margin-bottom: px2rem(8);
                    position: relative;
                    padding-left:px2rem(50);
                    .icon{
                        position: absolute;
                        left: 0;
                        top:50%;
                        transform: translateY(-50%);
                        color: $orange;
                        font-size: px2rem(40);
                    }
                    span{
                        color: $orange;
                        font-weight: bold;
                        font-size: px2rem(28);
                    }
                }
            }
            &:nth-of-type(1) .msg{
                height: px2rem(365);
            }
        }
        .pocket_pic{
            margin-left: px2rem(230);
            padding-top: px2rem(20);
            padding-right: px2rem(78);
            @include flex;
            justify-content: center;
            .pic_box{
                position: relative;
                height: px2rem(150);
                width: px2rem(150);
                margin: 0 px2rem(20);
                div{
                    width: px2rem(136);
                    height: px2rem(136);
                    position: absolute;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    border-radius: 4px;
                    &:nth-of-type(1){
                        transform: rotate(-15deg)
                    }
                    &:nth-of-type(2){
                        transform: rotate(0deg)
                    }
                    &:nth-of-type(3){
                        transform: rotate(15deg)
                    }
                }
            }
        }
    }
    .btm{
        height: px2rem(1334-780-36);
        padding-top: px2rem(10);
        .btm_msg{
            margin-right: px2rem(80);
            margin-bottom: px2rem(10);
            // height: px2rem(175);
            .title{
                width: 100%;
                height: px2rem(60);
                background-color: $orange;
                color: #fff;
                line-height: px2rem(60);
                padding: 0 px2rem(20);
                span{
                    float: right;
                }
            }
            .msg{
                border: 1px solid $orange;
                padding-top: px2rem(14);
                padding-left: px2rem(20);
                padding-right: px2rem(20);
                font-size: px2rem(24);
                .line{
                    color: #555;
                    margin-bottom: px2rem(14);
                    position: relative;
                    padding-left:px2rem(50);
                    .icon{
                        position: absolute;
                        left: 0;
                        top:50%;
                        transform: translateY(-50%);
                        color: $orange;
                        font-size: px2rem(40);
                    }
                    span{
                        color: $orange;
                        font-weight: bold;
                        font-size: px2rem(28);
                    }
                }
            }
        }
        .wb_cont{
            height: px2rem(37);
            margin-right: px2rem(80);
            // border: 1px solid $orange;
            text-align: center;
            color: #777;
        }
        .small_tittle{
            width: px2rem(70);
            height: 100%;
            float: right;
            position: relative;
            img{
                width: 93%;
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
}
</style>
