import { ReactElement } from 'react'

export default function Icon(): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M9 7V5H11V7H9Z" fill="#494949" />
      <path d="M9 15V9H11V15H9Z" fill="#494949" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10C20 15.5229 15.5229 20 10 20C4.47714 20 0 15.5229 0 10C0 4.47714 4.47714 0 10 0C15.5229 0 20 4.47714 20 10ZM18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30557 18.5 1.5 14.6944 1.5 10C1.5 5.30557 5.30557 1.5 10 1.5C14.6944 1.5 18.5 5.30557 18.5 10Z"
        fill="#494949"
      />
    </svg>
  )
}
