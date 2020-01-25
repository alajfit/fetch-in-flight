process.env.HMR_PORT=0;process.env.HMR_HOSTNAME="localhost";parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QCba":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(t,e){void 0===e&&(e=0),this.flights=new Map,this.CACHE_TIME=0,this.CACHE_FETCH=t||window.fetch,this.CACHE_TIME=e}return e.prototype.hashCode=function(t){return Array.from(t).reduce(function(t,e){return Math.imul(31,t)+e.charCodeAt(0)|0},0).toString()},e.prototype.uniqueKey=function(t,e,n){return this.hashCode(t+(e.method||"GET")+JSON.stringify(e)+(n?Math.random():""))},e.prototype.newFlight=function(e,n,i,r,o){var s=this;this.flights.set(e,{promise:this.CACHE_FETCH(n,t({},i)).then(function(t){return s.landing(e,"resolve",t)}).catch(function(t){return s.landing(e,"reject",t)}).then(function(t){return s.cleanUp(e)}),listeners:[{resolve:r,reject:o}],cache:null})},e.prototype.inFlight=function(t,e,n){null!==this.flights.get(t).cache?e(this.flights.get(t).cache.clone()):this.flights.get(t).listeners.push({resolver:e,rejecter:n})},e.prototype.landing=function(t,e,n){this.flights.get(t).listeners.forEach(function(t){return t[e](n.clone())}),"resolve"===e&&(this.flights.get(t).cache=n)},e.prototype.cleanUp=function(t){var e=this;setTimeout(function(){return e.flights.delete(t)},null!==this.flights.get(t).cache?this.CACHE_TIME:0)},e.prototype.fetch=function(t,e,n){var i=this;void 0===e&&(e={}),void 0===n&&(n=!1);var r=this.uniqueKey(t,e,n);return new Promise(function(n,o){i.flights.get(r)?i.inFlight(r,n,o):i.newFlight(r,t,e,n,o)})},e}();exports.default=e;
},{}]},{},["QCba"], null)
//# sourceMappingURL=/fetch-in-flight.esm.js.map