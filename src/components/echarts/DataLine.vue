<template>
  <div class="box_line">
    <div class="title">Idft口袋留言榜top折线图</div>
    <!-- <div class="nav">
      <span
        v-for="(legend,index) in legendArr"
        :key="index"
        @click="legendToggle(legend)"
        :class="[legend.active?'bai':'hei']"
      >
        <i
          class="ibox"
          :style="{backgroundColor: legend.active? legend.itemStyle.color:'rgba(110, 110, 110, 0.5)'}"
        ></i>
        {{legend.name}}
      </span>
    </div> -->
    <DataNav :legendArr="legendArr" :myChart="myChart"/>
    <div id="dataV"></div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
import DataNav from "@/components/echarts/DataNav";
export default {
  name: "DataLine",
  components:{
    DataNav
  },
  data() {
    return {
      myChart: {},
      legendArr: []
    };
  },
  methods: {
    init() {
      window.addEventListener(
        "resize",
        function() {
          this.myChart.resize();
        }.bind(this)
      );
    },
    legendToggle(legend) {
      legend.active = !legend.active;
      this.myChart.dispatchAction({
        type: "legendToggleSelect",
        name: legend.name
      });
    }
  },
  mounted() {
    // 定义一个盛放图标的容器
    this.myChart = this.$echarts.init(document.getElementById("dataV"));
    // 获取数据
    let dataIdft = this.$store.state.idftData;
    let data = dataIdft.data;
    // 处理dataV数据
    let dataV = data
      .filter(val => {
        if (val.memberId == 767858) {
          return true;
        }
        for (let i of val.increase) {
          if (i > 100) {
            return true;
          }
        }
        return false;
      })
      .map(item => {
        //定义处理后盛放数据的容器
        return {
          name: item.memberName,
          type: "line",
          data: item.count,
          itemStyle: {
            color: this.$store.state.color[item.memberId]
          },
          active : true,
          label: {
            show: true,
            fontSize: "10",
            color: "#fff",
            // position: "inside"
            formatter: "{c}"
          }
        };
      });
    this.legendArr = dataV
    // 配置
    let option = {
      legend: {
        show: false
      },
      tooltip: {
        trigger: "axis"
        // formatter: "{a0}: {c0}<br> {a2}: {c2}<br> {a1}: {c1}<br> {a3}: {c3}"
      },
      xAxis: [
        {
          name: "时间",
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "white"
            },
            alignWithLabel: true,
            inside: true
          },
          nameTextStyle: {
            color: "white"
          },
          axisLabel: {
            textStyle: {
              color: "white"
            }
          },
          data: dataIdft.times
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          nameTextStyle: {
            color: "#fff"
          },
          nameGap: 20,
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: ["rgba(230, 230, 230, 0.2)"]
            }
          },
          axisLabel: {
            textStyle: {
              color: "white"
            }
          },
          name: "留言数量",
          type: "value"
        }
      ],
      series: dataV
    };

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
    this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.box_line {
  width: 100%;
  background: rgba(32, 32, 35, 0.5);
  #dataV {
    width: 100%;
    height: 360px;
  }
  .title {
    color: #fff;
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
  }
  .nav {
    @include flex;
    justify-content: center;
    margin: 10px auto;
    .bai{
      color: #fff;
    }
    .hei{
      color:rgba(110,110,110,0.5);
    }
    span {
      @include flex;
      align-items: center;
      justify-content: center;
      margin-left: 15px;
      cursor: pointer;
      .ibox {
        margin-right: 6px;
        width: 26px;
        height: 13px;
        border-radius: 4px;
      }
    }
  }
}
</style>
