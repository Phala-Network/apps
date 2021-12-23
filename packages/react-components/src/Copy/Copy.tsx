import {useClipboard} from '@phala/react-hooks'
import React, {ComponentProps, MouseEventHandler} from 'react'
import {toast} from 'react-toastify'
import {CopyIcon} from './styledComponets'

type Props = {
  value: string
} & ComponentProps<typeof CopyIcon>

export const Copy: React.FC<Props> = (props) => {
  const {value, ...omittedProps} = props

  const {copy} = useClipboard()

  const onClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
    copy(value)
    toast('Copied to clipboard')
  }

  return (
    <CopyIcon
      {...omittedProps}
      onClick={onClick}
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0H1.51786C1.46875 0 1.42857 0.0401786 1.42857 0.0892857V0.714286C1.42857 0.763393 1.46875 0.803571 1.51786 0.803571H7.05357V8.48214C7.05357 8.53125 7.09375 8.57143 7.14286 8.57143H7.76786C7.81697 8.57143 7.85714 8.53125 7.85714 8.48214V0.357143C7.85714 0.159598 7.69755 0 7.5 0ZM6.07143 1.42857H0.357143C0.159598 1.42857 0 1.58817 0 1.78571V7.70871C0 7.80357 0.0379464 7.89397 0.104911 7.96094L2.03906 9.89509C2.06362 9.91964 2.09152 9.93973 2.12165 9.95647V9.97768H2.16853C2.20759 9.99219 2.24888 10 2.29129 10H6.07143C6.26897 10 6.42857 9.8404 6.42857 9.64286V1.78571C6.42857 1.58817 6.26897 1.42857 6.07143 1.42857ZM2.12054 8.84152L1.1596 7.87946H2.12054V8.84152ZM5.625 9.19643H2.83482V7.61161C2.83482 7.36495 2.63504 7.16518 2.38839 7.16518H0.803572V2.23214H5.625V9.19643Z"
        fill="black"
        fillOpacity="0.65"
      />
    </CopyIcon>
  )
}
