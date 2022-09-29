import { defineStore } from 'pinia'
import md5 from 'md5'
import { loginUser, getProfile, registerUser } from '@/api/sys'
import { message } from '@/libs'

export interface UserState {
  token: string
  userInfo: any
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): any {
      return this.userInfo
    }
  },
  actions: {
    /**
     * 保存 token
     */
    setToken(newToken: string) {
      this.token = newToken
    },
    /**
     * 保存用户信息
     */
    setUserInfo(newInfo: {}) {
      this.userInfo = newInfo
    },
    /**
     * 注册
     */
    async register(payload: any) {
      const { password } = payload
      // 注册
      const { data } = await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    },
    /**
     * 登录
     */
    async login(payload: any) {
      const { password } = payload
      const { data } = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      this.setToken(data.token)
      this.profile(payload)
    },
    /**
     * 获取用户信息
     */
    async profile(payload: any) {
      const { data } = await getProfile()
      // 欢迎
      message('success', `欢迎您 ${data.vipLevel ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname : data.nickname} `, 6000)
    },
    /**
     * 退出登录
     */
    logout() {
      this.setToken('')
      this.setUserInfo({})
      // 退出登录之后，重新刷新下页面，因为对于前台项目而言，用户是否登录（是否为 VIP）看到的数据可能不同
      location.reload()
    }
  }
})
