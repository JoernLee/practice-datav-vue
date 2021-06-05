import axios from 'axios'

// 返回的service是一个函数
const service = axios.create({
  // 慕课防盗版通用请求域
  baseURL: 'https://apis.imooc.com',
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    console.log(response)
    if (response.status === 200 && response.data) {
      // 简单处理，一般接口还需要考虑code或msg字段的内容看看能不能取数据
      return response.data
    } else {
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
