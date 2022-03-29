import {useStyletron} from 'baseui'
import {VFC} from 'react'

const Chart: VFC<{pid?: string}> = ({pid}) => {
  const [css] = useStyletron()

  return (
    <iframe
      className={css({width: '100%', height: '512px', border: 'none'})}
      src={`https://mb.phala.network/public/question/1c9dbc73-a15a-4ff0-b6e1-85146482558a?pid=${pid}#bordered=false&titled=false`}
      allowTransparency
    ></iframe>
  )
}

export default Chart
