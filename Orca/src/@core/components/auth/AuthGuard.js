// ** React Imports
import { useEffect } from 'react'

// ** Hooks Import
import { useAuth } from 'hooks/useAuth'
// ** Next Imports
import { useRouter } from 'next/router'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
