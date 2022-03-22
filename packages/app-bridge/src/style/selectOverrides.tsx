import {SelectOverrides} from 'baseui/select'
import {ArrowIcon} from '../components/ArrowIcon'

export const selectOverrides: SelectOverrides = {
  SelectArrow: () => {
    return <ArrowIcon />
  },
  Root: {
    style: {},
  },
  SingleValue: {
    style: {
      flex: 1,
      textAlign: 'center',
      marginLeft: 0,
    },
  },
  ValueContainer: {
    style: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  ControlContainer: {
    style: {
      borderLeftWidth: '0',
      borderRightWidth: '0',
      borderTopWidth: '0',
      borderBottomWidth: '0',
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      height: 48,
      fontSize: 16,
      backgroundColor: 'black',
      color: 'white',
      cursor: 'inherit',
    },
  },
  Dropdown: {
    style: {
      backgroundColor: 'black',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      color: 'white',
    },
  },
  DropdownOption: {
    style: {
      color: 'white',
    },
  },
  DropdownListItem: {
    style: ({$selected}) => ({
      height: 48,
      lineHeight: '48px',
      fontSize: 16,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      textAlign: 'center',
      color: 'white',
      backgroundColor: $selected ? '#D1FF52' : 'black',

      ':hover': {
        backgroundColor: '#D1FF52',
        color: '#111111',
      },
    }),
  },
}
