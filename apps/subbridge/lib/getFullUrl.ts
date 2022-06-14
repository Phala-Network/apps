export const getFullUrl = (url: string, path: string) => {
  const urlObject = new URL(url)
  urlObject.pathname = path
  return urlObject.toString()
}
