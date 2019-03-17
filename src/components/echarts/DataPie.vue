<template>
  <div class="box">
    <div class="title">Idft口袋留言御三家分布图</div>
    <div id="dataB"></div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
export default {
  name: "DataPie",
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
    let myChart = this.$echarts.init(document.getElementById("dataB"));
    this.dataIdft = await getIdft();
    let dataV = [];
    let data = this.dataIdft.data;
    for (let item in data) {
      let col = dataV.push({
        name: this.idol[item],
        value: data[item][5],
        itemStyle: {
          color: this.color[item]
        }
      });
    }
    console.log(dataV);
    let option = {
      legend: {
        type: "plain",
        inactiveColor: "rgba(230, 230, 230, 0.2)",
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
      },
      series: [
        {
          center: ["50%", "54%"],
          type: "pie",
          data: dataV,
          label: {
            color: "#fff",
            position: "inside"
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>
<style lang="scss" scoped>
.box {
  background: rgba(32, 32, 35, 0.5);
  width: 300px;
  #dataB {
    width: 100%;
    height: 300px;
  }
  .title{
    color:#fff;
    font-size: 16px;
    text-align: center;
    padding: 20px 0;
  }
}
</style>
