// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/fonts.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../fonts/Roboto/Roboto-Light.ttf":[["Roboto-Light.1d4b9cc7.ttf","fonts/Roboto/Roboto-Light.ttf"],"fonts/Roboto/Roboto-Light.ttf"],"./../fonts/Roboto/Roboto-Regular.ttf":[["Roboto-Regular.8dab8bad.ttf","fonts/Roboto/Roboto-Regular.ttf"],"fonts/Roboto/Roboto-Regular.ttf"],"./../fonts/Roboto/Roboto-Medium.ttf":[["Roboto-Medium.7e19ad06.ttf","fonts/Roboto/Roboto-Medium.ttf"],"fonts/Roboto/Roboto-Medium.ttf"],"./../fonts/Roboto/Roboto-Bold.ttf":[["Roboto-Bold.335e2e5e.ttf","fonts/Roboto/Roboto-Bold.ttf"],"fonts/Roboto/Roboto-Bold.ttf"],"./../fonts/SebastianBold/SebastianBold.ttf":[["SebastianBold.b58fd8e6.ttf","fonts/SebastianBold/SebastianBold.ttf"],"fonts/SebastianBold/SebastianBold.ttf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./css/fonts.css":"css/fonts.css","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/area-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AreaMap {
  constructor(coordinates, myMap, polygonColor) {
    this.coordinates = coordinates;
    this.myMap = myMap;
    this.polygonColor = polygonColor;
    this.geos = [];
    this.prepareMap();
  }

  hide() {
    this.geos.forEach(geoObject => {
      geoObject.options.set("visible", false);
    });
    console.log('Hide');
  }

  show() {
    this.geos.forEach(geoObject => {
      geoObject.options.set("visible", true);
    });
    console.log('Show');
  }

  prepareMap() {
    for (let index = 0; index < this.coordinates.length; index++) {
      var myPlacemarkWithContent_1 = new ymaps.Placemark(this.coordinates[index], {
        iconCaption: index,
        // Текст при наведении на метку
        hintContent: "Дом Марины и Жени",
        //Текст при нажатии на метку
        balloonContent: this.coordinates[index][0] + "<br>" + this.coordinates[index][1]
      }, {
        preset: "islands#greenDotIconWithCaption",
        iconColor: this.polygonColor
      });
      this.myMap.geoObjects.add(myPlacemarkWithContent_1);
      this.geos.push(myPlacemarkWithContent_1);
    } // Создаем многоугольник, используя вспомогательный класс Polygon.


    this.polygon = new ymaps.Polygon([// Указываем координаты вершин многоугольника.
    // Координаты вершин внешнего контура.
    this.coordinates], {
      // Описываем свойства геообъекта.
      // Содержимое балуна.
      hintContent: "Многоугольник"
    }, {
      // Задаем опции геообъекта.
      // Цвет заливки.
      fillColor: this.polygonColor,
      strokeColor: "#FFFFFF",
      // Ширина обводки.
      strokeWidth: 0.5
    });
    this.myMap.geoObjects.add(this.polygon);
    this.geos.push(this.polygon);
    console.log("Длина пути: " + this.polygon.geometry.getBounds());
  }

}

exports.default = AreaMap;
},{}],"js/switch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Switch {
  constructor(title, onSwitch) {
    let div = addElement(title);
    this.onSwitch = onSwitch;
    this.element = div.querySelector(".switch-btn");
    this.activeClass = 'switch-on';
    this.element.classList.toggle(this.activeClass);
    this.setup();
  }

  setup() {
    this.element.addEventListener('click', () => {
      let isOn = this.element.classList.toggle(this.activeClass);
      this.onSwitch(isOn);
    });
  }

}

exports.default = Switch;

function addElement(title) {
  // Создаём новый элемент div
  // и добавляем в него немного контента
  let div = document.createElement("div");
  div.className = "switch-btns__item";
  div.innerHTML = "<div class=\"switch-btns__item\"> <h3>" + title + "</h3><div class=\"switch-btn\" id=\"switch\"></div></div>"; // Добавляем только что созданный элемент в дерево DOM

  let container = document.querySelector(".switch-btns__container");
  container.appendChild(div);
  return div;
}
},{}],"js/yandex-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _areaMap = _interopRequireDefault(require("./area-map"));

var _switch = _interopRequireDefault(require("./switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class YandexMap {
  constructor() {
    this.init();
  }

  init() {
    ymaps.ready(function () {
      console.log("READYYYY");
      var myMap = new ymaps.Map("yamap", {
        center: [57.179300422, 36.541094922],
        zoom: 17,
        type: "yandex#hybrid"
      }, {
        searchControlProvider: "yandex#search"
      });
      let coordinates1 = [[57.179300422, 36.541094922], [57.179363806, 36.541661756], [57.178966376, 36.541806659], [57.178355721, 36.542029958], [57.17829459, 36.541462542], [57.179300422, 36.541094922]];
      let coordinates2 = [[57.179397279, 36.542292888], [57.1794529, 36.542895716], [57.178272897, 36.543363467], [57.17820305, 36.542765376], [57.179397279, 36.542292888]];
      let first = new _areaMap.default(coordinates1, myMap, "#00FF0088");
      let firstSwitch = new _switch.default("Дом Марины и Жени", function (isOn) {
        if (isOn) {
          first.show();
        } else {
          first.hide();
        }
      });
      let sec = new _areaMap.default(coordinates2, myMap, "#FF00FF40");
      new _switch.default("Дом 3", function (isOn) {
        if (isOn) {
          sec.show();
        } else {
          sec.hide();
        }
      });
    });
  }

}

exports.default = YandexMap;
},{"./area-map":"js/area-map.js","./switch":"js/switch.js"}],"../index.js":[function(require,module,exports) {
"use strict";

require("./src/main.scss");

var _yandexMap = _interopRequireDefault(require("./src/js/yandex-map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', event => {
  if (document.getElementById('yamap')) {
    new _yandexMap.default();
  }
});
},{"./src/main.scss":"main.scss","./src/js/yandex-map.js":"js/yandex-map.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52633" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../index.js"], null)
//# sourceMappingURL=/map-house.80dfb952.js.map