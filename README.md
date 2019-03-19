<!-- <p align="center">
  <a target="_blank" rel="noopener noreferrer" href="/primer/components/blob/master/static/assets/readme-components.png"><img width="300px" src="https://github.com/primer/components/raw/master/static/assets/readme-components.png" style="max-width:100%;"></a>
</p> -->

<h1 align="center">SVG Gobbler</h1>

> SVG Gobbler is a simple browser extension that highlights any available SVG content in your current window and lets you download it. The extension is available (soon) on the extension store.

## Developer mode

If you would like to modify this extension, you will need to install it manually. Before making edits you will need to side load SVG Gobbler as a developer extension to test any changes.

## Side load extension

1. Download or clone this repo to your local machine
2. In Chrome or Brave browser address bar, navigate to `chrome://extensions`
3. In the top right of the screen, flip the toggle to enable `Developer Mode`
4. Click the button to `Load unpacked` and select the `extension` folder inside the cloned SVG Gobbler repo

## Making edits

### Installation

1. `cd` into the SVG Gobbler repo
2. Run `npm install` to install necessary dependencies
3. Run `npm run build` to bundle and build the latest `style.css` file and `index.js` file into the `extension` folder. This also tells webpack to watch for edits
4. Make your edits in the `src` folder
5. Navigate to pages with svg content and click the extensions icon to test

### Contribute back

Feel free to submit a pull request if you've made an improvement of some kind. This is a small hobby project and can use all the help it can get.

## Permissions

The extension requires permission to read and modify all the data of the website that you want to download the svg files from. It is nessesary to parse and extract the svg assets on the site.

## About

This started as a pet project to improve the [SVG Crowbar](http://nytimes.github.com/svg-crowbar/) tool that is no longer being maintained by NY Times. It has come a long way since then but I always appreciated the simplistic approach they started and it's nice to pay homage.
