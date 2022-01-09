import {toaster} from 'baseui/toast'
import * as React from 'react'

export {ToasterContainer} from 'baseui/toast'

export const toast = (
  content: React.ReactNode,
  type: 'normal' | 'error' = 'normal'
) => {
  const toastKey = toaster.info(content, {
    overrides: {
      Body: {
        style: {
          fontSize: 16,
          lineHeight: '16px',
          /* Bk 001 */
          color: '#111111',
          /* Wt 001 */
          background: '#FFFFFF',
          /* Gn 002 */
          border: type === 'normal' ? '2px solid #AAD829' : '2px solid #EB5757',
          boxSizing: 'border-box',
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.1)',
          borderRadius: 0,
        },
      },
      InnerContainer: {
        style: {width: '100%'},
      },
    },
  })

  setTimeout(() => {
    toaster.clear(toastKey)
  }, 3000)
}
