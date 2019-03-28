const icon = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="fileIcon">
        <path stroke="none" d="M14,0H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8H15a1,1,0,0,1-1-1ZM5,17H19v2H5Zm0-5H19v2H5Zm6-3H5V7h6Z"></path>
        <polygon stroke="none" points="21.414 6 16 6 16 0.586 21.414 6"></polygon>
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="imageIcon">
        <circle stroke="none" cx="9" cy="8" r="2"></circle>
        <path stroke="none" d="M23,1H1C0.448,1,0,1.447,0,2v20c0,0.553,0.448,1,1,1h22c0.552,0,1-0.447,1-1V2C24,1.447,23.552,1,23,1z M22,3v12l-5-5l-6,7l-5-4l-4,4V3H22z"></path>
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="mailIcon">
        <path stroke="none" d="M21,2H3A3,3,0,0,0,0,5V19a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V5A3,3,0,0,0,21,2ZM8.207,15.207l-2.5,2.5a1,1,0,0,1-1.414-1.414l2.5-2.5Zm11.5,2.5a1,1,0,0,1-1.414,0l-2.5-2.5,1.414-1.414,2.5,2.5A1,1,0,0,1,19.707,17.707Zm0-10-7,7a1,1,0,0,1-1.414,0l-7-7A1,1,0,0,1,5.707,6.293L12,12.586l6.293-6.293a1,1,0,1,1,1.414,1.414Z"></path>
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chatIcon">
        <g stroke="none">
            <path d="M21.965,9.575C21.604,14.821,16.384,19,10,19c-0.465,0-0.931-0.026-1.394-0.072 c2.013,1.586,4.939,2.376,7.946,1.967L22,23.618v-5.215c1.293-1.243,2-2.791,2-4.403C24,12.373,23.277,10.822,21.965,9.575z"></path>
            <path d="M10,1C4.477,1,0,4.582,0,9c0,1.797,0.75,3.45,2,4.785V19l4.833-2.416C7.829,16.85,8.892,17,10,17 c5.523,0,10-3.582,10-8S15.523,1,10,1z"></path>
        </g>
    </symbol>
</svg>
`

export function insertXlinkIcon (el) {
  el.innerHTML = icon
}

const iconHtml = `<a href="">
        <svg>
            <use xlink:href="#fileIcon">
        </svg>
    </a>
    <a href="">
        <svg>
            <use xlink:href="#imageIcon">
        </svg>
    </a>
    <a href="">
        <svg>
            <use xlink:href="#mailIcon">
        </svg>
    </a>
    <a href="">
        <svg>
            <use xlink:href="#chatIcon">
        </svg>
    </a>`

export function insertIcon (cont) {
  const baseIcon = document.createElement('div')
  baseIcon.setAttribute('class', 'add')
  baseIcon.innerHTML = iconHtml
  cont.appendChild(baseIcon)
}
