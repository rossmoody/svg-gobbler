<div align="center">
  <a href="https://svggobbler.com">
    <img src="assets/local/read-me.png" alt="SVG Gobbler logo">
  </a>
</div>

# SVG Gobbler

> An open-source browser extension that finds, optimizes, and exports SVG content from any webpage.

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mpbmflcodadhgafbbakjeahpandgcbch)](https://chrome.google.com/webstore/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch)
[![Firefox Add-ons](https://img.shields.io/amo/v/svg-gobbler)](https://addons.mozilla.org/firefox/addon/svg-gobbler/)

## 📦 Installation

Get SVG Gobbler from your browser's extension marketplace:

- [Chrome Web Store](https://chrome.google.com/webstore/detail/svg-gobbler/mpbmflcodadhgafbbakjeahpandgcbch)
- [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/svg-gobbler/)

## ✨ Features

<div align="center">
  <a href="https://svggobbler.com">
    <img src="assets/local/gobbler-screenshot.png" alt="SVG Gobbler screenshot">
  </a>
</div>

### 🔍 Find SVGs

- Discover SVGs on any webpage across various `mime` types
- Handle CORs-restricted SVGs with ease
- Find and rebuild individual sprite SVG instances

### 📤 Export SVGs

- Create SVG sprites from a collection of icons
- Export in multiple formats: SVG, PNG, WEBP, JPEG, and more
- Transform SVGs into minified Data URIs
- Convert SVGs to React components using SVGR
- Optimize and minify SVGs with SVGO

### 🗂️ Organize SVGs

- Group and categorize SVGs by domain or custom collection name
- Move, copy, duplicate, and optimize icons before sharing
- Save and store uploaded SVGs for optimization

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/svg-gobbler.git
   cd svg-gobbler
   ```

2. **Install dependencies**

   ```bash
   pnpm i
   ```

3. **Start the development build**

   ```bash
   pnpm start
   ```

   This builds assets to the `dist` folder and watches for changes. For subsequent builds:

   ```bash
   pnpm dev
   ```

4. **Server setup (optional)** Most functionality works without a server, but for local fetch calls:
   ```bash
   cd server
   pnpm i
   pnpm build
   pnpm serve  # In a separate terminal session
   ```

### Firefox Development

1. **Build a release**

   ```bash
   pnpm release
   ```

2. **Launch in Firefox**

   ```bash
   pnpm dev-ff
   ```

3. **Rebuild on changes**
   ```bash
   pnpm release
   ```

### Loading the Extension in Chrome

1. Navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `dist` folder

## 🧰 Technology Stack

SVG Gobbler leverages these powerful open-source technologies:

- [Vite](https://vitejs.dev/) - Frontend tooling and build processes
- [CRXJS](https://github.com/crxjs/chrome-extension-tools) - Chrome extension build automation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [SVGR](https://react-svgr.com/) - SVG to React component transformation
- [SVGO](https://github.com/svg/svgo) - SVG optimization
- [CodeMirror](https://codemirror.net/) - Extensible code editor
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [JSZip](https://stuk.github.io/jszip/) - JavaScript library for creating ZIP files
- [Mini SVG Data URI](https://github.com/tigt/mini-svg-data-uri) - SVG data URI minification
- [React Router](https://reactrouter.com/) - Routing for React applications
- [DND-Kit](https://dndkit.com/) - Drag and drop toolkit

## 📝 About

SVG Gobbler started over 7 years ago as a project to improve upon the
[SVG Crowbar](https://github.com/nytimes/svg-crowbar) tool (no longer maintained by NY Times). Now
in its 5th major version, it continues to evolve.

## 🔒 Privacy

This extension is open source and doesn't collect any user information. It's completely free and
made available because I enjoy creating useful tools for the web community.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue with ideas,
bug fixes, or feature requests.

## 🔗 More Projects

Check out [what I'm working on lately](https://rossmoody.com).

---

<div align="center">
  <p>Made with ❤️ by Ross Moody</p>
</div>
