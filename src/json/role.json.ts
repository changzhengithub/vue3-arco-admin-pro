import { ref } from 'vue'

interface RoleInfo {
  id: number
  name: string
  userList: UserInfo[]
  role_id: number
}

const roleList = ref<RoleInfo[]>([
  { id: 1, name: '超级管理员', userList: [], role_id: 1 },
  { id: 2, name: '普通用户', userList: [], role_id: 2 }
])
export default roleList