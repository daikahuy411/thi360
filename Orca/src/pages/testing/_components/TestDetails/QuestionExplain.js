import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const QuestionExplain = ({ explain }) => {
  return (
    <>
      {explain && (
        <div className='flex flex-column'>
          <h3 className='mb2'>Giải thích:</h3>
          <div className='flex flex-row-l flex-column'>
            <div tabIndex='0' className='gray mb2 mock-test-content w-100 flex flex-column flex-shrink-0 '>
              <p>{ReactHtmlParser(explain)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QuestionExplain
