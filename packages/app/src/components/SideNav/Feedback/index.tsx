import React from 'react'
import FeedbackModal from './FeedbackModal'

const Feedback: React.FC = (props) => {
  const {children} = props
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <span
        onClick={() => {
          setVisible(!visible)
        }}
      >
        {children}
      </span>

      <FeedbackModal visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}

export default Feedback
