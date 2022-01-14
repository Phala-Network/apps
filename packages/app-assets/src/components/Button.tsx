import React from 'react'
import {Button, SHAPE, ButtonProps} from 'baseui/button'
const Index: React.FC<ButtonProps> = (props) => {
  const {children, ...params} = props
  return (
    <Button
      shape={SHAPE.pill}
      overrides={{
        BaseButton: {
          style: () => ({
            backgroundColor: '#EEEEEE',
            borderRadius: '14px',
            padding: '8px 20px',
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
