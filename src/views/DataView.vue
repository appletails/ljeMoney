<template>
  <div>
    <div class="math">
      <div
        class="line"
        v-for="item in dataList"
        :key="item.id"
        :style="{'color':color[item.member]}"
      >
        <span class="idol">{{idol[item.member]}}</span>
        <span v-for="(num,j) in item.list">
          {{num}}
          <span v-if="j != 0">(+{{num-item.list[j-1]}})</span>
        </span>
      </div>
    </div>
    <div class="coordinate">
      <div class="tagging">
        <div v-for="(v,i) of obj.y.list" :key="i">
          <span>{{v}}</span>
        </div>
        <div class="draw" style="margin: 0;padding:0;position: absolute;width:100%;height: 100%">
          <svg
            :class="{showdraw:showanimation}"
            style="overflow: visible;width: 100%;height: 100%;position:relative;left:-60px;"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <template v-for="(v,i) of resdata">
              <polygon :points="v" :style="{stroke:color[i]}" style="stroke-width:1;"></polygon>
              <template v-for="(vv,item) of v.split(' ').slice(0,((v.split(' ').length-1)/2)+1)">
                <circle
                  class="hover"
                  :cx="vv.split(',')[0]"
                  :cy="vv.split(',')[1]"
                  r="4"
                  :style="{stroke:color[i]}"
                  style="position: absolute;fill:#fff;stroke-width:1;"
                ></circle>
                <text
                  :style="{stroke:color[i],fill:color[i]}"
                  style="font-size:16px;display:none"
                  :x="vv.split(',')[0]-15"
                  :y="vv.split(',')[1]-10"
                >{{Object.values(data[i])[item]}}</text>
              </template>
            </template>
          </svg>
        </div>
      </div>
      <div class="x">
        <div v-for="(v,i) of obj.x.list" :key="i">
          <span>{{v}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getIdft } from "@/assets/js/api";
export default {
  data() {
    return {
      height: 0,
      width: 0,
      obj: {
        y: {
          list: [100000, 80000, 60000, 40000, 20000],
          maxlen: 100000
        },
        x: {
          list: [],
          len: [
            1 / 10,
            2 / 10,
            3 / 10,
            4 / 10,
            5 / 10,
            6 / 10,
            7 / 10,
            8 / 10,
            9 / 10,
            10 / 10
          ]
        }
      },
      color: {
        "458335": "#ff8162",
        "614728": "#fb3569",
        "614733": "#729d39",
        "594005": "#0ea5c6",
        "608997": "#6927ff"
      },
      idol: {
        "458335": "李慧",
        "614728": "雷宇霄",
        "614733": "谯玉珍",
        "594005": "熊沁娴",
        "608997": "司珀琳"
      },
      data: {},
      showanimation: false
    };
  },
  methods: {
    getBoundingClientRect() {
      let obj = document.querySelector(".tagging").getBoundingClientRect();
      //   console.log("rect", obj, document.querySelector(".draw").style);
      this.height = obj.height;
      this.width = obj.width;
    },
    sortKey(array, key) {
      return array.sort(function(a, b) {
        var x = b[key];
        var y = a[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  },
  computed: {
    resdata() {
      if (this.width && this.height) {
        let obj = {};
        let arr = [];
        for (let i in this.data) {
          arr = [];
          for (let j = 0; j < this.data[i].length; j++) {
            let w, h;
            w = this.obj.x.len[j] * this.width;
            // console.log("up", j, this.obj.y.maxlen - this.data[i][j]);
            h =
              ((this.obj.y.maxlen - this.data[i][j]) / this.obj.y.maxlen) *
              this.height;
            w = w;
            h = h;
            //两个值也可以进行四舍五入下
            // console.log(8, w, h);
            arr.push(w + "," + h);
          }
          let arr1 = [];
          arr1.push(...arr.slice(0, -1));
          arr1.reverse();
          arr[-1] += " ";
          arr.push(...arr1);
          obj[i] = arr.join(" ");
        }
        // console.log("res", obj);
        this.showanimation = true;
        return obj;
      } else {
        return {};
      }
    },
    dataList() {
      let data = [];
      for (let item in this.data) {
        data.push({
          member: item,
          id: this.data[item][this.data[item].length - 1],
          list: this.data[item]
        });
      }
      console.log(data);
      data = this.sortKey(data,'id')
      console.log(data);
      return data;
    }
  },

  mounted() {
    window.addEventListener("resize", this.getBoundingClientRect);
    setTimeout(() => {
      this.getBoundingClientRect();
      //   console.log("长宽", this.width, this.height);
    });
    // console.log(this.$children[0]);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getBoundingClientRect);
  },
  async created() {
    let DataViev = await getIdft();

    this.data = DataViev["data"];
    this.obj.x.list = DataViev["times"];
    let maxlen = 0;
    for (let item in DataViev["data"]) {
      let arr = DataViev["data"][item];
      if (maxlen < arr[arr.length - 1]) {
        maxlen = arr[arr.length - 1];
      }
    }
    maxlen = Math.ceil(maxlen / 10000) * 10000;
    let list = [
      maxlen,
      (maxlen * 4) / 5,
      (maxlen * 3) / 5,
      (maxlen * 2) / 5,
      maxlen / 5
    ];
    this.obj.y.list = list;
    this.obj.y.maxlen = maxlen;
  }
};
</script>
<style lang="scss" scoped>
@keyframes width {
  0% {
    width: 0;
    overflow: hidden;
  }
  100% {
    width: 100%;
  }
}
.showdraw {
  animation: width 1.5s;
  /*transition: width 2s;*/
  /*width: 100%;*/
}
.hover:hover {
  stroke-width: 4;
}
.hover:hover + text {
  display: inline-block !important;
}

.coordinate {
  height: 100%;
  min-height: 300px;
  height: 400px;
  width: 1200px;
  padding-left: 60px;
  padding-right: 60px;
  display: flex;
  flex-flow: column;
  margin: auto;
}
.title {
  width: 1200px;
  padding-left: 60px;
  padding-right: 60px;
  margin: 20px auto;
  display: flex;
  div {
    display: flex;
    align-items: center;
    margin-right: 20px;
    i {
      display: block;
      width: 10px;
      height: 10px;
      margin-right: 5px;
    }
  }
}

.math {
  width: 1200px;
  padding-right: 60px;
  margin: 20px auto;
  .line {
    display: flex;
    height: 26px;
    span {
      font-size: 14px;
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
    .idol {
      width: 60px;
      flex: inherit;
      text-align: right;
    }
  }
}
.tagging {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  div {
    flex-grow: 1;
    border-top: 1px solid #cbcbcb;
    border-left: 1px solid #333;
    position: relative;
    span {
      position: absolute;
      display: inline-block;
      height: 1em;
      line-height: 1em;
      vertical-align: center;
      font-size: 14px;
      top: -0.5em;
      transform: translateX(-100%);
      padding-right: 7px;
    }
    &:last-child {
      border-bottom: 1px solid #333;
    }
    &:after {
      content: "";
      position: absolute;
      width: 5px;
      height: 1px;
      background: #333;
      top: -1px;
      left: -5px;
    }
  }
}

.x {
  display: flex;
  height: 30px;
  div {
    flex-grow: 1;
    // border-right: 1px solid black;
    text-align: center;
    // transform: translateX(50%);
    span {
      font-size: 14px;
    }
  }
}
</style>
