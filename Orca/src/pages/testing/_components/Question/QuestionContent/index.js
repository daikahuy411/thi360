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
            {file.MediaType == 'image' && <img src={file.downloadLink} />}
            {file.mediaType == 'audio' && (
              <>
                <audio autoplay controls src={file.downloadLink}>
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
          </div>
        ))}
    </>
  )
}

export default QuestionContent
