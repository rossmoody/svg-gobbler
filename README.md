# 👋 SVG Gobbler

Download this extension on the [Chrome Web store](https://chrome.google.com/webstore/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch?hl=en-US&authuser=0) or in the [Add-On Marketplace](https://addons.mozilla.org/en-US/firefox/addon/svg-gobbler/) for Firefox.

SVG Gobbler is a simple browser extension that finds SVG content in your current window and lets you download, copy to clipboard, or export as a PNG.

## Build locally

Currently, if you would like to modify this extension you will need to install it manually. Before making edits you will need to build it locally and side load SVG Gobbler as a developer extension to test any changes.

### Installation

#### 1. Clone the repo

Clone the repo to your local machine and navigate into the root directory.

```bash
cd svg-gobbler
```

#### 2. Install dependencies

SVG Gobbler uses `yarn` to build the necessary dependencies. 

```bash
yarn
```

#### 3. Bundle the extension

Run `yarn start` to tell Webpack to build files into the `extension/dist` folder. This also tells webpack to watch for edits. 

```bash
yarn start
```

#### 4. Side load extension

1. Open Chrome
2. In the address bar, navigate to `chrome://extensions`
3. In the top right of the screen, flip the toggle to enable `Developer Mode`
4. Click the button to `Load unpacked` and select the `extension` folder inside the SVG Gobbler repo

Once this is complete you can start hacking. Editing content in the `src` directory will automatically build and update the extension folder which will feed the extension in the browser the latest code.

### Development notes

If you are editing anything within the `src/find` directory you will need to manually press the `Update` button in the extensions page to refresh your latest code changes.

Code changed within the `src/build` directory will automatically update on page refresh but code that is injected into the client's tab (code within `src/find`) needs manually refreshed from within the extensions page.

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

Feel free to submit a pull request if you've made an improvement of some kind. This is an open source project and any help is very appreciated.

### About

This started as a pet project to improve the [SVG Crowbar](http://nytimes.github.com/svg-crowbar/) tool that is no longer being maintained by NY Times.

The codebase has been completely rewritten 4 times and the latest iteration leverages [Chakra UI](https://chakra-ui.com/) and React.
