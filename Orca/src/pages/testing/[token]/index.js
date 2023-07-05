import React from "react";
import TestingLayout from "layouts/testing";
import TestDetail from "pages/testing/_components/TestDetails";
import { useRouter } from 'next/router'
import Head from 'next/head'

const TestingPage = () => {
  const router = useRouter()
  const { token } = router.query

  return (
    <>
      {token && (
        <TestDetail token={token} mode={1} />
      )}
    </>
  );
};

// TestingPage.PageLayout = TestingLayout;

TestingPage.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <link href="/css/test.css" rel="stylesheet" />
      </Head>
      <TestingLayout>{page}</TestingLayout>
    </>
  )
}

export default TestingPage;
