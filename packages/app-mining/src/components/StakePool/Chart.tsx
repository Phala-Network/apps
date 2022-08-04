import {useStyletron} from 'baseui'
import {Block} from 'baseui/block'
import {Tab, Tabs} from 'baseui/tabs-motion'
import React, {FC, useEffect, useState} from 'react'

const questions = [
  ['APR', '1c9dbc73-a15a-4ff0-b6e1-85146482558a'],
  ['Commission', '6602319b-144a-4843-8dea-0633c1e3a279'],
  ['Delegation', 'cd71915c-3f06-4b23-8daa-daa73bb69613'],
  ['Worker', '625d4c64-163a-45d6-9dc6-b4ab3002ef97'],
] as const

// Render all tabs for better switching experience, but only load iframe when tab is visible
const WrappedIframe: FC<{
  pid?: string
  questionId: string
  activeKey: React.Key
}> = ({pid, questionId, activeKey}) => {
  const [css] = useStyletron()
  const [shouldLoad, setShouldLoad] = useState(false)
  useEffect(() => {
    if (!shouldLoad && activeKey === questionId) {
      setShouldLoad(true)
    }
  }, [shouldLoad, activeKey, questionId])

  if (!shouldLoad || !pid) return <Block height="480px" />

  return (
    <iframe
      className={css({
        width: 'calc(100% + 32px)',
        height: '512px',
        border: 'none',
        margin: '-16px',
      })}
      src={`https://mb.phala.network/public/question/${questionId}?pid=${pid}#bordered=false&titled=false&hide_parameters=pid`}
    ></iframe>
  )
}

const Chart: FC<{pid?: string}> = ({pid}) => {
  const [activeKey, setActiveKey] = useState<React.Key>(questions[0][1])
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => setActiveKey(activeKey)}
      renderAll
    >
      {questions.map(([title, questionId]) => (
        <Tab title={title} key={questionId}>
          <WrappedIframe
            pid={pid}
            questionId={questionId}
            activeKey={activeKey}
          />
        </Tab>
      ))}
    </Tabs>
  )
}

export default Chart
