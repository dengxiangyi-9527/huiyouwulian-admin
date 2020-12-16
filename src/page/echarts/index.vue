<template>
  <div class="content">
    <div class="echarts fb">
      <div id="lin1" :style="{width:'620px', height:'420px'}" v-if="show"></div>
      <div id="myChart1" :style="{width:'490px', height:'420px'}" v-if="show"></div>
    </div>
    <div class="echarts fb">
      <div id="lin2" :style="{width:'620px', height:'420px'}" v-if="hide"></div>
      <div id="myChart2" :style="{width:'490px', height:'420px'}" v-if="hide"></div>
    </div>
    <div class="echarts">
      <div id="lin3" :style="{width:'820px', height:'620px'}" v-if="etf"></div>
    </div>
  </div>
</template>
<script>
import { chartList } from "@/api/index/index";
export default {
  name: "Echarts",
  data () {
    return {
      hide: true,
      show: true,
      etf: true
    };
  },

  created () { },
  mounted () {
    this.insi();
  },

  methods: {
    insi () {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      let lin1 = this.$echarts.init(document.getElementById("lin1"));
      let lin2 = this.$echarts.init(document.getElementById("lin2"));
      let lin3 = this.$echarts.init(document.getElementById("lin3"));
      chartList({}).then(response => {
        console.log(response.data);
        // let jzOrys = response.data.data.jzOrys;
        let roleType = response.data.data.roleType;
        let sum_member_cont = response.data.data.sum_member_cont;
        let yy_member_cont = response.data.data.yy_member_cont;
        let jz_member_cont = response.data.data.jz_member_cont;
        let jz_orderContList = response.data.data.jz_orderContList;
        let yy_orderContList = response.data.data.yy_orderContList;
        let orderContList = response.data.data.orderContList;
        let jzkey = [];
        let jzvalue = [];
        let yykey = [];
        let yyvalue = [];
        let key = [];
        let value = [];
        var colors = ["#00BFFF", "#FF7F50"];

        for (var i in jz_orderContList) {
          jzkey.push(i);
          jzvalue.push(jz_orderContList[i]);
        }
        if (orderContList) {
          let orderList = Object.values(orderContList).map(({ success_order }) => success_order)
          let amountList = Object.values(orderContList).map(({ sum_amount }) => sum_amount)
          console.log(orderContList);
          this.etf = true;
          for (var i in orderContList) {
            key.push(i);
            value.push(orderContList[i]);
          }

          var max = parseInt(Math.max.apply(null, amountList)) + 1000;
          // var min = Math.min.apply(null, amountList);
          var min = 0;
          var max1 = Math.max.apply(null, orderList) + 10;
          // var min1 = Math.min.apply(null, orderList);
          var min1 = 0;

          const formatInt = (num, prec = 2, ceil = true) => {
            const len = String(num).length;
            if (len <= prec) { return num };

            const mult = Math.pow(10, prec);
            return ceil ?
              Math.ceil(num / mult) * mult :
              Math.floor(num / mult) * mult;
          }
          // console.log(formatInt(max1, 4, true))
          // max = formatInt(max, 5, true);
          // min = parseInt(min)
          // max1 = Math.ceil(max1);
          // min1 = parseInt(min1)

          //会员收益表
          lin3.setOption({
            title: [
              {
                text: "会员收益",
                left: "center",
                // top: "-10"
              }
            ],
            xAxis: {//横轴
              type: "category",
              // boundaryGap: false,
              data: [key[0], key[1], key[2], key[3], key[4], key[5], key[6]]
            },
            grid: {
              left: "10%",
              right: "10%",
              bottom: "15%",
              top: "15%",
              // containLabel: true
            },
            color: ["#48D1CC", "#FF7F50"],
            tooltip: {
              // formatter: "{c}"
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },

            yAxis: [{//y轴
              type: "value",
              name: '下单量(单)',
              show: true,
              min: max1,
              max: min1,
              splitNumber: 5,
              interval: (max1 - min1) / 5,
              position: 'left',
              // offset: 10,
              axisLabel: {
                //坐标轴刻度标签的相关设置。
                formatter: "{value}" // 使用字符串模板，模板变量为刻度默认标签 {value}
              },
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              }
            },
            {
              type: 'value',
              name: '日收益(元)',
              min: max,
              max: min,
              splitNumber: 5,
              interval: (max - min) / 5,
              position: 'right',
              // offset: 10,
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
            ],

            legend: {
              // orient: "vertical",
              left: "center",
              top: "30",
              data: ["下单量", "日收益"]
            },
            series: [
              {
                name: "下单量",
                type: "bar",
                barWidth: 20,
                barGap: 0,
                stack: "总量",
                data: orderList,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
              },
              {
                name: "日收益",
                type: "bar",
                barWidth: 20,
                yAxisIndex: 1,
                data: amountList,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
              }
            ]
          });
        } else {
          this.etf = false;
        }
        if (jz_orderContList) {
          // let jz_orderList = Object.values(jz_orderContList).map(({ success_order }) => success_order)
          let jz_amountList = Object.values(jz_orderContList).map(({ sum_amount }) => sum_amount)
          var max = Math.max.apply(null, jz_amountList);
          var min = Math.min.apply(null, jz_amountList);

          max = parseInt(max) + 10;
          myChart2.setOption({
            title: [
              {
                text: "设备数量",
                left: "center"
              }
            ],
            legend: {
              orient: "vertical",
              left: "right",
              data: ["总认领数", "今日认领数"]
            },
            color: ["#48D1CC", "#90EE90"],
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              width: "0px",
              height: "0px",
              containLabel: true
            },

            tooltip: {
              trigger: "item",
              formatter: "{b} : {c}人"
            },
            series: [
              {
                name: "",
                type: "pie",
                radius: "55%",
                center: ["50%", "50%"],
                data: [
                  { value: jz_member_cont.total, name: "总认领数" },
                  { value: jz_member_cont.today, name: "今日认领数" }
                ],
                itemStyle: {
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params) {
                      var colorList = ["#48D1CC", "#FF7F50"];
                      return colorList[params.dataIndex];
                    }
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
          lin2.setOption({
            title: [
              {
                text: "机主收益",
                left: "center"
              }
            ],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },
            legend: {
              orient: "vertical",
              left: "center",
              top: 30,
              data: ["日收益"]
            },
            grid: {
              left: "8%",
              right: "10%",
              bottom: "3%",
              top: "30%",
              containLabel: true
            },
            color: ["#48D1CC", "#FF7F50"],
            xAxis: {
              type: "category",
              // boundaryGap: false,
              //  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
              data: [
                jzkey[0],
                jzkey[1],
                jzkey[2],
                jzkey[3],
                jzkey[4],
                jzkey[5],
                jzkey[6]
              ]
            },
            yAxis: {
              type: "value",
              name: '日收益(元)',
              min: 0,
              max: max,
              offset: 10,
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                //坐标轴刻度标签的相关设置。
                formatter: "{value}" // 使用字符串模板，模板变量为刻度默认标签 {value}
              }
            },
            series: [
              {
                name: "日收益",
                type: "bar",
                barWidth: 30,
                stack: "总量",

                data: jz_amountList,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
          this.hide = true;
        } else {
          this.hide = false;
        }
        if (yy_orderContList) {
          for (var i in yy_orderContList) {
            yykey.push(i);
            yyvalue.push(yy_orderContList[i]);
          }
          let yy_amountList = Object.values(yy_orderContList).map(({ sum_amount }) => sum_amount)
          let yy_orderList = Object.values(yy_orderContList).map(({ success_order }) => success_order)
          this.show = true;
          myChart1.setOption({
            title: [
              {
                text: "运营商会员数",
                left: "center"
              }
            ],
            legend: {
              orient: "vertical",
              left: "right",
              data: ["今日注册人数", "总数"]
            },
            grid: {
              left: "4%",
              right: "4%",
              bottom: "3%",
              width: "20px",
              height: "20px",
              containLabel: true
            },
            color: ["#48D1CC", "#FF7F50"],
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c}人"
            },
            series: [
              {
                name: "",
                type: "pie",
                radius: "55%",
                center: ["50%", "50%"],
                data: [
                  { value: yy_member_cont.todaySum, name: "今日注册人数" },
                  { value: yy_member_cont.sumCont, name: "总数" }
                ],
                itemStyle: {
                  normal: {
                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                    color: function (params) {
                      var colorList = ["#48D1CC", "#FF7F50"];
                      return colorList[params.dataIndex];
                    }
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
          var max1 = Math.max.apply(null, yy_amountList);
          var min1 = Math.min.apply(null, yy_amountList);
          var max2 = Math.max.apply(null, yy_orderList);
          var min2 = Math.min.apply(null, yy_orderList);
          max1 = parseInt(max1) + 10;

          max2 = parseInt(max2) + 10;
          console.log(max2)
          //运营商收益表
          lin1.setOption({
            title: [
              {
                text: "运营商收益",
                left: "center"
              }
            ],
            tooltip: {
              // formatter: "{c}"
              trigger: "axis",
              axisPointer: {
                type: "cross"
              }
            },
            color: ["#48D1CC", "#FF7F50"],
            xAxis: {
              type: "category",
              // boundaryGap: false,

              // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
              data: [
                yykey[0],
                yykey[1],
                yykey[2],
                yykey[3],
                yykey[4],
                yykey[5],
                yykey[6]
              ]
            },

            grid: {
              left: "10%",
              right: "10%",
              bottom: "9%",
              top: "30%",
              // containLabel: true
            },
            // min: function(value) {
            //   console.log(value);
            //   return value.min + 100;
            // },
            // max: function(value) {
            //   return value.max + 10000;
            // },

            yAxis: [{
              type: "value",
              name: '下单量(单)',

              //  position: 'right',
              offset: 10,
              axisLabel: {
                //坐标轴刻度标签的相关设置。
                formatter: "{value}" // 使用字符串模板，模板变量为刻度默认标签 {value}
              },
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              }
            },
            {
              type: 'value',
              name: '注册总数(人)',
              // min: 0,
              // max: max1,
              // max: 300,
              offset: 10,
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              }
            }],
            legend: {
              // orient: "vertical",
              left: "center",
              top: 40,
              data: ["下单量", "注册总数"]
            },
            series: [
              {
                name: "下单量",
                type: "line",
                data: yy_orderList,

                // data: [50, 92, 150, 15, 25, 152, 11],
                itemStyle: {

                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              },
              {
                name: "注册总数",
                type: "bar",
                barWidth: 30,
                yAxisIndex: 1,
                data: yy_amountList,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                },
                // data: [20, 81, 78, 12, 152, 139, 125],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
        } else {
          this.show = false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/echarts.scss";

#lin1,
#lin2 {
  padding-left: 50px;
  padding-top: 50px;
  padding-bottom: 50px;
}
#myChart1,
#myChart2 {
  padding-right: 50px;
  padding-top: 50px;
}
#lin3 {
  margin: 50px auto;
  padding: 50px auto;
}
.echarts {
  border: none !important;
}
</style>

