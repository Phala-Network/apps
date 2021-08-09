import React, { SVGProps } from 'react'

const Icon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 17C5.35786 17 2 13.6422 2 9.5C2 5.35785 5.35786 2 9.5 2C13.6421 2 17 5.35785 17 9.5C17 13.6422 13.6421 17 9.5 17ZM0 9.5C0 4.2533 4.2533 0 9.5 0C14.7467 0 19 4.2533 19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 0 14.7467 0 9.5ZM14 8H5V11H14V8Z"
        fill="white"
      />
    </svg>
  )
}

export default Icon
