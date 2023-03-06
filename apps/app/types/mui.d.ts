import type {} from '@mui/lab/themeAugmentation'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    num1: React.CSSProperties
    num2: React.CSSProperties
    num3: React.CSSProperties
    num4: React.CSSProperties
    num5: React.CSSProperties
    num6: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    num1?: React.CSSProperties
    num2?: React.CSSProperties
    num3?: React.CSSProperties
    num4?: React.CSSProperties
    num5?: React.CSSProperties
    num6?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    num1: true
    num2: true
    num3: true
    num4: true
    num5: true
    num6: true
  }
}
