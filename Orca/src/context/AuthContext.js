// ** React Imports
import {
  createContext,
  useEffect,
  useState
} from 'react'

// ** Axios
import axios from 'axios'
// ** Config
import authConfig from 'configs/auth'
// ** Next Import
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyActivateCode: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      setUser(JSON.parse(window.localStorage.getItem('userData')))
      setLoading(false);

      //TODO: create new endpoint to get current profile
      // if (storedToken) {
      //   setLoading(true)
      //   await axios
      //     .get(authConfig.meEndpoint, {
      //       headers: {
      //         Authorization: storedToken
      //       }
      //     })
      //     .then(async response => {
      //       setLoading(false)
      //       setUser({ ...response.data.userData })
      //     })
      //     .catch(() => {
      //       localStorage.removeItem('userData')
      //       localStorage.removeItem('refreshToken')
      //       localStorage.removeItem('accessToken')
      //       setUser(null)
      //       setLoading(false)
      //       if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
      //         router.replace('/login')
      //       }
      //     })
      // } else {
      //   setLoading(false)
      // }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(`${authConfig.baseApiUrl}${authConfig.loginEndpoint}`, params)
      .then(async response => {
        if (!response.data.isSuccess) {
          if (errorCallback) {
            errorCallback(err)
            return
          }
        }
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.value.token)
        // params.rememberMe
        //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.value.token)
        //   : null
        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.value })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.value)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(`${authConfig.baseApiUrl}${authConfig.registerEndpoint}`, params)
      .then(res => {
        const response = res.data
        if (response.error) {
          if (errorCallback) errorCallback(response.error)
        } else {
          router.push(`verify-account/${response.token}`)
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const handleActivateCode = (params, errorCallback) => {
    axios
      .post(`${authConfig.baseApiUrl}${authConfig.verifyActivateCodeEndpoint}`, params)
      .then(res => {
        const response = res.data
        console.log('response-hahahaha:', response)
        if (!response.isSuccess) {
          if (errorCallback) errorCallback(response)
        } else {
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.value.token)
          window.localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(response.value))
          setUser({ ...response.value })
          toast.success('Chào mừng bạn đến với Thi360.com')
          router.push('/')
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    verifyActivateCode: handleActivateCode
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
