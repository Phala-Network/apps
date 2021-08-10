import { useEffect } from 'react'
import VConsole from 'vconsole'

export default function useVconsole(): void {
  useEffect(() => {
    let vconsole: VConsole

    import('vconsole').then((VConsole) => {
      vconsole = new VConsole.default()
    })

    return () => {
      vconsole?.destroy?.()
    }
  }, [])
}
