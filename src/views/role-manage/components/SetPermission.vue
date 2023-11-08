<template>
  <a-modal :visible="true" title="权限设置" :width="600" title-align="start" @cancel="closeDialog" :mask-closable="false" unmountOnClose>
    <a-spin :loading="loading" :style="{width: '100%'}">
      <div class="permission-table">
        <div class="table-header">
          <div class="header-module">
            <span>查看权限</span>
            <a-checkbox v-model="moduleCheck" style="margin-left: 15px;" @change="checkAllPerm">全选</a-checkbox>
          </div>
          <div class="header-control">操作权限</div>
        </div>
        <div class="table-body">
          <div class="body-row" v-for="(page, index) in permissionList" :key="index">
            <div class="row-module">
              <a-checkbox v-model="page.isCheck" :disabled="page.isDisable" :indeterminate="page.indeterminate" @change="() => checkPage(page)">
                {{ page.title }}
              </a-checkbox>
            </div>
            <div class="row-control">
              <div class="control-check" v-if="page.operateList.length">
                <div class="check-box" v-show="operate.isShow" v-for="(operate, i) in page.operateList" :key="i">
                  <a-checkbox v-model="operate.isCheck" @change="() => checkOperate(page)">
                    {{ operate.title }}
                  </a-checkbox>
                </div>
              </div>
              <a-tag v-else color="orange">无操作权限</a-tag>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
    <template #footer>
      <a-button @click="closeDialog">取消</a-button>
      <a-button type="primary" :loading="saveLoad" @click="confirmSubmit">确认</a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
/**
 * @description 设置角色权限
 * @author
 * */
import { ref, onMounted } from 'vue'
import useGlobalProperties from '@/hooks/globalProperties'

import { permissionList, type PermissionList } from '@/json/permission.json'

const { global } = useGlobalProperties()

const loading = ref(false) // 加载中
const saveLoad = ref(false) // 保存中
const moduleCheck = ref(false)
const roleMenuList = ref<string[]>(['table_list', 'org_manage', 'role_manage'])
const roleOperateList = ref<string[]>([])

// 接收参数
const props = defineProps<{
  id?: string
}>()

// 定义事件
const emit = defineEmits<{
  'CLOSE_EVENT': []
}>()

onMounted(() => {
  console.log(props.id)
  setPermission()
})


// 设置已选权限
const setPermission = () => {
  permissionList.value.forEach(page => {
    const permList = page.permList.map(el => el.perm)
    if (roleMenuList.value.includes(permList[0])) {
      page.isCheck = true
    } else {
      page.isCheck = false
    }
    if (page.operateList.length) {
      page.operateList.forEach(ele => {
        if (roleOperateList.value.includes(ele.perm)) {
          ele.isCheck = true
        } else {
          ele.isCheck = false
        }
      })
    }
  })
  console.log(permissionList)
}

// 页面权限
const checkPage = (page: PermissionList) => {
  const isCheck = page.isCheck
  page.indeterminate = false
  page.operateList.forEach(item => {
    item.isCheck = isCheck
  })
  moduleCheck.value = permissionList.value.every(item => item.isCheck)
}
// 操作权限
const checkOperate = (page: PermissionList) => {
  const hasSelect = page.operateList.some(item => item.isCheck)
  if (hasSelect) page.isCheck = true
}

// 首页模块
const checkAllPerm = () => {
  permissionList.value.forEach(item => {
    item.isCheck = moduleCheck.value
    item.operateList.forEach(el => {
      el.isCheck = moduleCheck.value
    })
  })
}


// 弹出层取消操作
const closeDialog = () => {
  emit('CLOSE_EVENT')
}

// 确认添加
const confirmSubmit = () => {
  const checkPageList = permissionList.value.filter(item => item.isCheck)
  const menu_perm = checkPageList.map(item => ({ perm: item.permList, title: item.title }))
  const checkOperateList = checkPageList.flatMap(item => item.operateList)
  const operate_perm = checkOperateList.filter(item => item.isCheck).map(item => ({ perm: item.perm, title: item.title }))
  // console.log(menu_perm)
  // console.log(operate_perm)

  const params = {
    menu_perm,
    operate_perm
  }
  saveLoad.value = true
  setTimeout(() => {
    saveLoad.value = false
    global?.$message.success('操作成功')
    console.log(params)
    emit('CLOSE_EVENT')
  }, 2000)
}
</script>
<style lang="less" scoped>
.permission-table {
  width: 100%;
  border: 1px solid #ddd;

  .table-header {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #ddd;

    .header-module {
      position: relative;
      display: flex;
      align-items: center;
      width: 35%;
      padding: 10px 20px 10px 25px;

      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 9;
        content: '';
        height: 20px;
        border-left: 1px solid #ddd;
        transform: translateY(-50%);
      }
    }

    .header-control {
      width: 65%;
      padding: 10px 20px 10px 25px;
    }
  }

  .table-body {
    width: 100%;

    .body-row {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ddd;

      &:last-of-type {
        border-bottom: none;
      }

      .row-module {
        position: relative;
        width: 35%;
        padding: 10px 20px;

        &::after {
          position: absolute;
          top: 50%;
          z-index: 9;
          right: 0;
          content: '';
          height: 20px;
          border-left: 1px solid #ddd;
          transform: translateY(-50%);
        }
      }

      .row-control {
        width: 65%;
        padding: 10px 20px;

        .control-check {
          display: flex;
          flex-wrap: wrap;
          width: 100%;

          .check-box {
            width: 33.3%;
          }
        }
      }
    }
  }
}</style>