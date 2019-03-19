<template>
  <div class="box_bar">
    <div class="title">Idft口袋留言御三家增长值</div>
    <div id="dataC"></div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
export default {
  name: "DataBar",
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
    let myChart = this.$echarts.init(document.getElementById("dataC"));
    this.dataIdft = await getIdft();
    let dataV = [];
    let data = this.dataIdft.data;
    // 处理dataV数据
    for (let item in data) {
      let valArr = data[item]
        .map((val, i) => {
          if (i) {
            return data[item][i] - data[item][i - 1];
          }
        })
        .filter((val, i) => i);
      console.log(valArr);
      let col = dataV.push({
        name: this.idol[item],
        type: "bar",
        data: valArr,
        itemStyle: {
          color: this.color[item]
        },
        label: {
          show: true,
          fontSize: "10"
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
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: "{a0}: {c0}<br> {a2}: {c2}<br> {a1}: {c1}"
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
          data: this.dataIdft.times.filter((item, i) => i)
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
            },
            formatter: function(data) {
              console.log(data);
              return data;
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
        right: "15%"
      };
      option.yAxis[0].nameLocation = "center";
      option.xAxis = [option.yAxis, (option.yAxis = option.xAxis)][0];
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>
<style lang="scss" scoped>
.box_bar {
  float: left;
  background: rgba(32, 32, 35, 0.5);
  width: 680px;
  margin-bottom: 20px;
  #dataC {
    width: 100%;
    height: 300px;
  }
  .title {
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding: 20px 0;
  }
}
@media screen and (max-width: 800px) {
  .box_bar {
    margin: auto;
    float: none;
    width: 90%;
    margin-bottom: 20px;
    #dataC {
      width: 100%;
      height: 500px;
    }
    .title {
      color: #fff;
      font-size: 16px;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
