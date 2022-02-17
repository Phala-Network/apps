import {useApiPromise} from '@phala/react-libs'
import Decimal from 'decimal.js'
import {
  ComponentPropsWithoutRef,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'

export function useKhalaBridgeFee() {
  const {api} = useApiPromise()
  const [fee, setFee] = useState<Decimal | undefined>()

  const getFeeData = useCallback(
    async function () {
      const result = await api?.query?.bridgeTransfer?.bridgeFee?.(0)

      // NOTE: for debug
      // console.log('result2', result?.toJSON())
      // console.log('result', result?.toHuman())

      const resultJSON = result?.toJSON?.() as [number]

      if (!resultJSON) {
        return
      }

      const fee = new Decimal(resultJSON?.[0]?.toString()).div(10 ** 12)

      setFee(fee)

      return result
    },
    [api]
  )

  useEffect(() => {
    getFeeData()
  }, [getFeeData])

  return {fee}
}

const Root = styled.div`
  display: flex;
  color: #111111;
  align-items: center;
`

const Label = styled.span`
  font-size: 16px;
  line-height: 16px;
  margin-right: 12px;
`

export type KhalaToEthereumFeeProps = ComponentPropsWithoutRef<typeof Root>

export const KhalaToEthereumFee: FC<KhalaToEthereumFeeProps> = (props) => {
  const {children} = props
  const {fee} = useKhalaBridgeFee()

  return (
    <Root {...props}>
      <Label>Bridge Fee:</Label> {fee?.toFixed(2) || '-'} PHA
      {children}
    </Root>
  )
}
