<template>
  <div class="index">
    <a-row :gutter="[16, 16]">
      <a-col :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>3D地图</span>
            <a-link href="link">管理</a-link>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart" id="map-chart1"></div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>地图插件</span>
            <a-link href="link">查看更多</a-link>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart" id="map-chart2"></div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>全球地图</span>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart" id="map-chart3"></div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="24" :lg="24" :xl="12" :xxl="12">
        <div class="index-card">
          <div class="card-header">
            <span>全球地图-中国</span>
          </div>
          <div class="card-wrap">
            <div class="wrap-chart" id="map-chart4"></div>
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
import echarts from '@/utils/echarts'
import anhuiJson from '@/json/anhui.json'
import mapJson from '@/json/map.json'
import mapJson2 from '@/json/map2.json'
import countryJson from '@/json/country.json'

import type { ToolTipFormatterParams, GeoJSONSourceInput, ECOption } from '@/types/echarts'

interface AreaState {
  [key: string]: any
}
interface MapData {
  name: string
  value: number
}

interface LineData {
  name: string
  value?: number
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
  drawMapEchart2()
  drawMapEchart3()
  drawMapEchart4()
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
  echarts.registerMap('anhui', anhuiJson as GeoJSONSourceInput)
  const mapChart = echarts.init(document.getElementById('map-chart1'))
  mapChart.setOption({
    backgroundColor: '#e0e3e3',
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
        color: '#fff', // 文字颜色
        fontSize: 12 // 文字大小
      },
      itemStyle: {
        color: '#0c274b',
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
        distance: 120 // 地图视角 控制初始大小
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

// 地图
const drawMapEchart2 = () => {
  const idcData: MapData[] = [
    {
      name: '合肥市',
      value: 20
    },
    {
      name: '蚌埠市',
      value: 2
    },
    {
      name: '亳州市',
      value: 34
    },
    {
      name: '池州市',
      value: 11
    }
  ]
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
  const serveMap = echarts.init(document.getElementById('map-chart2'))
  serveMap.setOption({
    tooltip: {
      trigger: 'item',
      formatter(params: ToolTipFormatterParams) {
        return `${params.name}：${idcData[params.dataIndex].value} 个`
      }
    },
    grid: {
      top: 10
    },
    amap: {
      center: [121.4805388, 31.2359290],
      zoom: 4,
      lang: 'zh_cn',
      // 自定义样式 https://lbs.amap.com/api/javascript-api/guide/map/map-style/
      mapStyle: 'amap://styles/whitesmoke'
    },
    series: [
      // {
      //   name: '分布',
      //   type: 'scatter',
      //   coordinateSystem: 'amap',
      //   data: convertData(this.idcData),
      //   symbolSize: function (val) {
      //     return 12
      //   },
      //   encode: {
      //     value: 2
      //   },
      //   label: {
      //     formatter: '{b}',
      //     position: 'right',
      //     show: false
      //   },
      //   emphasis: {
      //     label: {
      //       show: true
      //     }
      //   }
      // },
      {
        name: '分布',
        type: 'effectScatter',
        coordinateSystem: 'amap',
        data: convertData(idcData),
        symbolSize() {
          return 16
        },
        encode: {
          value: 2
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        },
        emphasis: {
          scale: true
        },
        zlevel: 1
      }
    ]
  })
  window.addEventListener('resize', () => {
    serveMap.resize()
  })
  // get AMap extension component
  // const amap = serveMap.getModel().getComponent('amap').getAMap()
  // amap.addControl(new AMap.Scale())
  // amap.addControl(new AMap.ToolBar())
}


const drawMapEchart3 = () => {
  const geoCoordMap: AreaState = {
    安徽: [117.37, 31.586],
    尼日利亚: [-4.388361, 11.186148],
    美国洛杉矶: [-118.24311, 34.052713],
    香港邦泰: [114.195466, 22.282751],
    美国芝加哥: [-87.801833, 41.870975],
    加纳库马西: [-4.62829, 7.72415],
    英国曼彻斯特: [-1.657222, 51.886863],
    德国汉堡: [10.01959, 54.38474],
    哈萨克斯坦阿拉木图: [45.326912, 41.101891],
    俄罗斯伊尔库茨克: [89.116876, 67.757906],
    巴西: [-48.678945, -10.493623],
    埃及达米埃塔: [31.815593, 31.418032],
    西班牙巴塞罗纳: [2.175129, 41.385064],
    柬埔寨金边: [104.88659, 11.545469],
    意大利米兰: [9.189948, 45.46623],
    乌拉圭蒙得维的亚: [-56.162231, -34.901113],
    莫桑比克马普托: [32.608571, -25.893473],
    阿尔及利亚阿尔及尔: [3.054275, 36.753027],
    阿联酋迪拜: [55.269441, 25.204514],
    匈牙利布达佩斯: [17.108519, 48.179162],
    澳大利亚悉尼: [150.993137, -33.675509],
    美国加州: [-121.910642, 41.38028],
    澳大利亚墨尔本: [144.999416, -37.781726],
    墨西哥: [-99.094092, 19.365711],
    加拿大温哥华: [-123.023921, 49.311753]
  }
  const BJData: LineData[][] = [
    [{
      name: '美国洛杉矶',
      value: 2370
    }, {
      name: '安徽'
    }],
    [{
      name: '香港邦泰',
      value: 3130
    }, {
      name: '安徽'
    }],
    [{
      name: '美国芝加哥',
      value: 2350
    }, {
      name: '安徽'
    }],
    [{
      name: '加纳库马西',
      value: 5120
    }, {
      name: '安徽'
    }],
    [{
      name: '英国曼彻斯特',
      value: 3110
    }, {
      name: '安徽'
    }],
    [{
      name: '德国汉堡',
      value: 6280
    }, {
      name: '安徽'
    }]
  ]
  const convertData = (data: LineData[][]) => {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i]
      const fromCoord = geoCoordMap[dataItem[0].name]
      const toCoord = geoCoordMap[dataItem[1].name]
      // 箭头方向
      if (fromCoord && toCoord) {
        res.push([
          {
            coord: toCoord
          },
          {
            coord: fromCoord,
            value: dataItem[0].value
          }
        ])
      }
      // if (fromCoord && toCoord) {
      //   res.push({
      //     fromName: dataItem[0].name,
      //     toName: dataItem[1].name,
      //     coords: [fromCoord, toCoord],
      //     value: dataItem[0].value
      //   })
      // }
    }
    return res
  }

  echarts.registerMap('world', mapJson as GeoJSONSourceInput)
  const mapChart = echarts.init(document.getElementById('map-chart3'))
  const series: ECOption[] = []
  const origin = [['安徽', BJData]]
  origin.forEach((item) => {
    series.push({
      name: item[2],
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, // 箭头指向速度，值越小速度越快
        trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', // 箭头图标
        symbolSize: 5 // 图标大小
      },
      lineStyle: {
        color: '#01e2f6',
        width: 1, // 尾迹线条宽度
        opacity: 1, // 尾迹线条透明度
        curveness: 0.3 // 尾迹线条曲直度
      },
      label: {
        show: false,
        position: 'middle',
        formatter: '{b}'
      },
      data: convertData(item[1] as LineData[][])
    })
    series.push({
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: 'stroke', // 波纹绘制方式 stroke, fill
        scale: 4 // 波纹圆环最大限制，值越大波纹越大
      },
      label: {
        show: true,
        position: 'right', // 显示位置
        offset: [5, 0], // 偏移设置
        formatter: '{b}', // 圆环显示文字
        color: '#fff'
      },
      emphasis: {
        label: {
          show: true
        }
      },
      symbol: 'circle',
      symbolSize() {
        return 5
      },
      itemStyle: {
        show: true,
        color: '#01e2f6'
      },
      data: (item[1] as Array<LineData[]>).map(dataItem => {
        return {
          name: dataItem[0].name,
          value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
        }
      })
    })
    // 被攻击点
    series.push({
      type: 'scatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: 'stroke',
        scale: 4
      },
      label: {
        show: true,
        position: 'right',
        color: '#00ffff',
        formatter: '{b}'
      },
      emphasis: {
        label: {
          show: true
        }
      },
      symbol: 'pin',
      symbolSize: 30,
      itemStyle: {
        show: true,
        color: '#01e2f6'
      },
      data: [{
        name: item[0],
        value: geoCoordMap[item[0] as string].concat([10])
      }]
    })
  })

  mapChart.setOption({
    backgroundColor: '#e0e3e3',
    geo: {
      map: 'world',
      roam: true, // 是否允许缩放
      zoom: 1.2,
      layoutCenter: ['50%', '50%'], // 地图位置
      ayoutSize: '180%',
      // 通过经纬度控制地图显示范围
      // boundingCoords: [
      //   // 定位左上角经纬度
      //   [60, 90],
      //   // 定位右下角经纬度
      //   [120, -20]
      // ],
      // layoutSize: '180%',
      label: {
        show: false
      },
      itemStyle: {
        areaColor: '#0c274b',
        borderColor: '#1cccff'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#2a333d' // 鼠标悬浮背景色
        }
      },
      tooltip: {
        show: false
      }
    },
    series
  })
  window.addEventListener('resize', () => {
    mapChart.resize()
  })
}

const drawMapEchart4 = () => {
  const attach_country: string[] = ['美国', '意大利', '法国', '俄罗斯', '希腊', '澳大利亚']
  countryJson['安徽'] = [117.37, 31.586]
  const geoCoordMap = countryJson

  for (const key in geoCoordMap) {
    const coordX = geoCoordMap[key][0]
    if (coordX <= -30) {
      geoCoordMap[key][0] = 360 + coordX
    }
  }
  const BJData: LineData[][] = [
    // [{
    //   name: '韩国',
    //   value: 2370
    // }, {
    //   name: '安徽'
    // }]
  ]
  attach_country.forEach(item => {
    const arr = [
      {
        name: item,
        value: 0
      },
      {
        name: '安徽'
      }
    ]
    BJData.push(arr)
  })
  const convertData = (data: LineData[][]) => {
    const res = []
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i]
      const fromCoord = geoCoordMap[dataItem[0].name]
      const toCoord = geoCoordMap[dataItem[1].name]
      // 箭头方向
      if (fromCoord && toCoord) {
        res.push([
          {
            coord: fromCoord,
            value: dataItem[0].value
          },
          {
            coord: toCoord
          }
        ])
      }
      // if (fromCoord && toCoord) {
      //   res.push({
      //     fromName: dataItem[0].name,
      //     toName: dataItem[1].name,
      //     coords: [fromCoord, toCoord],
      //     value: dataItem[0].value
      //   })
      // }
    }
    return res
  }

  echarts.registerMap('world', mapJson2 as unknown as GeoJSONSourceInput)
  const serveMap = echarts.init(document.getElementById('map-chart4'))
  const series: ECOption[] = []
  const origin = [['安徽', BJData]]
  origin.forEach((item) => {
    series.push({
      name: item[0],
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 4, // 箭头指向速度，值越小速度越快
        trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', // 箭头图标
        symbolSize: 5 // 图标大小
      },
      lineStyle: {
        color: '#05e0b0',
        width: 1, // 尾迹线条宽度
        opacity: 1, // 尾迹线条透明度
        curveness: 0.3 // 尾迹线条曲直度
      },
      label: {
        show: false,
        position: 'middle',
        formatter: '{b}'
      },
      data: convertData(item[1] as LineData[][])
    })
    series.push({
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: 'stroke', // 波纹绘制方式 stroke, fill
        scale: 4 // 波纹圆环最大限制，值越大波纹越大
      },
      label: {
        show: true,
        position: 'right', // 显示位置
        offset: [5, 0], // 偏移设置
        formatter: '{b}', // 圆环显示文字
        color: '#fff'
      },
      symbol: 'circle',
      symbolSize() {
        return 5
      },
      itemStyle: {
        show: true,
        color: '#01e2f6'
      },
      data: (item[1] as Array<LineData[]>).map(function (dataItem) {
        return {
          name: dataItem[0].name,
          value: geoCoordMap[dataItem[0].name] ? geoCoordMap[dataItem[0].name].concat([dataItem[0].value]) : 0
        }
      })
    })
    // 被攻击点
    series.push({
      type: 'scatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        period: 4,
        brushType: 'stroke',
        scale: 4
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{b}',
        color: '#fff'
      },
      symbol: 'pin',
      symbolSize: 30,
      itemStyle: {
        show: true,
        color: '#01e2f6'
      },
      data: [{
        name: item[0],
        value: geoCoordMap[item[0] as string].concat([10])
      }]
    })
  })

  serveMap.setOption({
    backgroundColor: '#e0e3e3',
    geo: {
      map: 'world',
      roam: true, // 是否允许缩放
      zoom: 1.2,
      layoutCenter: ['50%', '52%'],
      // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
      layoutSize: '120%',
      // 通过经纬度控制地图显示范围
      // boundingCoords: [
      //   // 定位左上角经纬度
      //   [60, 90],
      //   // 定位右下角经纬度
      //   [120, -20]
      // ],
      // layoutSize: '180%',
      label: {
        show: false
      },
      itemStyle: {
        areaColor: '#0c274b',
        borderColor: '#59eafe',
        borderWidth: 0,
        borderJoin: 'round',
        shadowColor: '#65edfa', // 外发光
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        shadowBlur: 2 // 图形阴影的模糊大小
      },
      emphasis: {
        label: {
          color: '#fff'
        },
        itemStyle: {
          areaColor: '#18a6ce' // 鼠标悬浮背景色
        }
      },
      tooltip: {
        show: false
      }
    },
    // geo3D: {
    //   map: 'world',
    //   roam: false,
    //   // boxDepth: 80, // 地图倾斜度
    //   regionHeight: 2, // 地图厚度
    //   label: {
    //     show: true, // 是否显示市
    //     color: '#fff', // 文字颜色
    //     fontSize: 16 // 文字大小
    //   },
    //   itemStyle: {
    //     color: '#4287eb',
    //     opacity: 1, // 透明度
    //     borderWidth: 1.5, // 分界线宽度
    //     borderColor: '#59eafe' // 分界线颜色
    //   },
    //   groundplane: {
    //     show: false
    //   },
    //   realisticMaterial: {
    //     detailTexture: '#fff', // 纹理贴图
    //     textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
    //     roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
    //     metalness: 0, // 0材质是非金属 ，1金属
    //     roughnessAdjust: 0
    //   },
    //   viewControl: {
    //     // center: [20, -25, 0], // 旋转中心
    //     alpha: 70, // x轴
    //     // beta: -22, // y轴
    //     distance: 65, // 地图视角 控制初始大小
    //     panSensitivity: 0, // 禁止平移
    //     rotateSensitivity: 0, // 禁止旋转
    //     zoomSensitivity: 0 // 禁止缩放
    //   }
    // },
    series
  })
  window.addEventListener('resize', () => {
    serveMap.resize()
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
      height: 35vh;
      overflow: hidden;
      .wrap-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>