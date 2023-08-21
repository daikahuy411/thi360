import { useEffect } from 'react'

import { useRouter } from 'next/router'
import UserProfile from 'pages/apps/user-profile/UserProfile'

const UserProfilePage = () => {
    const router = useRouter()
    const { tab } = router.query

    useEffect(() => {
        if (!router.isReady) {
            return
        }
        console.log('tab:', tab)
    }, [tab])

    return <UserProfile tab={'profile'} data={null} />
}

export default UserProfilePage;