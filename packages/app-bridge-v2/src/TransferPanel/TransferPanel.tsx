import {Description} from './Description'
import {Header} from './Header'
import {NetworkSelect} from './NetworkSelect'
import {Title} from './Title'

export const TransferPanel = () => {
  return (
    <div>
      <Header>
        <Title>BRIDGE</Title>
        <Description>Transfer assets between chains</Description>
      </Header>
      <NetworkSelect />
    </div>
  )
}
