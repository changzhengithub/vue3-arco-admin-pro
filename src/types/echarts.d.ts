/**
 * echarts类型声明扩展
 * @desc 按需加载，不做全局声明，只在文件中使用引入
 * */

import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption, LineSeriesOption, EffectScatterSeriesOption, ScatterSeriesOption, LinesSeriesOption } from 'echarts/charts'
import type { TitleComponentOption, TooltipComponentOption, GridComponentOption, DatasetComponentOption } from 'echarts/components'
import type { CallbackDataParams } from 'echarts/types/dist/shared'

interface ToolTipFormatterParams extends CallbackDataParams {
  axisDim: string
  axisIndex: number
  axisType: string
  axisId: string
  axisValue: string
  axisValueLabel: string
}

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption< | BarSeriesOption | LineSeriesOption | TitleComponentOption | TooltipComponentOption | EffectScatterSeriesOption | ScatterSeriesOption | LinesSeriesOption | GridComponentOption | DatasetComponentOption >

// geo数据
declare type GeoSVGSourceInput = string | Document | SVGElement
declare type GeoJSONSourceInput = string | GeoJSON | GeoJSONCompressed

interface GeoJSON extends GeoJSONFeatureCollection<GeoJSONGeometry> {}
interface GeoJSONCompressed extends GeoJSONFeatureCollection<GeoJSONGeometryCompressed> {
  UTF8Encoding?: boolean
  UTF8Scale?: number
}
interface GeoJSONFeatureCollection<G> {
  type: 'FeatureCollection'
  features: GeoJSONFeature<G>[]
}
interface GeoJSONFeature<G = GeoJSONGeometry> {
  type: 'Feature'
  id?: string | number
  properties: {
    name?: string
    cp?: number[]
    [key: string]: any
  }
  geometry: G
}
declare type GeoJSONGeometry =
  | GeoJSONGeometryPoint
  | GeoJSONGeometryMultiPoint
  | GeoJSONGeometryLineString
  | GeoJSONGeometryMultiLineString
  | GeoJSONGeometryPolygon
  | GeoJSONGeometryMultiPolygon
declare type GeoJSONGeometryCompressed =
  | GeoJSONGeometryPolygonCompressed
  | GeoJSONGeometryMultiPolygonCompressed
  | GeoJSONGeometryLineStringCompressed
  | GeoJSONGeometryMultiLineStringCompressed
interface GeoJSONGeometryPoint {
  type: 'Point'
  coordinates: number[]
}
interface GeoJSONGeometryMultiPoint {
  type: 'MultiPoint'
  coordinates: number[][]
}
interface GeoJSONGeometryLineString {
  type: 'LineString'
  coordinates: number[][]
}
interface GeoJSONGeometryLineStringCompressed {
  type: 'LineString'
  coordinates: string
  encodeOffsets: number[]
}
interface GeoJSONGeometryMultiLineString {
  type: 'MultiLineString'
  coordinates: number[][][]
}
interface GeoJSONGeometryMultiLineStringCompressed {
  type: 'MultiLineString'
  coordinates: string[]
  encodeOffsets: number[][]
}
interface GeoJSONGeometryPolygon {
  type: 'Polygon'
  coordinates: number[][][]
}
interface GeoJSONGeometryPolygonCompressed {
  type: 'Polygon'
  coordinates: string[]
  encodeOffsets: number[][]
}
interface GeoJSONGeometryMultiPolygon {
  type: 'MultiPolygon'
  coordinates: number[][][][]
}
interface GeoJSONGeometryMultiPolygonCompressed {
  type: 'MultiPolygon'
  coordinates: string[][]
  encodeOffsets: number[][][]
}
