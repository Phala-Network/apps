import {SelectOverrides} from 'baseui/select'

export const selectOverrides: SelectOverrides = {
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
      borderWidth: 0,
      marginLeft: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      height: 48,
      fontSize: 16,
      backgroundColor: 'black',
      color: 'white',
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
  DropdownContainer: {
    style: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#AAD829',
    },
  },
  DropdownListItem: {
    style: {
      height: 48,
      lineHeight: '48px',
      fontSize: 16,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'black',
      ':hover': {
        backgroundColor: '#D1FF52',
        color: '#111111',
      },
    },
  },
  SelectArrow: {
    props: {
      style: {
        fill: 'white',
      },
    },
  },
}
