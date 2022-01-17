import React from 'react'
import {Button, ButtonProps} from 'baseui/button'
const Index: React.FC<ButtonProps> = (props) => {
  const {children, ...params} = props
  return (
    <Button
      overrides={{
        BaseButton: {
          style: () => ({
            backgroundColor: '#EEEEEE',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            padding: '7px 19px',
            color: '#111111',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '16px',
            ':hover': {
              backgroundColor: '#D1FF52',
            },
          }),
        },
      }}
      {...params}
    >
      {children}
    </Button>
  )
}

export default Index
