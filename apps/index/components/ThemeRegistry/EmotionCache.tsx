'use client'
import type {
  EmotionCache,
  Options as OptionsOfCreateCache,
} from '@emotion/cache'
import createCache from '@emotion/cache'
import {CacheProvider as DefaultCacheProvider} from '@emotion/react'
import {useServerInsertedHTML} from 'next/navigation'
import {Fragment, useState, type FC, type ReactNode} from 'react'

export interface NextAppDirEmotionCacheProviderProps {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache
    children: ReactNode
  }) => JSX.Element | null
  children: ReactNode
}

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
const NextAppDirEmotionCacheProvider: FC<
  NextAppDirEmotionCacheProviderProps
> = (props) => {
  const {options, CacheProvider = DefaultCacheProvider, children} = props

  const [registry] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const prevInsert = cache.insert
    let inserted: Array<{name: string; isGlobal: boolean}> = []
    cache.insert = (...args) => {
      const [selector, serialized] = args
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: selector === '',
        })
      }
      return prevInsert(...args)
    }
    const flush = (): Array<{name: string; isGlobal: boolean}> => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return {cache, flush}
  })

  useServerInsertedHTML(() => {
    const inserted = registry.flush()
    if (inserted.length === 0) {
      return null
    }
    let styles = ''
    let dataEmotionAttribute = registry.cache.key

    const globals: Array<{
      name: string
      style: string
    }> = []

    inserted.forEach(({name, isGlobal}) => {
      const style = registry.cache.inserted[name]

      if (typeof style !== 'boolean') {
        if (isGlobal) {
          globals.push({name, style})
        } else {
          styles += style
          dataEmotionAttribute += ` ${name}`
        }
      }
    })

    return (
      <Fragment>
        {globals.map(({name, style}) => (
          <style
            key={name}
            data-emotion={`${registry.cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{__html: style}}
          />
        ))}
        {styles !== '' && (
          <style
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{__html: styles}}
          />
        )}
      </Fragment>
    )
  })

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>
}

export default NextAppDirEmotionCacheProvider
