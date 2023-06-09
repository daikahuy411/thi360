// ** React Imports
import { useEffect } from 'react'

// ** Hook Imports
import { useAuth } from 'hooks/useAuth'
// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from '@core/components/spinner'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = roles => {
  if (roles.length === 0) return '/acl'
  else return '/dashboards/crm'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.user && auth.user.roles) {
      const homeRoute = getHomeRoute(auth.user.roles)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
