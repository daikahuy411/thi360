import React from 'react'

import TestingLayout from 'layouts/testing'
import { useRouter } from 'next/router'
import TestDetail from 'pages/testing/_components/TestPreview'

const TestingReviewPage = () => {
  const router = useRouter()
  const { catalogId, questionId } = router.query
  return <>{questionId && <TestDetail questionId={questionId} catalogId={catalogId} />}</>
}

TestingReviewPage.getLayout = function getLayout(page) {
  return (
    <>
      <TestingLayout>{page}</TestingLayout>
    </>
  )
}

export default TestingReviewPage
