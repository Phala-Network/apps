import React from 'react'
import {ModalButton} from 'baseui/modal'
import {ButtonProps} from 'baseui/button'

export const ModalButtonWrapper: React.FC<ButtonProps> = (props) => {
  const {children, type, ...params} = props
  return (
    <ModalButton
      overrides={{
        BaseButton: {
          style: () => ({
            width: '100%',
            backgroundColor: type === 'submit' ? '#D1FF52' : '#EEEEEE',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '20px',
            paddingTop: '16px',
            paddingBottom: '16px',
            color: '#111111',
            ':hover': {
              backgroundColor: '#D1FF52',
            },
          }),
        },
      }}
      {...params}
    >
      {children}
    </ModalButton>
  )
}
