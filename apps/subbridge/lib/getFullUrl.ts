export const getFullUrl = (url: string, path: string): string => {
  const urlObject = new URL(url)
  urlObject.pathname = path
  return urlObject.toString()
}
