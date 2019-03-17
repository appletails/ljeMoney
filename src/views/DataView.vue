<template>
  <div>
    <div class="bg"></div>
    <div class="main">
      <div class="btm">
        <DataPie />
        <DataBar />
      </div>
      <DataLine/>
    </div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
import DataLine from "@/components/echarts/DataLine";
import DataPie from "@/components/echarts/DataPie";
import DataBar from "@/components/echarts/DataBar";
export default {
  components: {
    DataLine,
    DataBar,
    DataPie
  },
  data() {
    return {};
  },
  methods: {},
  async created() {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
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
.main {
  width: 1000px;
  margin: auto;
  padding: 30px 0;
  position: relative;
  z-index: 1;
  .btm {
    @include flex;
    margin-bottom: 20px;
  }
}
</style>
