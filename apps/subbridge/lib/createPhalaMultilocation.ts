import getGeneralKey, {type GeneralKey, type Hex} from './getGeneralKey'

type Multilocation = [
  {GeneralKey: GeneralKey},
  {GeneralIndex: number},
  {GeneralKey: GeneralKey},
]

export const createPhalaMultilocation = (
  kind: 'cb' | 'sygma',
  generalIndex: number,
  destinationAccount: Hex,
): Multilocation => {
  return [
    {
      GeneralKey:
        kind === 'sygma'
          ? getGeneralKey('0x7379676d61') // string "sygma"
          : getGeneralKey('0x6362'), // string "cb"
    },
    {GeneralIndex: generalIndex},
    {GeneralKey: getGeneralKey(destinationAccount)},
  ]
}
