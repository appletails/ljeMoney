<template>
  <div class="box_bar">
    <div class="title">Idft口袋留言top增长值</div>
    <DataNav :legendArr="legendArr" :myChart="myChart"/>
    <div id="dataC"></div>
  </div>
</template>
<script>
import DataNav from "@/components/echarts/DataNav";
export default {
  name: "DataBar",
  components: {
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
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("dataC"));
    let dataIdft = this.$store.state.idftData;
    let data = dataIdft.data;
    // 处理dataV数据
    let dataV = data
      .map((item, i) => {
        return {
          name: item.memberName,
          type: "bar",
          data: item.increase,
          active: true,
          itemStyle: {
            color: this.$store.state.color[item.memberId]
          },
          label: {
            show: true,
            fontSize: "10"
          }
        };
      })
      .filter(val => {
        if (val.memberId == 767858) {
          return true;
        }
        for (let i of val.data) {
          if (i > 100) {
            return true;
          }
        }
        return false;
      });
    // console.log(dataV);
    this.legendArr = dataV;
    // 配置
    let option = {
      legend: {
        show: false
      },
      grid: {
        bottom: "15%"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
        // formatter: "{a0}: {c0}<br> {a2}: {c2}<br> {a1}: {c1}<br> {a3}: {c3}"
      },
      barGap: 0,
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
          nameLocation: "end",
          nameTextStyle: {
            color: "#fff"
          },
          nameGap: 30,
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
          name: "半小时增长量",
          type: "value"
        }
      ],
      series: dataV
    };
    if (window.screen.width < 800) {
      option.grid = {
        left: "20%",
        right: "20%"
      };
      option.yAxis[0].nameLocation = "center";
      option.xAxis = [option.yAxis, (option.yAxis = option.xAxis)][0];
    }
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
    this.init();
  }
};
</script>
<style lang="scss" scoped>
.box_bar {
  background: rgba(32, 32, 35, 0.5);
  width: 640px;
  margin-bottom: 20px;
  float: left;
  // height: 340px;
  #dataC {
    width: 100%;
    height: 300px;
  }
  .title {
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
    height: 45px;
    line-height: 45px;
  }
  .chase {
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    text-align: center;
    padding-bottom: 5px;
    height: 30px;
    line-height: 30px;
  }
}
@media screen and (max-width: 1000px) {
  .box_bar {
    width: 100%;
    float: none;
    height: auto;
    #dataC {
      height: 600px;
    }
  }
}
</style>
