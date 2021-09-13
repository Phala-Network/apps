import RcDropdown from 'rc-dropdown'
import RcMenu, {MenuItem as RcMenuItem} from 'rc-menu'
import {Style} from './Style'

type Props = {
  items: Array<{key: string; item: string; disabled?: boolean}>
  onSelect?: (key: string) => void
  children: JSX.Element
}
export const Dropdown = (props: Props): JSX.Element => {
  const {onSelect = () => null, items} = props

  return (
    <>
      <Style />
      <RcDropdown
        overlay={
          <RcMenu
            selectedKeys={[]}
            onSelect={({selectedKeys}) => {
              if (selectedKeys[0]) {
                onSelect(selectedKeys[0])
              }
            }}
          >
            {items.map(({key, item, disabled = false}) => (
              <RcMenuItem key={key} disabled={disabled}>
                {item}
              </RcMenuItem>
            ))}
          </RcMenu>
        }
      >
        {props.children}
      </RcDropdown>
    </>
  )
}
