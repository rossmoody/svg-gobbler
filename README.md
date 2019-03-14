# :tada: SVG Crowbazaar

`javascript:javascript: (function () { var e = document.createElement('script'); e.setAttribute('src', 'https://cdn.jsdelivr.net/gh/rossmoody/svg-crowbazaar/svg-crowbazaar.js'); e.setAttribute('class', 'svg-crowbar'); document.body.appendChild(e); })();`

## Description

This is a pet project to improve the [NY Times SVG Crowbar](http://nytimes.github.com/svg-crowbar/) project that doesn't seem to be active any longer. I've found a lot of use with this little bookmark but would like to practice my rudimentary code improving something I use daily. Any help is welcome and appreciated.

## Gotchas

Currently the https version of the script is being served from raw.github.com, which might break in the future. If the script stops running on https pages, check back here—you might have to re-install the bookmarklet at that time.

Descendent ">" CSS selectors will crash Adobe Illustrator, therefore those styles are stripped out. Be warned.

Adobe Illustrator also chokes on fonts that it doesn’t recognize. Font-family assigments like “sans-serif” (or if you're using webfonts like “nyt-franklin”) will cause Illustrator to give this error when opening the file: “The operation cannot complete because of an unknown error. [CANT]”. This is fixed in Illustrator version 17.1. Other SVG viewers are pretty okay with them though.

Some styles won’t propogate down if they depend on markup outside of the svg element. For instance, if you use CSS that targets an SVG path element by an id on the div surrounding the SVG ("#map svg path") then those styles won’t show up in the resulting file.
