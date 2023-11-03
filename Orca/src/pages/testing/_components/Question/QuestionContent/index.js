import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import ReactHtmlParser from 'react-html-parser'

const QuestionContent = ({ question }) => {
  return (
    <>
      <div>{ReactHtmlParser(question.content)}</div>
      {question.files &&
        question.files.map((file, index) => (
          <div key={index}>
             {file.mediaType == 'audio' && (
              <>
                <audio autoPlay controls src={file.downloadLink}>
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </>
              // <ReactAudioPlayer
              //   src={`http://localhost/${file.DownloadLink}`}
              //   autoPlay
              //   controls
              // />
            )}
            {file.mediaType == 'image' && <img src={file.downloadLink} />}
          </div>
        ))}
    </>
  )
}

export default QuestionContent
