const trimAddress = (str: string, start = 4, end = 4): string => {
  if (str.length < start + end) return str

  return `${str.slice(0, start)}…${str.slice(-end)}`
}

export default trimAddress
