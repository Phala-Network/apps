import {favoritePoolsAtom} from '@/store/common'
import {useAtom} from 'jotai'
import {useCallback, useMemo} from 'react'

const usePoolFavorite = (pid: string): [boolean, () => void] => {
  const [favoritePools, setFavoritePools] = useAtom(favoritePoolsAtom)
  const isFavorite = useMemo(
    () => favoritePools.includes(pid),
    [pid, favoritePools],
  )
  const toggleFavorite = useCallback(() => {
    setFavoritePools(
      favoritePools.includes(pid)
        ? favoritePools.filter((v) => v !== pid)
        : [...favoritePools, pid],
    )
  }, [setFavoritePools, favoritePools, pid])

  return [isFavorite, toggleFavorite]
}

export default usePoolFavorite
