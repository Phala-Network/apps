import React from 'react'
import {ModalFooter, ModalButton} from 'baseui/modal'
import {ButtonProps} from 'baseui/button'

export const ModalButtonWrapper: React.FC<ButtonProps> = (props) => {
  const {children, onClick} = props
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <ModalFooter style={{padding: 0, margin: '30px 0 0'}}>
      <ModalButton
        onClick={handleClick}
        overrides={{
          BaseButton: {
            style: () => ({
              width: '100%',
              backgroundColor: '#EEEEEE',
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
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
      >
        {children}
      </ModalButton>
    </ModalFooter>
  )
}
