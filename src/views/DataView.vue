<template>
  <div>
    <div class="bg"></div>
    <div class="main_data">
      <div class="msg">仅显示最近有增长的成员</div>
      <div class="upArr" v-for="item in upOnLh">
        {{item.name}}超过李慧大约需要{{item.time | timeChange}}
      </div>
      <DataPie />
      <DataBar />
      <div class="clear"></div>
      <DataLine v-if="wid>=800"/>
    </div>
  </div>
</template>
<script>
import DataLine from "@/components/echarts/DataLine";
import DataPie from "@/components/echarts/DataPie";
import DataBar from "@/components/echarts/DataBar";
import {timeChange} from '@/assets/js/filters'
export default {
  filters:{
    timeChange
  },
  components: {
    DataLine,
    DataBar,
    DataPie
  },
  data() {
    return {
      wid: window.screen.width,
      upOnLh: [],
      idftData:{}
    };
  },
  created() {
    this.idftData = this.$store.state.idftData
    /*
      开始计算超过李慧需要的时间
      首先获取李慧最近一次的增长值
      过滤出最近一次增长至大于李慧增长值的人
    */
    let upLh = this.idftData.data.filter(item => item.memberId == 458335)[0];
    this.upOnLh = this.idftData.data
      .filter(
        item =>
          item.increase[item.increase.length - 1] >
            upLh.increase[upLh.increase.length - 1] && item.max < upLh.max
      )
      .map(item => {
        let LhUp = upLh.increase[upLh.increase.length - 1]; // 李慧最近一次增长值
        let itemUp = item.increase[item.increase.length - 1]; // item最近一次增长值
        let lhMax = upLh.max; // 李慧当前值
        let itemMax = item.max; // item当前值
        let times = 0;
        while (itemMax < lhMax) {
          times++;
          itemMax += itemUp;
          lhMax += LhUp;
        }
        return {
          time: times / 2,
          name: item.memberName
        };
      });
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.clear {
  clear: both;
}
.msg {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  text-align: center;
}
.upArr {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  text-align: center;
}
.bg {
  width: 100%;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  background-position: center center;
  background-size: cover;
  background-image: url(../assets/img/bg.jpg);
}
.main_data {
  max-width: 1000px;
  width: 100%;
  margin: auto;
  padding: 10px 0;
  position: relative;
  z-index: 1;
}
@media screen and (max-width: 800px) {
  .main_data {
    padding: 10px;
  }
}
</style>
