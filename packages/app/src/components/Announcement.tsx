import React, { useState } from 'react'
import styled from 'styled-components'

type Props = any

const Link = styled.a`
  text-decoration-line: underline;
  color: #03b8ff;

  &:hover {
    opacity: 0.8;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  padding: 12px 24px;
  box-sizing: border-box;
`

const Content = styled.div`
  flex: 1;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;
  color: #202020;
`

const NotificationIcon = styled.div`
  margin-right: 24px;
  display: flex;
  align-items: center;
`

const CloseIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`

const Announcement: React.FC<Props> = () => {
  const [closed, setClosed] = useState(false)
  const link = 'https://phala.network'
  const text =
    'CPU time, on-chain storage, network bandwidth, off-chain storage, and more resources. Phala provides a wide-ranged infrastructure including cross-chain confidential widgets, and trustless general-purpose computing platform. All these features are accessible with PHA. To be a Gatekeeper one must stake a certain amount of PHA. The stake would be fined and took if he betrayed Gatekeeper rules.'

  if (closed) return null

  function close() {
    setClosed(true)
  }

  return (
    <Container>
      <NotificationIcon>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 16H5.889L11.183 20.332C11.2563 20.3921 11.3451 20.4301 11.4391 20.4416C11.5331 20.4532 11.6284 20.4378 11.714 20.3972C11.7996 20.3567 11.872 20.2926 11.9226 20.2126C11.9732 20.1325 12.0001 20.0397 12 19.945V4.05502C12.0001 3.9603 11.9732 3.86751 11.9226 3.78745C11.872 3.7074 11.7996 3.64337 11.714 3.60282C11.6284 3.56227 11.5331 3.54687 11.4391 3.55841C11.3451 3.56996 11.2563 3.60797 11.183 3.66802L5.889 8.00002H2C1.73478 8.00002 1.48043 8.10538 1.29289 8.29291C1.10536 8.48045 1 8.73481 1 9.00002V15C1 15.2652 1.10536 15.5196 1.29289 15.7071C1.48043 15.8947 1.73478 16 2 16ZM22 11H15V13H22V11ZM15 14.7L21.0622 18.2L20.0622 19.932L14 16.432L15 14.7ZM20.0622 4L14 7.5L15 9.23205L21.0622 5.73205L20.0622 4Z"
            fill="#202020"
          />
        </svg>
      </NotificationIcon>
      <Content>
        {text}{' '}
        {link && (
          <Link target="_blank" href={link}>
            see more
          </Link>
        )}
      </Content>
      <CloseIcon onClick={close}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
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
