import {Block} from 'baseui/block'
import {StatefulTooltip, StatefulTooltipProps} from 'baseui/tooltip'
import {FC} from 'react'
import {Info} from 'react-feather'

const TooltipHeader: FC<Partial<StatefulTooltipProps>> = ({
  children,
  placement,
  ...props
}) => (
  <Block display="flex" alignItems="center">
    {children}
    <StatefulTooltip
      overrides={{Body: {style: {maxWidth: '400px'}}}}
      placement={placement || 'bottomLeft'}
      {...props}
    >
      <Info size={16} style={{marginLeft: 5}} />
    </StatefulTooltip>
  </Block>
)

export default TooltipHeader
