import { useEffect } from 'react'

import { useRouter } from 'next/router'
import UserProfile from 'pages/user-profile/UserProfile'

const UserProfilePage = () => {
    const router = useRouter()
    const { tab } = router.query

    useEffect(() => {
        if (!router.isReady) {
            return
        }
    }, [tab])

    return <UserProfile tab={tab} data={null} />
}

export default UserProfilePage;