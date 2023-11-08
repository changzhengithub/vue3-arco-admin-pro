export interface FormListData {
  name: string
  type: number | undefined
}

export interface FormList {
  formData: FormListData
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