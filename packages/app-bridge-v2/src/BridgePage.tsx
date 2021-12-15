import {Button} from '@phala/react-components'
import {main} from './xtransfer'

export const BridgePage = () => {
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          main()
        }}>
        transfer PHA From Khala To Karura
      </Button>
    </div>
  )
}
