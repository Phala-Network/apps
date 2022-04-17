import {Block} from 'baseui/block'
import {StatefulTooltip, StatefulTooltipProps} from 'baseui/tooltip'
import {Info} from 'react-feather'

const TooltipHeader = ({
  children,
  ...props
}: StatefulTooltipProps): JSX.Element => (
  <Block display="flex" alignItems="center">
    {children}
    <StatefulTooltip
      placement="bottomLeft"
      overrides={{Body: {style: {maxWidth: '400px'}}}}
      {...props}
    >
      <Info size={16} style={{marginLeft: 5}} />
    </StatefulTooltip>
  </Block>
)

export default TooltipHeader
