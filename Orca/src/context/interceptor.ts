import axios from 'axios'
import authConfig from 'src/configs/auth'

class Interceptor {
  initialize = (store: any) => {
    // Add a request interceptor
    axios.interceptors.request.use(
      config => {
        const token = window.localStorage.getItem(authConfig.storageTokenKeyName)
        if (token && config && config.headers) {
          config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
      },
      error => {
        Promise.reject(error)
      }
    )
  }
}

export default Interceptor
