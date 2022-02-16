import {ButtonOverrides} from 'baseui/button'

export const littleRoundButtonOverrides: ButtonOverrides = {
  BaseButton: {
    style: {
      whiteSpace: 'nowrap',
      lineHeight: '16px',
      height: '28px',
      borderTopLeftRadius: '14px',
      borderTopRightRadius: '14px',
      borderBottomLeftRadius: '14px',
      borderBottomRightRadius: '14px',
      fontSize: '16px',
      /* Gn 001 */
      backgroundColor: '#D1FF52',
      /* Bk 001 */
      color: '#111111',

      ':hover': {
        backgroundColor: '#dcff7b',
        color: '#111111',
      },
    },
  },
}
