import React from 'react'

import TestingLayout from 'layouts/testing'
import { useRouter } from 'next/router'
import TestDetail from 'pages/testing/_components/TestPreview'

const TestingReviewPage = () => {
  const router = useRouter()
  const { testId, testGroupId } = router.query
  return <>{testId && <TestDetail testId={testId} testGroupId={testGroupId} mode={2} />}</>
}

TestingReviewPage.getLayout = function getLayout(page) {
  return (
    <>
      {/* <Head>
        <link href='/css/test.css' rel='stylesheet' />
      </Head> */}
      <TestingLayout>{page}</TestingLayout>
    </>
  )
}

export default TestingReviewPage
