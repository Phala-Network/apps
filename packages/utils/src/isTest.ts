export default function isTest(): boolean {
  return (
    process.env['GATSBY_ENV'] === 'test' ||
    (typeof location !== 'undefined' && location.host.includes('netlify'))
  )
}
