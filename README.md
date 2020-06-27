<h1 align="center">SVG Gobbler</h1>

<p align="center">Download this extension on <a href="https://chrome.google.com/webstore/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch?hl=en-US&authuser=0">the Chrome Web store</a> or in the <a href="https://addons.mozilla.org/en-US/firefox/addon/svg-gobbler/">Add-On Marketplace</a> for Firefox.</p>

<p align="center">SVG Gobbler is a simple browser extension that finds SVG content in your current window and lets you download or copy to clipboard.</p>

## Developer mode

Currently, if you would like to use or modify this extension you will need to install it manually. Before making edits you will need to build it locally and side load SVG Gobbler as a developer extension to test any changes.

### Installation

1. Clone the repo and `cd` into the root folder
2. Run `npm install` to install necessary dependencies
3. Run `npm start` to bundle and build the latest `style.css` file and `index.js` file into the `extension` folder. This also tells webpack to watch for edits and also start Prettier to automatically format the code.

### Side load extension

1. Open Chrome or Brave Browser
2. In the address bar, navigate to `chrome://extensions`
3. In the top right of the screen, flip the toggle to enable `Developer Mode`
4. Click the button to `Load unpacked` and select the `extension` folder inside the cloned SVG Gobbler repo

Once this is complete you can start hacking. Editing content in the `src` directory will automatically build and update the extension folder which will feed the extension in the browser the latest code.

## 🎉 How to use the extension

Click the SVG Gobbler extension icon to search the current page for SVGs.

Unique attributes for each SVG element will be shown within the card. The attributes currently being shown are:

1. If the SVG is placed as a:

   - background image
   - image source
   - inline svg
   - object data
   - sprite
   - symbol

2. The size of the SVG in the DOM

## Contribute

Feel free to submit a pull request if you've made an improvement of some kind. This is a small hobby project and I'm not very good at javascript.

## Permissions

The extension requires permission to read and modify all the data of the website that you want to download the svg files from. It is nessesary to parse and extract the svg assets on the site.

### About

This started as a pet project to improve the [SVG Crowbar](http://nytimes.github.com/svg-crowbar/) tool that is no longer being maintained by NY Times. It has come a long way since then but I always appreciated the simplistic approach they started and it's nice to pay homage.
