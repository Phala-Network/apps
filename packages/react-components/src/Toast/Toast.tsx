import {toaster} from 'baseui/toast'
import * as React from 'react'

export {ToasterContainer} from 'baseui/toast'

export const toast = (content: React.ReactNode) => {
  const toastKey = toaster.info(content, {
    overrides: {
      InnerContainer: {
        style: {width: '100%'},
      },
    },
  })

  setTimeout(() => {
    toaster.clear(toastKey)
  }, 3000)
}
