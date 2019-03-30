<template>
  <div class="box_pie">
    <div class="title">Idft口袋留言top分布图</div>
    <DataNav :legendArr="legendArr" :myChart="myChart"/>
    <div id="dataB"></div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
import DataNav from "@/components/echarts/DataNav";
export default {
  name: "DataPie",
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
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById("dataB"));
    let dataIdft = this.$store.state.idftData;
    let data = dataIdft.data;
    let dataV = data
      .filter(val => {
        if(val.memberId == 767858) {
          return true
        }
        for( let i of val.increase){
          if (i>100){
            return true
          }
        }
        return false
      })
      .map(item => {
        return {
          name: item.memberName,
          value: item.count[0],
          active : true,
          itemStyle: {
            color: this.$store.state.color[item.memberId]
          }
        };
      });
    // console.log(dataV);
    this.legendArr = dataV
    let option = {
      legend: {
        show:false
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)"
      },
      series: [
        {
          center: ["50%", "50%"],
          type: "pie",
          data: dataV,
          label: {
            show: true,
            fontSize: "10",
            color: "#fff",
            position: "inside",
            formatter: "{b}：{d}%"
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
    this.init()
  }
};
</script>
<style lang="scss" scoped>
.box_pie {
  background: rgba(32, 32, 35, 0.5);
  width: 340px;
  margin-bottom: 20px;
  float: right;
  // height: 340px;
  #dataB {
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
}
@media screen and (max-width: 1000px) {
  .box_pie {
    width: 100%;
    float: none;
    height: auto;
  }
}
</style>
