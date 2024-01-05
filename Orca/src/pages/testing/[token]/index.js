import React from 'react'

import TestingLayout from 'layouts/testing'
import { useRouter } from 'next/router'
import TestDetail from 'pages/testing/_components/TestDetails'

const TestingPage = () => {
  const router = useRouter()
  const { token } = router.query

  return <>{token && <TestDetail token={token} mode={1} />}</>
}

TestingPage.getLayout = function getLayout(page) {
  return (
    <>
      <TestingLayout>{page}</TestingLayout>
    </>
  )
}

export default TestingPage
