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
})({"assets/SimpleMediaPlayer.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SimpleMediaPlayer =
/** @class */
function () {
  function SimpleMediaPlayer(config) {
    this.media = config.el;
    this.plugins = config.plugins || []; //Default value of empty array to prevent wrong state.

    this.initPlugins();
  }

  SimpleMediaPlayer.prototype.initPlugins = function () {
    var _this = this;

    this.plugins.forEach(function (plugin) {
      plugin.run(_this); //Method run must be implemented for each active plugin
    });
  };

  SimpleMediaPlayer.prototype.play = function () {
    this.media.play();
  };

  SimpleMediaPlayer.prototype.pause = function () {
    this.media.pause();
  };

  SimpleMediaPlayer.prototype.togglePlay = function () {
    this.media.paused ? this.play() : this.pause();
  };

  SimpleMediaPlayer.prototype.mute = function () {
    this.media.muted = true;
  };

  SimpleMediaPlayer.prototype.unmute = function () {
    this.media.muted = false;
  };

  return SimpleMediaPlayer;
}(); // SimpleMediaPlayer.prototype.toggleMute = function(){
//   this.media.muted = !this.media.muted;
//}


exports.default = SimpleMediaPlayer;
},{}],"assets/plugins/AutoPlay.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AutoPlay =
/** @class */
function () {
  function AutoPlay() {}

  AutoPlay.prototype.run = function (player) {
    if (!player.media.muted) {
      player.mute();
    } //browser won't let it play on charging for accessibility, unless it is muted


    player.play();
  };

  ;
  return AutoPlay;
}();

exports.default = AutoPlay;
},{}],"assets/plugins/AutoPause.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AutoPause =
/** @class */
function () {
  function AutoPause() {
    this.threshold = 0.25;
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibility = this.handleVisibility.bind(this);
  }

  AutoPause.prototype.run = function (player) {
    this.player = player;
    var observer = new IntersectionObserver(this.handleIntersection, {
      threshold: this.threshold
    });
    observer.observe(this.player.media);
    document.addEventListener('visibilitychange', this.handleVisibility);
  };

  AutoPause.prototype.handleIntersection = function (entries) {
    var entry = entries[0];
    var isVisible = entry.intersectionRatio >= this.threshold;
    isVisible ? this.player.play() : this.player.pause();
  };

  AutoPause.prototype.handleVisibility = function () {
    var isVisible = document.visibilityState === 'visible';
    isVisible ? this.player.play() : this.player.pause();
  };

  return AutoPause;
}();

exports.default = AutoPause;
},{}],"assets/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SimpleMediaPlayer_1 = __importDefault(require("./SimpleMediaPlayer"));

var AutoPlay_1 = __importDefault(require("./plugins/AutoPlay"));

var AutoPause_1 = __importDefault(require("./plugins/AutoPause")); //DEFINITIONS/////////


var playerSchema = document.querySelector('.player');
var video = document.querySelector('video.movie');
var player = new SimpleMediaPlayer_1.default({
  el: video,
  plugins: [new AutoPlay_1.default(), new AutoPause_1.default()]
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js").catch(function (error) {
    console.log(error.message);
  });
} //FUNCTIONS///////


function toggleButtonMute() {
  var icon = player.media.muted ? '🔇' : '🔈';
  button__speaker.textContent = icon;
}

function handleProgress() {
  var percent = player.media.currentTime / player.media.duration * 100;
  progressBar.style.flexBasis = percent + "%";
}

function toggleButtonPlay() {
  var icon = player.media.paused ? '►' : '❚ ❚';
  button__play.textContent = icon;
} //Volume and speed ranges


function handleRangeUpdate() {
  video[this.name] = this.value;
}

function moveProgress(e) {
  var scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  ;
} //CONTROLS///////


var button__play = document.querySelector('.button__player');
var button__speaker = document.querySelector('.button__speaker');
var progress = playerSchema.querySelector('.progress');
var progressBar = playerSchema.querySelector('.progress__filled');
var skipButtons = playerSchema.querySelectorAll('[data-skip]');
var ranges = playerSchema.querySelectorAll('.player__slider');
var fullScreenButton = document.querySelector('.full__screen'); //EVENTS////////
//Page charges

window.onload = function () {
  toggleButtonPlay();
  toggleButtonMute();
}; //play/pause button


button__play.onclick = function () {
  player.togglePlay();
  toggleButtonPlay();
}; //Muted button


button__speaker.onclick = function () {
  if (player.media.muted) {
    player.unmute();
  } else {
    player.mute();
  }

  toggleButtonMute();
};

function toggleFullScreen() {
  fullScreen = !fullScreen;
  if (fullScreen) video.requestFullscreen();
}

video.addEventListener('timeupdate', handleProgress);

video.onclick = function () {
  player.togglePlay();
  toggleButtonPlay();
}; //Ranges for volume and progress


ranges.forEach(function (range) {
  return range.addEventListener('change', handleRangeUpdate);
});
ranges.forEach(function (range) {
  return range.addEventListener('mousemove', handleRangeUpdate);
}); //Handle calcs and change of progress

var mousedown = false;
progress.addEventListener('click', moveProgress);
progress.addEventListener('mousemove', function (e) {
  return mousedown && moveProgress(e);
});
progress.addEventListener('mousedown', function () {
  return mousedown = true;
});
progress.addEventListener('mouseup', function () {
  return mousedown = false;
});
skipButtons.forEach(function (button) {
  return button.addEventListener('click', skip);
});
var fullScreen = false;
fullScreenButton.addEventListener('click', toggleFullScreen);

if ('serviceWorker' in Navigator) {
  navigator.serviceWorker.register("/serviceWorker.js").catch(function (error) {
    console.log(error.message);
  });
}
},{"./SimpleMediaPlayer":"assets/SimpleMediaPlayer.ts","./plugins/AutoPlay":"assets/plugins/AutoPlay.ts","./plugins/AutoPause":"assets/plugins/AutoPause.ts","/Users/anaarrabal/Web/Proyecto_js_avanzado/SimpleMediaPlayer/MediaPlayerJs/serviceWorker.js":[["serviceWorker.js","serviceWorker.js"],"serviceWorker.js.map","serviceWorker.js"]}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56838" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/index.ts"], null)
//# sourceMappingURL=/assets.71ddc51b.js.map