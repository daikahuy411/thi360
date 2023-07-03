import React from "react";
import TestingLayout from "layouts/testing";
import TestDetail from "pages/testing/_components/TestDetails";
import { useRouter } from 'next/router'

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

TestingPage.PageLayout = TestingLayout;

export default TestingPage;
