const warningStack: { [key: string]: boolean } = {}

const warning = (message: string, component?: string) => {
  const tag = component ? ` [${component}]` : ' '
  const log = `[UI]${tag}: ${message}`

  if (typeof console === 'undefined') return
  if (warningStack[log]) return
  warningStack[log] = true

  if (process.env.NODE_ENV !== 'production') {
    return console.error(log)
  }

  console.warn(log)
}

export default warning
