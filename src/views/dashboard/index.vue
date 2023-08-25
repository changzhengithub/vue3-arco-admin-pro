<template>
  <div class="index">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="24" :lg="12" :xl="20">
        <div class="index-left">
          <div class="left-top panel">
            <a-typography-title :heading="5" style="margin-top: 0">
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
              <div class="chart-line" id="chart-line">
                <h1>{{ title }}</h1>
                <h2>主题颜色：{{ store.appName }}</h2>
                <ArcoIcon icon="icon-tag" size="30" :style="{ color: 'blue' }"></ArcoIcon>

                <icon-font type="icon-CEO-female" :size="30" />
              </div>
            </div>
          </div>
          <div class="left-bottom">
            <a-row :gutter="[16, 16]">
              <a-col :span="12">
                <div class="bottom-bar panel"></div>
              </a-col>
              <a-col :span="12">
                <div class="bottom-pie panel"></div>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="12" :xl="4">
        <div class="index-right panel">
          <a-space>
            <a-button type="primary" >深色主题</a-button>
            <a-button type="outline" >浅色主题</a-button>
          </a-space>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts">
/**
 * @desc 仪表盘
 * @author changz
 * */

import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import ArcoIcon from '@/components/ArcoIcon'

import * as echarts from 'echarts'

const store = useAppStore()

const title = ref<string>('首页')

onMounted(() => {
  drawLineChart()
})

const drawLineChart = () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('chart-line'))
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
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
          padding: 5px 0 5px 15%;
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

        .chart-line {
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
    }
  }
}</style>