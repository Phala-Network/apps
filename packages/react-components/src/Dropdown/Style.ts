import {createGlobalStyle} from 'styled-components'
export const Style = createGlobalStyle`
  .rc-dropdown {
    position: absolute;
    left: -9999px;
    top: -9999px;
    z-index: 1070;
    display: block;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.5;
  }
  .rc-dropdown-hidden {
    display: none;
  }
  .rc-dropdown-menu {
    user-select: none;
    outline: none;
    position: relative;
    list-style-type: none;
    padding: 6px;
    margin: 2px 0 2px;
    text-align: left;
    background-color: #fff;
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
    background-clip: padding-box;
    border: 1px solid #000;
  }
  .rc-dropdown-menu > li {
    margin: 0;
    padding: 0;
  }
  .rc-dropdown-menu:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: #ffffff;
    background: rgba(255, 255, 255, 0.01);
  }
  .rc-dropdown-menu > .rc-dropdown-menu-item {
    position: relative;
    display: block;
    padding: 7px 10px;
    clear: both;
    font-size: 12px;
    font-weight: normal;
    white-space: nowrap;
  }
  .rc-dropdown-menu > .rc-dropdown-menu-item:hover,
  .rc-dropdown-menu > .rc-dropdown-menu-item-active,
  .rc-dropdown-menu > .rc-dropdown-menu-item-selected {
    font-weight: bold;
    background-color: #D1FF52;
  }
  .rc-dropdown-menu > .rc-dropdown-menu-item-selected {
    position: relative;
  }
  .rc-dropdown-menu > .rc-dropdown-menu-item-disabled {
    color: #ccc;
    cursor: not-allowed;
    pointer-events: none;
  }
  .rc-dropdown-menu > .rc-dropdown-menu-item-disabled:hover {
    color: #ccc;
    background-color: #fff;
    cursor: not-allowed;
  }
  .rc-dropdown-menu > .rc-dropdown-menu-item-divider {
    height: 1px;
    margin: 1px 0;
    overflow: hidden;
    background-color: #e5e5e5;
    line-height: 0;
  }
`
