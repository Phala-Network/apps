import {useStyletron} from 'baseui'
import {VFC} from 'react'
import {Tab, StatefulTabs} from 'baseui/tabs-motion'

const questions = [['APR', '1c9dbc73-a15a-4ff0-b6e1-85146482558a']] as const

const Chart: VFC<{pid: string}> = ({pid}) => {
  const [css] = useStyletron()

  return (
    <StatefulTabs>
      {questions.map(([title, questionId]) => (
        <Tab title={title} key={questionId}>
          <iframe
            className={css({width: '100%', height: '512px', border: 'none'})}
            src={`https://mb.phala.network/public/question/${questionId}?pid=${pid}#bordered=false&titled=false&hide_parameters=pid`}
            allowTransparency
          ></iframe>
        </Tab>
      ))}
    </StatefulTabs>
  )
}

export default Chart
