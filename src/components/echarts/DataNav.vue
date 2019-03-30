<template>
    <div class="nav">
      <span
        v-for="(legend,index) in legendArr"
        :key="index"
        @click="legendToggle(legend)"
        :class="[legend.active?'bai':'hei']"
      >
        <i
          class="ibox"
          :style="{backgroundColor: legend.active? legend.itemStyle.color:'rgba(230, 230, 230, 0.2)'}"
        ></i>
        {{legend.name}}
      </span>
  </div>
</template>
<script>
export default {
  name: "DataNav",
  props: {
    legendArr: {
      type: Array,
      default: []
    },
    myChart: Object,
    name: String
  },
  methods: {
    legendToggle(legend) {
      legend.active = !legend.active;
      this.myChart.dispatchAction({
        type: "legendToggleSelect",
        name: legend.name
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
  .nav {
    @include flex;
    justify-content: center;
    margin-top: 10px;
    .bai{
      color: #fff;
    }
    .hei{
      color:rgba(230, 230, 230, 0.2);
    }
    span {
      @include flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
      cursor: pointer;
      .ibox {
        margin-right: 4px;
        width: 26px;
        height: 13px;
        border-radius: 4px;
      }
    }
  }
</style>
