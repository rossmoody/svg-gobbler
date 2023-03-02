# 👋 SVG Gobbler

Download this extension on the
[Chrome Web store](https://chrome.google.com/webstore/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch)
or in the
[Add-On Marketplace](https://addons.mozilla.org/firefox/addon/svg-gobbler/) for
Firefox.

SVG Gobbler is a browser extension that finds SVG content in your current window
and lets you download, copy to clipboard, or export as a PNG.

## Build

Currently, if you would like to modify this extension you will need to install
it manually. Before making edits you will need to build it locally and side load
SVG Gobbler as a developer extension to test any changes.

> This extension is in a strange middle ground with the v3 manifest updates
> coming from Chrome. Firefox extension is pinned to version 3.17 for Firefox
> but the extension is being refactored to comply with v3 Manifest changes for
> Chrome.

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

Run `yarn start` to build files into the `dist` folder and watch source files
for changes.

```bash
yarn start
```

#### 4. Side load extension

#### Chrome

1. In the address bar, navigate to `chrome://extensions`
1. In the top right of the screen, flip the toggle to enable `Developer Mode`
1. Click the button to `Load unpacked` and select the `dist` folder inside the
   SVG Gobbler repo

Once this is complete you can start hacking. Editing content in the `src`
directory will automatically build and update the extension folder which will
feed the extension in the browser the latest code.

## 🎉 How to use the extension

Click the SVG Gobbler extension icon to search the current page for SVGs.

Unique attributes for each SVG element will be shown within the card. The
attributes currently being shown are:

1. If the SVG is placed as a:

   - background image
   - image source
   - inline svg
   - object data
   - sprite
   - symbol

2. The size of the SVG in the DOM

---

## More apps by me

I like making things. [Check out what I'm up to lately](https://rossmoody.com).

---

## Contribute

Feel free to submit a pull request if you've made an improvement of some kind.
This is an open source project and any help is very appreciated.

### Friends

This project leverages code and value from some incredibly talented folks. Most
notably and predominantly are:

- Design System Toolkit: [Chakra UI](https://chakra-ui.com/)
- React Component SVG Transformation: [SVGR](https://react-svgr.com/)
- SVG Optimization: [SVGO](https://github.com/svg/svgo)

### About

This started as a pet project to improve the
[SVG Crowbar](http://nytimes.github.com/svg-crowbar/) tool that is no longer
being maintained by NY Times.

The codebase has been completely rewritten 4 times.
