import {main} from './xtransfer'

export const BridgePage = () => {
  return (
    <div>
      <button
        onClick={() => {
          main()
        }}>
        Test
      </button>
    </div>
  )
}
