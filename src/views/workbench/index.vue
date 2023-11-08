<template>
  <div class="index">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="24" :lg="12" :xl="20">
        <div class="index-left">
          <div class="left-top panel">
            <a-typography-title :heading="5" style="margin-top: 5px">
              欢迎回来！
            </a-typography-title>
            <a-divider />
            <a-grid class="top-grid" :rowGap="16">
              <a-grid-item class="grid-item" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
                <a-space size="medium">
                  <a-avatar class="item-avatar" :size="54">
                    <icon-lark-color />
                  </a-avatar>
                  <a-statistic title="线上总内容" :value="127.4" :precision="1" :value-from="0" animation show-group-separator>
                    <template #suffix>
                      W+ <span class="item-suf">个</span>
                    </template>
                  </a-statistic>
                </a-space>
              </a-grid-item>
              <a-grid-item class="grid-item" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
                <a-space size="medium">
                  <a-avatar class="item-avatar" :size="54">
                    <icon-tiktok-color />
                  </a-avatar>
                  <a-statistic title="投放中内容" :value="127.4" :precision="1" :value-from="0" animation show-group-separator>
                    <template #suffix>
                      <span class="item-suf">个</span>
                    </template>
                  </a-statistic>
                </a-space>
              </a-grid-item>
              <a-grid-item class="grid-item" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
                <a-space size="medium">
                  <a-avatar class="item-avatar" :size="54">
                    <icon-bytedance-color />
                  </a-avatar>
                  <a-statistic title="日新增评论" :value="127.4" :precision="1" :value-from="0" animation show-group-separator>
                    <template #suffix>
                      <span class="item-suf">个</span>
                    </template>
                  </a-statistic>
                </a-space>
              </a-grid-item>
              <a-grid-item class="grid-item" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
                <a-space size="medium">
                  <a-avatar class="item-avatar" :size="54">
                    <icon-xigua-color />
                  </a-avatar>
                  <a-statistic title="较昨日新增" :value="127.4" :precision="1" :value-from="0" animation show-group-separator>
                    <template #suffix>
                      <a-space>
                        %<icon-caret-up :style="{ color: '#4cd263' }" />
                      </a-space>
                    </template>
                  </a-statistic>
                </a-space>
              </a-grid-item>
            </a-grid>
            <a-divider />
            <div class="top-chart">
              <div class="chart-header">
                <span>内容数据</span>
                <a-link href="link">查看更多</a-link>
              </div>
              <div class="chart-box" id="chart-line"> </div>
            </div>
          </div>
          <div class="left-bottom">
            <a-row :gutter="[16, 16]">
              <a-col :span="12">
                <div class="bottom-chart panel">
                  <div class="chart-header">
                    <span>线上热门内容</span>
                  </div>
                  <div class="chart-box" id="chart-bar"> </div>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="bottom-chart panel">
                  <div class="chart-header">
                    <span>内容类型占比</span>
                  </div>
                  <div class="chart-box" id="chart-pie"> </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="12" :xl="4">
        <a-grid class="index-right" :cols="24" :row-gap="16">
          <a-grid-item class="panel" :span="24">
            <div class="right-card">
              <div class="card-header">
                <span>快捷操作</span>
                <a-link href="link">管理</a-link>
              </div>
              <div class="card-grid">
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-apps :size="16" />
                  </div>
                  <div class="cell-tex">首页</div>
                </div>
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-common :size="16" />
                  </div>
                  <div class="cell-tex">内容管理</div>
                </div>
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-computer :size="16" />
                  </div>
                  <div class="cell-tex">内容分析</div>
                </div>
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-dashboard :size="16" />
                  </div>
                  <div class="cell-tex">线上推广</div>
                </div>
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-file :size="16" />
                  </div>
                  <div class="cell-tex">内容投放</div>
                </div>
              </div>
            </div>
            <a-divider />
            <div class="right-card">
              <div class="card-header">
                <span>最近访问</span>
              </div>
              <div class="card-grid">
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-apps :size="16" />
                  </div>
                  <div class="cell-tex">首页</div>
                </div>
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-common :size="16" />
                  </div>
                  <div class="cell-tex">内容管理</div>
                </div>
                <div class="grid-cell">
                  <div class="cell-icon">
                    <icon-computer :size="16" />
                  </div>
                  <div class="cell-tex">内容分析</div>
                </div>
              </div>
            </div>
          </a-grid-item>
          <a-grid-item :span="24">
            <a-carousel indicator-type="slider" show-arrow="hover" auto-play
              style="width: 100%; height: 170px; border-radius: 4px; overflow: hidden">
              <a-carousel-item v-for="(src, idx) in imageSrc" :key="idx">
                <div>
                  <img :src="src" style="width: 100%" />
                </div>
              </a-carousel-item>
            </a-carousel>
          </a-grid-item>
          <a-grid-item class="panel" :span="24">
            <div class="right-card">
              <div class="card-header">
                <span>公告</span>
                <a-link href="link">查看更多</a-link>
              </div>
              <div class="card-notice">
                <div class="notice-item" v-for="(item, index) in noticeList" :key="index">
                  <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
                  <span class="item-text">
                    {{ item.content }}
                  </span>
                </div>
              </div>
            </div>
          </a-grid-item>
          <a-grid-item class="panel" :span="24">
            <div class="right-card">
              <div class="card-header">
                <span>帮助文档</span>
                <a-link href="link">查看更多</a-link>
              </div>
              <div class="card-doc">
                <div class="doc-item">
                  <a-button size="small">产品概要</a-button>
                </div>
                <div class="doc-item">
                  <a-button size="small">使用指南</a-button>
                </div>
                <div class="doc-item">
                  <a-button size="small">接入流程</a-button>
                </div>
                <div class="doc-item">
                  <a-button size="small">接口文档</a-button>
                </div>
              </div>
            </div>
          </a-grid-item>
        </a-grid>
      </a-col>
    </a-row>
  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts">
/**
 * @desc 工作台
 * @author changz
 * */

import { onMounted } from 'vue'
// import { useAppStore } from '@/stores/modules/app'
// import ArcoIcon from '@/components/ArcoIcon'
import echarts from '@/utils/echarts'
import type { ToolTipFormatterParams } from '@/types/echarts'

// const store = useAppStore()

// const title = ref<string>('首页')
const imageSrc = [
  new URL('@/assets/images/banner01.png', import.meta.url).href,
  new URL('@/assets/images/banner02.png', import.meta.url).href,
  new URL('@/assets/images/banner03.png', import.meta.url).href,
  new URL('@/assets/images/banner04.png', import.meta.url).href,
  new URL('@/assets/images/banner05.png', import.meta.url).href
]

const noticeList = [
  {
    type: 'orangered',
    label: '活动',
    content: '内容最新优惠活动'
  },
  {
    type: 'cyan',
    label: '消息',
    content: '新增内容尚未通过审核，详情请点击查看。'
  },
  {
    type: 'blue',
    label: '通知',
    content: '当前产品试用期即将结束，如需续费请点击查看。'
  },
  {
    type: 'blue',
    label: '通知',
    content: '1月新系统升级计划通知'
  },
  {
    type: 'cyan',
    label: '消息',
    content: '新增内容已经通过审核，详情请点击查看。'
  }
]

onMounted(() => {
  drawLineChart()
  drawBarChart()
  drawPieChart()
})

const drawLineChart = () => {
  const xData = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '外套', '围巾', '帽子']
  const data = [5, 20, 36, 10, 10, 20, 22, 42, 16]
  const myChart = echarts.init(document.getElementById('chart-line'))
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter(params: ToolTipFormatterParams[]) {
        return `<div>
          <p class="tooltip-title">${params[0]?.axisValueLabel}</p>
          <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(Number(params[0].value) * 10000).toLocaleString()}</span></div>
        </div>`
      }
    },
    grid: {
      x: 50,
      y: 20,
      x2: 50,
      y2: 40
    },
    xAxis: {
      type: 'category',
      offset: 2,
      boundaryGap: false,
      axisLabel: {
        color: '#4E5969'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E5E8EF'
        }
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#23ADFF',
          width: 2
        }
      },
      data: xData
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        formatter(value: any, idx: number) {
          if (idx === 0) return value
          return `${value}k`
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E5E8EF'
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'line',
        smooth: true,
        // symbol: 'circle',
        symbolSize: 12,
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2
          }
        },
        lineStyle: {
          width: 3,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: 'rgba(30, 231, 255, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(36, 154, 255, 1)'
            },
            {
              offset: 1,
              color: 'rgba(111, 66, 251, 1)'
            }
          ])
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(17, 126, 255, 0.16)'
            },
            {
              offset: 1,
              color: 'rgba(17, 128, 255, 0)'
            }
          ])
        },
        data
      }
    ]
  }
  // 绘制图表
  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

const drawBarChart = () => {
  const xData = ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋']
  const weekData = [12, 33, 12, 32, 22]
  const monthData = [42, 23, 32, 42, 62]
  const yearData = [112, 133, 112, 132, 122]
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('chart-bar'))

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: '35',
      left: '10',
      right: '20',
      bottom: '10',
      containLabel: true
    },
    legend: {
      right: 20,
      top: 0,
      textStyle: {
        color: 'rgba(0,0,0,0.6)'
      },
      itemWidth: 12,
      itemHeight: 12
    },
    xAxis: {
      type: 'category',
      data: xData,
      // boundaryGap: false,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#c8c8c8'
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: '#e2e2e2'
        }
      },
      axisLabel: {
        // rotate: 40,
        fontSize: '12px',
        color: 'rgba(0,0,0,0.6)'
      }
    },
    yAxis: {
      type: 'value',
      nameGap: 20,
      nameTextStyle: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.4)',
        align: 'center'
      },
      // minInterval: 1,
      axisLine: {
        show: false,
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#ebebeb'
        }
      },
      axisLabel: {
        fontSize: '12px',
        color: 'rgba(0, 0, 0, 0.4)'
      }
    },
    series: [
      {
        name: '本年',
        type: 'bar',
        barWidth: 20,
        barGap: 0.2,
        label: {
          show: true,
          position: 'top'
        },
        tooltip: {
          valueFormatter(value: string) {
            return value + ' 个'
          }
        },
        itemStyle: {
          color: '#2BA471'
        },
        data: yearData
      },
      {
        name: '本月',
        type: 'bar',
        barWidth: 20,
        barGap: 0.2,
        label: {
          show: true,
          position: 'top'
        },
        tooltip: {
          valueFormatter(value: string) {
            return value + ' 个'
          }
        },
        itemStyle: {
          color: '#029CD4'
        },
        data: monthData
      },

      {
        name: '本周',
        type: 'bar',
        barWidth: 20,
        barGap: 0.2,
        label: {
          show: true,
          position: 'top'
        },
        tooltip: {
          valueFormatter(value: string) {
            return value + ' 个'
          }
        },
        itemStyle: {
          color: '#0052D9'
        },
        data: weekData
      }
    ]
  }
  // 绘制图表
  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

const drawPieChart = () => {
  const myChart = echarts.init(document.getElementById('chart-pie'))
  const option = {
    legend: {
      left: 'center',
      data: ['纯文本', '图文类', '视频类'],
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      textStyle: {
        color: '#4E5969'
      },
      itemStyle: {
        borderWidth: 0
      }
    },
    tooltip: {
      show: true,
      trigger: 'item'
    },
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: '40%',
          style: {
            text: '内容量',
            textAlign: 'center',
            fill: '#4E5969',
            fontSize: 14
          }
        },
        {
          type: 'text',
          left: 'center',
          top: '50%',
          style: {
            text: '928,531',
            textAlign: 'center',
            fill: '#1D2129',
            fontSize: 16,
            fontWeight: 500
          }
        }
      ]
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        label: {
          formatter: '{d}%',
          fontSize: 14,
          color: '#4E5969'
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        data: [
          {
            value: [148564],
            name: '纯文本',
            itemStyle: {
              color: '#249EFF'
            }
          },
          {
            value: [334271],
            name: '图文类',
            itemStyle: {
              color: '#313CA9'
            }
          },
          {
            value: [445694],
            name: '视频类',
            itemStyle: {
              color: '#21CCFF'
            }
          }
        ]
      }
    ]
  }
  // 绘制图表
  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;

  .panel {
    width: 100%;
    padding: 16px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  .index-left {
    width: 100%;

    .left-top {
      width: 100%;
      margin-bottom: 16px;

      .top-grid {
        width: 100%;

        .grid-item {
          width: 100%;
          padding: 10px 0 10px 15%;
          border-right: 1px solid var(--color-neutral-3);

          .item-avatar {
            background-color: var(--color-neutral-2);
          }

          .item-suf {
            margin-left: 10px;
            font-size: 12px;
            color: var(--color-neutral-4);
          }

          &:last-of-type {
            border: none;
          }
        }
      }

      .top-chart {
        width: 100%;

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 10px;
        }

        .chart-box {
          width: 100%;
          height: 320px;
        }
      }

      :deep(.arco-divider) {
        border-color: var(--color-neutral-3);
      }
    }

    .left-bottom {
      width: 100%;

      .bottom-chart {
        width: 100%;

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 10px;
        }

        .chart-box {
          width: 100%;
          height: 240px;
        }
      }
    }
  }

  .index-right {
    width: 100%;

    .right-card {
      width: 100%;

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 10px;
      }

      .card-grid {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .grid-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 33.3%;
          height: 70px;
          cursor: pointer;
          font-size: 12px;
          color: #4e5969;
          text-align: center;

          .cell-icon {
            .flex_center();
            width: 30px;
            height: 30px;
            background-color: var(--color-neutral-2);
            border-radius: 4px;
            margin-bottom: 8px;

            .arco-icon {
              color: #4e5969;
            }
          }

          &:hover {
            color: rgb(var(--arcoblue-5));

            .cell-icon {
              background-color: rgb(var(--arcoblue-1));

              .arco-icon {
                color: rgb(var(--arcoblue-5));
              }
            }
          }
        }
      }

      .card-notice {
        width: 100%;

        .notice-item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 24px;
          margin-bottom: 4px;

          .item-text {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 4px;
            color: var(--color-text-2);
            text-decoration: none;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }

      .card-doc {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .doc-item {
          width: 50%;
          margin-bottom: 10px;
        }
      }
    }

  }
}</style>