import { useEffect } from 'react'
import { useAuth } from 'hooks/useAuth'
import { useRouter } from 'next/router'
import Spinner from '@core/components/spinner'

const Home = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
