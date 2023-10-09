
// 筛选条件
export interface FilterData {
  name: string
  age: number
  class: string
  type: undefined | ''
  date: string
  status: undefined | ''
}

// table数据
export interface TableInfo {
  key: string
  name: string
  salary: number
  address: string
  email: string
  type: number | undefined
}