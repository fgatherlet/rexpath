!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n={init:function(t){t.rexpath=n,n.window=t;n.window.document;var e=n.window.HTMLDocument,r=n.window.HTMLElement;n.window.XPathResult;e.prototype.rexpath=function(t){return n.rexpath_internal(t,this,!1)},e.prototype.rexpath_all=function(t){return n.rexpath_internal(t,this,!0)},["rexpath_raw_find_all","rexpath","rexpath_all"].forEach(t=>{r.prototype[t]=e.prototype[t]}),Function.prototype.rexpath_compile=function(t=n.rexpath_return){return this},String.prototype.rexpath_compile=function(t=n.rexpath_return){var e=this;return function(r,n){if(n.allp||!n.foundp)for(var o=r.rexpath_raw_find_all(e),a=o.length,p=0;p<a;p++){var i=o[p];t(i,n)}}},Array.prototype.rexpath_compile=function(t=n.rexpath_return){var e=this,r=e[0];if(!r)throw"rexpath_compile cannot accept blank array.";return"@~"==r?n.rexpath_compile_regex_attribute(e,t):"~"==r?n.rexpath_compile_regex_text(e,t):"and"==r?n.rexpath_compile_and(e,t):"or"==r?n.rexpath_compile_or(e,t):void 0},this.use_xpath()},use_xpath:function(){var t=n.window.document,e=n.window.HTMLDocument,r=n.window.HTMLElement,o=n.window.XPathResult;r.prototype.rexpath_raw_find_all=e.prototype.rexpath_raw_find_all=function(e){for(var r=t.evaluate(e,this,null,o.ORDERED_NODE_SNAPSHOT_TYPE,null),n=new Array(r.snapshotLength),a=0;a<r.snapshotLength;a++)n[a]=r.snapshotItem(a);return n}},use_css_selector:function(){n.window.document;var t=n.window.HTMLDocument,e=n.window.HTMLElement;n.window.XPathResult;e.prototype.rexpath_raw_find_all=t.prototype.rexpath_raw_find_all=function(t){try{return this.querySelectorAll(t)||[]}catch(t){return console.log(`querySelectorAll error. self:${this} e:${t}`),[]}}},rexpath_return:function(t,e){!e.allp&&e.foundp||(e.foundp=!0,e.found=e.found||new Map,e.found.set(t,!0))},rexpath_compile_regex_attribute:function(t,e){const r=t[1],n=t[2];if(!r||!n)throw"rexpath_compile_regex_attribute accept blank input.";return function(t,o){if(!o.allp&&o.foundp)return;const a=t.getAttribute(r);a&&a.match(n)&&e(t,o)}},rexpath_compile_regex_text:function(t,e){const r=t[1];if(!r)throw"rexpath_compile_regex_text accept blank input.";return function(t,n){if(!n.allp&&n.foundp)return;const o=t.textContent;o&&o.match(r)&&e(t,n)}},rexpath_compile_and:function(t,e){let r=e;for(var n=t.length-1;1<=n;n--){r=t[n].rexpath_compile(r)}return r},rexpath_compile_or:function(t,e){const r=t.length,n=t.slice(1).map(t=>t.rexpath_compile(e)),o=r-1;return function(t,e){if(e.allp||!e.foundp)for(var r=0;r<=o-1;r++)n[r](t,e)}},rexpath_internal:function(t,e,r=!1){var o=t.rexpath_compile(n.rexpath_return),a={};if(a.allp=r,o(e,a),a.foundp){var p=Array.from(a.found.keys())||[];return r?p:p[0]}}};e.default=n}]);