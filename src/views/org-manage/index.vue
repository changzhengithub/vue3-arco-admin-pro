<template>
  <div class="index">
    <div class="index-main">
      <!-- <div class="main-header">
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
      </div> -->
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
          <!-- 类型 -->
          <template #role_id="{ record }">
            <a-tag v-if="record.role_id == 1" color="blue">管理员</a-tag>
            <a-tag v-if="record.role_id == 2" color="blue">普通用户</a-tag>
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
    <!-- <EditUser v-if="addDataDialog.visible" :recordData="addDataDialog.record" @CLOSE_EVENT="closeDialog"></EditUser> -->
  </div>
</template>

<script setup lang="ts" name="OrgManage">
/**
 * @desc 组织部门
 * @author changz
 * */

import { ref, reactive } from 'vue'
import { deepClone } from '@/utils/util'
import orgList from '@/json/org.json'

import type { TableRowSelection, TableColumnData } from '@arco-design/web-vue'
import type { TableInfo } from './types'

// import EditUser from './components/EditUser.vue'

const selectedKeys = ref<string[]>([])
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true
})
const tableLoad = ref(false)
const tableData = ref<TableInfo[]>(orgList)
const tableColumn: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 100,
    align: 'center'
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Role',
    dataIndex: 'role_id',
    slotName: 'role_id'
  },
  {
    title: 'Account',
    dataIndex: 'username'
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
// const closeDialog = (obj: any) => {
//   console.log(obj)
//   if (obj) {
//     tableData.value.push(obj)
//   }
//   addDataDialog.visible = false
// }
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