/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/gobbler.js":
/*!********************************!*\
  !*** ./src/scripts/gobbler.js ***!
  \********************************/
/*! exports provided: gobbler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gobbler\", function() { return gobbler; });\nconst gobbler = () => {\n  const findSVGs = () => {\n    // Collect all SVG content\n    const svgTagLoc = Array.from(document.querySelectorAll('svg'))\n    const svgObjLoc = Array.from(\n      document.querySelectorAll('object[data*=\".svg\"]')\n    )\n    const svgImgLoc = Array.from(document.querySelectorAll('img[src*=\".svg\"]'))\n    const allSVGs = svgTagLoc.concat(svgImgLoc, svgObjLoc)\n    return allSVGs\n  }\n\n  const getLocation = allSVGs => {\n    const svgInfo = []\n    allSVGs.forEach(i => {\n      const svgLoc = i.getBoundingClientRect()\n      svgInfo.push({\n        top: svgLoc.top,\n        left: svgLoc.left,\n        element: i,\n      })\n    })\n    return svgInfo\n  }\n\n  const getSources = svgInfo => {\n    svgInfo = svgInfo.map(i => {\n      let serializer = new XMLSerializer()\n      let parser = new DOMParser()\n      let ajax = new XMLHttpRequest()\n      if (i.element.hasAttribute('src')) {\n        ajax.open('GET', i.element.src, true)\n        ajax.send()\n        ajax.onload = function(e) {\n          let string = parser.parseFromString(\n            ajax.responseText,\n            'image/svg+xml'\n          ).children[0]\n          string = serializer.serializeToString(string)\n          i.source = [string]\n        }\n        return i\n      } else if (i.element.hasAttribute('data')) {\n        ajax.open('GET', i.element.data, true)\n        ajax.send()\n        ajax.onload = function(e) {\n          let string = parser.parseFromString(\n            ajax.responseText,\n            'image/svg+xml'\n          ).children[0]\n          string = serializer.serializeToString(string)\n          i.source = [string]\n        }\n        return i\n      } else {\n        const string = serializer.serializeToString(i.element)\n        i.source = [string]\n        return i\n      }\n    })\n    return svgInfo\n  }\n\n  const createDownload = svg => {\n    let filename = 'svgeezy-icon'\n    const url = window.URL.createObjectURL(\n      new Blob(svg.source, { type: 'text/xml' })\n    )\n\n    const a = document.createElement('a')\n    document.body.appendChild(a)\n    a.setAttribute('download', `${filename}.svg`)\n    a.setAttribute('href', url)\n    a.click()\n  }\n\n  const createButtons = svgInfo => {\n    const container = document.createElement('div')\n    container.setAttribute('class', 'svg-gobbler')\n    document.body.appendChild(container)\n\n    svgInfo.forEach((svg, id) => {\n      const btnContainer = document.createElement('div')\n      container.appendChild(btnContainer)\n      btnContainer.setAttribute('class', 'svg-gobbler__btn-container')\n      btnContainer.style['top'] = `${svg.top + document.body.scrollTop}px`\n      btnContainer.style['left'] = `${svg.left + document.body.scrollLeft}px`\n\n      const btn = document.createElement('button')\n      btnContainer.appendChild(btn)\n      btn.setAttribute('class', 'svg-gobbler__btn-container__btn')\n      btn.setAttribute('data-source-id', id)\n      btn.textContent = 'Download'\n\n      btn.onclick = () => {\n        createDownload(svg)\n      }\n    })\n  }\n\n  // const processSVG = (svg) => {\n\n  // }\n\n  const getSVGeez = () => {\n    // Find svg content\n    const allSVGs = findSVGs()\n\n    // Log location info\n    let svgInfo = getLocation(allSVGs)\n\n    // Log source information\n    svgInfo = getSources(svgInfo)\n\n    // Create buttons\n    createButtons(svgInfo)\n  }\n\n  getSVGeez()\n}\n\n\n//# sourceURL=webpack:///./src/scripts/gobbler.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gobbler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gobbler.js */ \"./src/scripts/gobbler.js\");\n/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/style.scss */ \"./src/styles/style.scss\");\n/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_style_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nObject(_gobbler_js__WEBPACK_IMPORTED_MODULE_0__[\"gobbler\"])()\n\n\n//# sourceURL=webpack:///./src/scripts/index.js?");

/***/ }),

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/styles/style.scss?");

/***/ })

/******/ });