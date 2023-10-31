import { HTMLAttributes, forwardRef } from 'react'

export const Logo = forwardRef<SVGSVGElement, HTMLAttributes<SVGSVGElement>>((props, ref) => {
  return (
    <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
      <g clipPath="url(#clip0_442_95)">
        <rect width="256" height="256" rx="60" fill="#FB575E" />
        <circle cx="42" cy="81" r="20" fill="white" />
        <circle cx="214" cy="81" r="20" fill="white" />
        <path d="M42 81L214 81" stroke="white" strokeWidth="14" />
        <path
          d="M68 174C68 174 68 78.5 129 78.5C190 78.5 190 174 190 174"
          stroke="white"
          strokeWidth="14"
        />
        <rect x="94" y="46" width="70" height="70" rx="20" fill="#2D3341" />
        <rect x="33" y="140" width="70" height="70" rx="20" fill="#2D3341" />
        <rect x="155" y="140" width="70" height="70" rx="20" fill="#2D3341" />
      </g>
    </svg>
  )
})
