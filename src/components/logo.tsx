import { forwardRef, HTMLAttributes } from 'react'

export const Logo = forwardRef<SVGSVGElement, HTMLAttributes<SVGSVGElement>>((properties, reference) => (
  <svg fill="none" ref={reference} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...properties}>
    <rect fill="#FB575E" height="256" rx="60" width="256" />
    <circle cx="42" cy="81" fill="white" r="20" />
    <circle cx="214" cy="81" fill="white" r="20" />
    <path d="M42 81L214 81" stroke="white" strokeWidth="14" />
    <path
      d="M68 174C68 174 68 78.5 129 78.5C190 78.5 190 174 190 174"
      stroke="white"
      strokeWidth="14"
    />
    <rect fill="#2D3341" height="70" rx="20" width="70" x="94" y="46" />
    <rect fill="#2D3341" height="70" rx="20" width="70" x="33" y="140" />
    <rect fill="#2D3341" height="70" rx="20" width="70" x="155" y="140" />
  </svg>
))
