import RcDropdown from 'rc-dropdown'
import RcMenu, {MenuItem as RcMenuItem} from 'rc-menu'
import {Style} from './Style'

type Props<T> = {
  items: Array<{key: T; item: string; disabled?: boolean}>
  onClick?: (key: T) => void
  children: JSX.Element
}
export const Dropdown = <T extends string = string>(
  props: Props<T>
): JSX.Element => {
  const {onClick, items} = props

  return (
    <>
      <Style />
      <RcDropdown
        overlay={
          <RcMenu selectable={false} onClick={({key}) => onClick?.(key as T)}>
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
