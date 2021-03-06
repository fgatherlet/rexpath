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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index-node.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index-node.js":
/*!***************************!*\
  !*** ./src/index-node.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n/* i do not know so much about lame and ridicurous js(node) module. */\nObject.assign(exports, _index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack:///./src/index-node.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar rexpath = {};\n\nrexpath.init = function(window) {\n  /* inject global `rexpath`. may be bad manner. */\n  window.rexpath = rexpath;\n  /* for node.js unit test... there may be other proper way.. */\n  rexpath.window = window;\n  var document = rexpath.window.document;\n  var HTMLDocument = rexpath.window.HTMLDocument;\n  var HTMLElement = rexpath.window.HTMLElement;\n  var XPathResult = rexpath.window.XPathResult;\n\n  /* -------------------- inject rexpath to element */\n  HTMLDocument.prototype.rexpath = function(q) {\n    var from_node = this;\n    return rexpath.rexpath_internal(q, from_node, false);\n  };\n  HTMLDocument.prototype.rexpath_all = function(q) {\n    var from_node = this;\n    return rexpath.rexpath_internal(q, from_node, true);\n  };\n  // Sync method from html-document to html-element.\n  ['rexpath_raw_find_all'\n   ,'rexpath'\n   ,'rexpath_all'].forEach(method=>{\n      HTMLElement.prototype[method] = HTMLDocument.prototype[method];\n    });\n\n  /* -------------------- compiler */\n  Function.prototype.rexpath_compile = function (cont=rexpath.rexpath_return) {\n    // already compiled function.\n    return this;\n  };\n  String.prototype.rexpath_compile = function (cont=rexpath.rexpath_return) {\n    // string is xpath.\n    var q = this;\n    return function(node, env) {\n      if (!env.allp && env.foundp) { return; }\n      var found = node.rexpath_raw_find_all(q);\n      var found_len = found.length;\n      for (var i=0; i<found_len; i++) {\n        var xnode = found[i];\n        cont(xnode, env);\n      }\n    };\n  };\n  Array.prototype.rexpath_compile = function (cont=rexpath.rexpath_return){\n    // array(list) is dispatched with head.\n    var q = this;\n    var head = q[0];\n    if (! head) {\n      throw 'rexpath_compile cannot accept blank array.';\n    }\n\n    if (head == '@~') {\n      return rexpath.rexpath_compile_regex_attribute(q, cont);\n    } else if (head == '~') {\n      return rexpath.rexpath_compile_regex_text(q, cont);\n    } else if (head == 'and') {\n      return rexpath.rexpath_compile_and(q, cont);\n    } else if (head == 'or') {\n      return rexpath.rexpath_compile_or(q, cont);\n    }\n  };\n  this.use_xpath();\n};\n\n/* -------------------- inject rexpat_raw_find_all. as xpath or querySelector */\nrexpath.use_xpath = function() {\n  var document = rexpath.window.document;\n  var HTMLDocument = rexpath.window.HTMLDocument;\n  var HTMLElement = rexpath.window.HTMLElement;\n  var XPathResult = rexpath.window.XPathResult;\n\n  HTMLElement.prototype.rexpath_raw_find_all =\n    HTMLDocument.prototype.rexpath_raw_find_all =\n    function(q) {\n      var xp = document.evaluate(q, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n      var ar = new Array(xp.snapshotLength);\n      for (var i=0; i<xp.snapshotLength; i++) {\n        ar[i] = xp.snapshotItem(i);\n      }\n      return ar;\n    };\n};\nrexpath.use_css_selector = function() {\n  var document = rexpath.window.document;\n  var HTMLDocument = rexpath.window.HTMLDocument;\n  var HTMLElement = rexpath.window.HTMLElement;\n  var XPathResult = rexpath.window.XPathResult;\n\n  HTMLElement.prototype.rexpath_raw_find_all =\n    HTMLDocument.prototype.rexpath_raw_find_all =\n    function(q) {\n      var self = this;\n      try {\n        var ar = self.querySelectorAll(q) || [];\n        return ar;\n      } catch (e) {\n        console.log(`querySelectorAll error. self:${self} e:${e}`);\n        return [];\n      }\n    };\n};\n\n/* -------------------- top level continuation */\nrexpath.rexpath_return = function(node, env) {\n  if (!env.allp && env.foundp) { return; }\n  env.foundp = true;\n  env.found = env.found || new Map;\n  env.found.set(node, true);\n};\nrexpath.rexpath_compile_regex_attribute = function(q, cont) {\n  const attribute_key = q[1];\n  const regex = q[2]; /* RegExp Object. */\n  if (!attribute_key || !regex) {\n    throw 'rexpath_compile_regex_attribute accept blank input.';\n  }\n\n  return function(node, env) {\n    if (!env.allp && env.foundp) { return; }\n    const attribute_value = node.getAttribute(attribute_key);\n    if (!attribute_value) { return; }\n    const match = attribute_value.match(regex);\n    if (match) {\n      cont(node, env);\n    }\n  };\n};\nrexpath.rexpath_compile_regex_text = function(q, cont) {\n  const regex = q[1];\n  if (!regex) {\n    throw 'rexpath_compile_regex_text accept blank input.';\n  }\n\n  return function(node, env) {\n    if (!env.allp && env.foundp) { return; }\n    const text_value = node.textContent;\n    if (!text_value) { return; }\n    const match = text_value.match(regex);\n    if (match) {\n      cont(node, env);\n    }\n  };\n};\nrexpath.rexpath_compile_and = function(q, cont) {\n  let xcont = cont;\n  const qlen = q.length;\n  for(var i = qlen - 1; 1 <= i; i--) {\n    const qpart = q[i];\n    xcont = qpart.rexpath_compile(xcont);\n  }\n  return xcont;\n};\nrexpath.rexpath_compile_or = function(q, cont) {\n  const qlen = q.length;\n  const or_branch = q.slice(1).map( qpart=>qpart.rexpath_compile(cont) );\n  const or_branch_len = qlen - 1;\n  return function(node, env) {\n    if (!env.allp && env.foundp) {return;}\n    for (var i = 0; i <= or_branch_len-1; i++) {\n      (or_branch[i])(node, env);\n    }\n  };\n};\n\n/* -------------------- driver */\nrexpath.rexpath_internal = function(q, from_node, allp=false) {\n  var aout = q.rexpath_compile(rexpath.rexpath_return);\n  var env = {};\n  env.allp = allp;\n\n  aout(from_node, env);\n\n  if (! env.foundp) { return; }\n  var found_array = Array.from(env.found.keys()) || [];\n\n  if (allp) {\n    return found_array;\n  } else {\n    return found_array[0];\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (rexpath);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });