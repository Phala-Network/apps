export default function isTest(): boolean {
  return process.env['GATSBY_ENV'] === 'test'
}
