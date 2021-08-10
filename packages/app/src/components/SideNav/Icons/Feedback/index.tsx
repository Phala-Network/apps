import React from 'react'
import FeedbackModal from './FeedbackModal'

const Feedback: React.FC = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <svg
        onClick={() => {
          setVisible(!visible)
        }}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 14V3.33333C2 2.59695 2.59695 2 3.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V10C14 10.7364 13.403 11.3333 12.6667 11.3333H6C5.71142 11.3328 5.43054 11.4264 5.2 11.6L2 14ZM6.00002 6H4.66669V7.33333H6.00002V6ZM7.33335 6H8.66669V7.33333H7.33335V6ZM10 6H11.3334V7.33333H10V6Z"
        />
      </svg>

      <FeedbackModal visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}

export default Feedback
