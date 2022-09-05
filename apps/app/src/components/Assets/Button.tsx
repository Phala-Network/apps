import {Button, ButtonProps} from 'baseui/button'
import React from 'react'

const Index: React.FC<ButtonProps> = (props) => {
  const {children, ...params} = props
  return (
    <Button
      overrides={{
        BaseButton: {
          style: () => ({
            marginBottom: '8px',
            backgroundColor: '#EEEEEE',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            padding: '6px 18px',
            color: '#111111',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '16px',
            height: '28px',
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
