<template>
  <div class="index">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>实时监测</span>
            <a-link href="link">管理</a-link>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart" id="map-chart1"></div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>实时监测</span>
            <a-link href="link">查看更多</a-link>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart"></div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>实时监测</span>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart"></div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="12" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>实时监测</span>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart"></div>
          </div>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<!-- If you want the include property of keep-alive to take effect, you must name the component -->
<script setup lang="ts">
/**
 * @desc 实时监测
 * @author changz
 * */

import { onMounted } from 'vue'
// import { useAppStore } from '@/stores/modules/app'
// import ArcoIcon from '@/components/ArcoIcon'
import echarts from '@/utils/echarts'
import mapJson from '@/json/anhui.json'
import type { GeoJSONSourceInput, ToolTipFormatterParams } from '@/types/echarts'

// const store = useAppStore()
interface AreaState {
  [key: string]: any
}
interface MapData {
  name: string
  value: number
}
const areaState: AreaState = {
  合肥市: 130,
  六安市: 122,
  蚌埠市: 89,
  宿州市: 219,
  淮南市: 218
}

onMounted(() => {
  drawMapEchart1(areaState)
})

const drawMapEchart1 = (areaState: AreaState) => {
  const barData: MapData[] = []
  for (const key in areaState) {
    barData.push({
      name: key,
      value: areaState[key]
    })
  }
  const mapData: AreaState = {
    合肥市: [117.37, 31.586],
    六安市: [116.27, 31.786],
    滁州市: [118.07, 32.486],
    蚌埠市: [117.27, 33.086],
    淮南市: [116.67, 32.786],
    宿州市: [117.77, 33.486],
    淮北市: [116.67, 33.686],
    亳州市: [116.27, 33.386],
    阜阳市: [115.57, 32.986],
    安庆市: [116.47, 30.486],
    池州市: [117.47, 30.386],
    黄山市: [118.17, 29.886],
    宣城市: [119.27, 30.916],
    芜湖市: [118.17, 31.186],
    马鞍山市: [118.47, 31.616],
    铜陵市: [117.87, 30.956]
  }

  const convertData = (data: MapData[]) => {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const geoCoord = mapData[data[i].name]
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        })
      }
    }
    return res
  }

  const maxValue = Math.max(...barData.map(el => el.value))
  echarts.registerMap('anhui', mapJson as GeoJSONSourceInput)
  const mapChart = echarts.init(document.getElementById('map-chart1'))
  mapChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      textStyle: {
        color: '#333'
      },
      formatter(params: ToolTipFormatterParams) {
        return `${params.name}  ${areaState[params.name]} 次`
      }
    },
    visualMap: [
      {
        min: 0,
        max: maxValue,
        text: ['高', '低'],
        textStyle: {
          color: '#fff'
        },
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered']
        }
      }
    ],
    geo3D: {
      map: 'anhui',
      // roam: false,
      // boxDepth: 100, // 地图倾斜度
      regionHeight: 4, // 地图厚度
      label: {
        show: true, // 是否显示市
        color: '#000', // 文字颜色
        fontSize: 12 // 文字大小
      },
      itemStyle: {
        color: '#249eff',
        opacity: 1, // 透明度
        borderWidth: 1.5, // 分界线宽度
        borderColor: '#21ccff' // 分界线颜色
      },
      // 区域样式
      regions: [
        {
          name: '合肥市',
          itemStyle: {
            color: '#0b5ab7',
            opacity: 1, // 透明度
            borderWidth: 4, // 分界线宽度
            borderColor: '#40aad8' // 分界线颜色
          }
        }
      ],
      // light: {
      //   main: {
      //     color: '#fff',
      //     intensity: 1,
      //     shadow: true,
      //     alpha: 60,
      //     beta: 20
      //   }
      // },
      // emphasis: {
      //   itemStyle: {
      //     color: '#6becf5'
      //   }
      // },
      groundplane: {
        show: false
      },
      realisticMaterial: {
        detailTexture: '#fff', // 纹理贴图
        textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
        roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
        metalness: 0, // 0材质是非金属 ，1金属
        roughnessAdjust: 0
      },
      viewControl: {
        center: [20, -20, 0], // 旋转中心
        alpha: 40, // x轴
        beta: -40, // y轴
        distance: 120, // 地图视角 控制初始大小
        // panSensitivity: 0, // 禁止平移
        // rotateSensitivity: 0, // 禁止旋转
        // zoomSensitivity: 0 // 禁止缩放
      }
    },
    series: [
      {
        name: 'bar3D',
        type: 'bar3D',
        coordinateSystem: 'geo3D',
        barSize: 3, // 柱子粗细
        shading: 'lambert',
        opacity: 1,
        bevelSize: 0.3,
        label: {
          show: true,
          position: 'top',
          formatter: (params: ToolTipFormatterParams) => {
            return `${barData[params.dataIndex].value} 次`
          },
          color: '#fff',
          fontSize: 12, // 文字大小
          padding: [0, 4],
          alignText: 'center',
          lineHeight: 16,
          backgroundColor: 'rgba(0,0,0,0.32)', // 透明度0清空文字背景
          borderWidth: 1, // 分界线宽度
          borderRadius: 2,
          borderColor: 'rgba(0,0,0,0.4)' // 分界线颜色
        },
        data: convertData(barData)
      }
    ]
  })
  window.addEventListener('resize', () => {
    mapChart.resize()
  })
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;

  .index-card {
    width: 100%;
    padding: 16px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 10px;
    }
    .card-wrap {
      width: 100%;
      height: 320px;
      overflow: hidden;
      .wrap-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>