import React, {useState} from 'react'
import {
  CloseIcon,
  Container,
  Content,
  NotificationIcon,
} from './styledComponents'

export const Announcement: React.FC = (props) => {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  function close() {
    setClosed(true)
  }

  return (
    <Container>
      <NotificationIcon>
        <svg
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 0.5C5.56818 0.5 0 6.06818 0 13C0 19.9318 5.56818 25.5 12.5 25.5C19.4318 25.5 25 19.9318 25 13C25 6.06818 19.4318 0.5 12.5 0.5ZM14.2045 20.9545H10.7955V11.8636H14.2045V20.9545ZM12.5 9.59091C11.25 9.59091 10.2273 8.56818 10.2273 7.31818C10.2273 6.06818 11.25 5.04545 12.5 5.04545C13.75 5.04545 14.7727 6.06818 14.7727 7.31818C14.7727 8.56818 13.75 9.59091 12.5 9.59091Z"
            fill="#D1FF52"
          />
        </svg>
      </NotificationIcon>
      <Content>{props.children}</Content>
      <CloseIcon onClick={close}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"
            fill="#202020"
          />
        </svg>
      </CloseIcon>
    </Container>
  )
}

export default Announcement
