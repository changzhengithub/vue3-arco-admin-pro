<template>
  <div class="index">
    <div class="index-header">
      <a-row :gutter="24">
        <a-col :span="20">
          <a-row :gutter="[24, 20]">
            <a-col :span="8">
              <a-row align="center">
                <a-col :span="6">
                  <span>集合编号</span>
                </a-col>
                <a-col :span="18">
                  <a-input v-model="filterInfo.name" placeholder="请输入" allow-clear />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-row align="center">
                <a-col :span="6">
                  <span>集合数量</span>
                </a-col>
                <a-col :span="18">
                  <a-input-number v-model="filterInfo.age" placeholder="请输入" :min="0" :max="100" />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-row align="center">
                <a-col :span="6">
                  <span>集合名称</span>
                </a-col>
                <a-col :span="18">
                  <a-input v-model="filterInfo.class" placeholder="请输入" allow-clear />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-row align="center">
                <a-col :span="6">
                  <span>内容体裁</span>
                </a-col>
                <a-col :span="18">
                  <a-select v-model="filterInfo.type" placeholder="请选择">
                    <a-option value="1">Beijing</a-option>
                    <a-option value="2">Shanghai</a-option>
                    <a-option value="3">Guangzhou</a-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-row align="center">
                <a-col :span="6">
                  <span>创建时间</span>
                </a-col>
                <a-col :span="18">
                  <a-date-picker v-model="filterInfo.date" :style="{ width: '100%' }" placeholder="请选择" />
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-row align="center">
                <a-col :span="6">
                  <span>状态</span>
                </a-col>
                <a-col :span="18">
                  <a-select v-model="filterInfo.status" placeholder="请选择">
                    <a-option value="1">在线</a-option>
                    <a-option value="2">离线</a-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-divider direction="vertical" :style="{ height: '84px' }" />
        <a-col :span="3">
          <a-space direction="vertical" :size="20">
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              <template #default>查询</template>
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              <template #default>重置</template>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="index-main">
      <div class="main-header">
        <a-space >
          <a-button type="primary" @click="openAddData">
            <template #icon>
              <icon-plus />
            </template>
            <template #default>添加</template>
          </a-button>
          <a-button :disabled="!selectedKeys.length">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>批量删除</template>
          </a-button>
        </a-space>
      </div>
      <div class="main-table">
        <a-table
          row-key="key"
          hoverable
          stripe
          column-resizable
          :bordered="{cell: true}"
          :loading="tableLoad"
          :columns="tableColumn"
          :data="tableData"
          :row-selection="rowSelection"
          :scroll="{minWidth: 1200}"
          v-model:selectedKeys="selectedKeys"
          :pagination="pagination"
          page-position="bottom"
          @page-change="pageChange"
          @page-size-change="pageSizeChange"
        >
          <template #index="{ record, rowIndex }">
            {{ record.key }}-{{ rowIndex }}
          </template>

          <!-- 类型 -->
          <template #type="{ record }">
            <a-tag v-if="record.type == 1" color="blue">类型1</a-tag>
            <a-tag v-if="record.type == 2" color="orange">类型2</a-tag>
          </template>

          <!-- 操作 -->
          <template #operate="{ record }">
            <a-link @click="editData(record)">编辑</a-link>
            <a-popconfirm content="确认删除该数据?" type="error" @before-ok="done => delData(done, record)">
              <a-link status="danger">删除</a-link>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>

    <!-- 添加用户 -->
    <AddData v-if="addDataDialog.visible" :recordData="addDataDialog.record" @CLOSE_EVENT="closeDialog"></AddData>
  </div>
</template>

<script setup lang="ts" name="TableList">
/**
 * @desc 列表页
 * @author changz
 * */

import { ref, reactive } from 'vue'
import { deepClone } from '@/utils/util'

import type { TableRowSelection, TableColumnData } from '@arco-design/web-vue'
import type { FilterData, TableInfo } from './types'

import AddData from './components/AddData.vue'


const filterInfo = reactive<FilterData>({
  name: '',
  age: 0,
  class: '',
  type: undefined,
  date: '',
  status: ''
})

const selectedKeys = ref<string[]>([])
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true
})
const tableLoad = ref(false)
const tableData = ref<TableInfo[]>([])
const tableColumn: TableColumnData[] = [
  {
    title: '序号',
    dataIndex: 'key',
    fixed: 'left',
    width: 100,
    align: 'center',
    slotName: 'index'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    slotName: 'type'
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    sortable: {
      sortDirections: ['ascend']
    }
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true,
    filterable: {
      filters: [{
        text: 'London',
        value: 'London'
      }, {
        text: 'Paris',
        value: 'Paris'
      }],
      filter: (value, row) => row.address.includes(value)
    }
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: '操作',
    width: 120,
    slotName: 'operate'
  }
]
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showPageSize: true,
  showTotal: true,
  showJumper: true,
  pageSizeOptions: [10, 20, 30, 40, 50]
})

tableData.value = [
  { key: '1', name: 'Jane Doe', salary: 23000, type: 1, address: '32 Park Road, London', email: 'jane.doe@example.com' },
  { key: '2', name: 'Alisa Ross', salary: 25000, type: 2, address: '35 Park Road, London', email: 'alisa.ross@example.com' },
  { key: '3', name: 'Kevin Sandra', salary: 22000, type: 1, address: '31 Park Road, London', email: 'kevin.sandra@example.com' },
  { key: '4', name: 'Ed Hellen', salary: 17000, type: 1, address: '42 Park Road, London', email: 'ed.hellen@example.com' }
]
pagination.total = tableData.value.length

// 页面改变
const pageChange = (page: number) => {
  pagination.current = page
}
// 页码值改变时
const pageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
}


// 增删改
const addDataDialog = reactive({
  visible: false,
  record: {} as TableInfo
})
const openAddData = () => {
  addDataDialog.visible = true
}
const editData = (record: TableInfo) => {
  addDataDialog.visible = true
  addDataDialog.record = deepClone(record) as TableInfo
}
const delData = (done: any, record: TableInfo) => {
  console.log(record)
  setTimeout(() => {
    done()
  }, 2000)
}
const closeDialog = (obj: any) => {
  console.log(obj)
  if (obj) {
    tableData.value.push(obj)
  }
  addDataDialog.visible = false
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  .index-header {
    width: 100%;
    margin-bottom: 20px;
  }
  .index-main {
    width: 100%;
    .main-header {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>