
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
  id: number
  name: string
  username: string
  password: string
  role_id: number
}