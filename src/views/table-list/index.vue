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
      <a-table
        row-key="id"
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
      >
        <template #index="{ record, rowIndex }">
          {{ record.key }}-{{ rowIndex }}
        </template>

        <!-- 操作 -->
        <template #operate="{ record }">
          <a-button @click="$modal.info({ title:'Name', content:record.name })">查看</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TableRowSelection, TableColumnData } from '@arco-design/web-vue'

interface FilterData {
  name: string
  age: number
  class: string
  type: undefined | ''
  date: string
  status: undefined | ''
}
interface TableInfo {
  key: string;
  name: string;
  salary: number;
  address: string;
  email: string;
}
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
  onlyCurrent: false
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
        value: 'London',
      }, {
        text: 'Paris',
        value: 'Paris',
      },],
      filter: (value, row) => row.address.includes(value)
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: '操作',
    width: 100,
    slotName: 'operate'
  }
]
const pagination = {
  pageSize: 5
}

tableData.value = [
  { key: '1', name: 'Jane Doe', salary: 23000, address: '32 Park Road, London', email: 'jane.doe@example.com' },
  { key: '2', name: 'Alisa Ross', salary: 25000, address: '35 Park Road, London', email: 'alisa.ross@example.com' },
  { key: '3', name: 'Kevin Sandra', salary: 22000, address: '31 Park Road, London', email: 'kevin.sandra@example.com' },
  { key: '4', name: 'Ed Hellen', salary: 17000, address: '42 Park Road, London', email: 'ed.hellen@example.com' },
  { key: '5', name: 'William Smith', salary: 27000, address: '62 Park Road, London', email: 'william.smith@example.com' }
]
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
  }
}
</style>