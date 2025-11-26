import {Typography, type TypographyProps} from '@mui/material'
import type {FC, ReactNode} from 'react'

interface GradientTextProps extends Omit<TypographyProps, 'sx'> {
  children: ReactNode
  gradient?: 'primary' | 'secondary'
}

const GradientText: FC<GradientTextProps> = ({
  children,
  gradient = 'primary',
  ...props
}) => {
  return (
    <Typography
      {...props}
      sx={(theme) => ({
        background:
          gradient === 'primary'
            ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
            : `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      })}
    >
      {children}
    </Typography>
  )
}

export default GradientText
