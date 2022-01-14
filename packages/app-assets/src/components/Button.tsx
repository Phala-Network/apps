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
            border: `1px solid #D1FF52`,
            backgroundColor: '#D1FF52',
            borderRadius: '14px',
            padding: '6px 18px',
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
