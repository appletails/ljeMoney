<template>
  <div class="box">
    <div class="title">Idft口袋留言榜御三家折线图</div>
    <div id="dataV"></div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
export default {
  name: "DataLine",
  data() {
    return {
      color: {
        "458335": "#ff8162",
        "614728": "#fb3569",
        "608997": "#6927ff"
      },
      idol: {
        "458335": "李慧",
        "614728": "雷宇霄",
        "608997": "司珀琳"
      }
    };
  },
  async mounted() {
    // 定义一个盛放图标的容器
    let myChart = this.$echarts.init(document.getElementById("dataV"));
    // 获取数据
    this.dataIdft = await getIdft();
    let dataV = []; //定义处理后盛放数据的容器
    let data = this.dataIdft.data;
    // 处理dataV数据
    for (let item in data) {
      let col = dataV.push({
        name: this.idol[item],
        type: "line",
        data: data[item],
        itemStyle: {
          color: this.color[item]
        }
      });
    }
    // 配置
    let option = {
      legend: {
        type: "plain",
        inactiveColor: "rgba(230, 230, 230, 0.2)",
        textStyle: {
          color: "#fff"
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: "{a0}: {c0}<br> {a2}: {c2}<br> {a1}: {c1}"
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
          data: this.dataIdft.times
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
    myChart.setOption(option);
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/global.scss';
.box {
  width: 100%;
  background: rgba(32, 32, 35, 0.5);
  #dataV {
    width: 100%;
    height: 360px;
  }
  .title{
    color:#fff;
    font-size: 24px;
    text-align: center;
    padding-top: 20px;
  }
}
</style>
