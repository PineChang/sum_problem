(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/promotion/match_2014/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var STORAGE_KEY = 'EVENT_YueduAndBoluo_2015';
	var showMask = false; //是否显示浮层
	var showBanner = true;  //是否显示侧边banner
	
	// 2015.11.1 0:0:0
	var StartTime = new Date(2015, 10, 1, 0, 0, 0);
	// 2016.10.16 0:0:0
	var EXPIRT_MS = new Date(2016, 09, 16, 0, 0, 0);
	// 2015.11.13 0:0:0
	var TaipingTime = new Date(2015, 10, 13, 0, 0, 0);
	var now = new Date();
	if (StartTime < now && now < EXPIRT_MS) {
	  // localStorage.clear();

	var value = localStorage.getItem(STORAGE_KEY);
	if (showMask && !value && ($(document.body).hasClass('page-index'))) {
	  var mask = $('<div class="m-mask" style="display:block;"></div>');
	  mask.height($(document).height());
	  mask.appendTo(document.body);


	  var $dialog = $('<div id="event_match_2014_dialog" style="display:none;"><div class="action_area"><a href="http://yuedu.163.com/special/002163EC/xuanhuan.html" target="_blank" class="readmore_link j_readmore_link">马上加入&gt;</a></div><a href="javascript:" class="j-close close" title="关闭">&nbsp;</a></div>').appendTo(document.body);

	  $(function() {
	    YD.openLayer($dialog, 'on');
	  });

	  $dialog.delegate('.j_readmore_link', 'click', function() {
	    $dialog.hide();
	    $dialog.trigger('hide');
	    $('.m-mask').hide();
	  });

	  $dialog.bind('hide', function() {
	    localStorage.setItem(STORAGE_KEY, '1');
	  });
	}

	var setupEntry = function() {
		if(now < TaipingTime) {
			var $entry = $('<a href="http://yuedu.163.com/goto?type=taiping" target="_blank" class="event_match_2014_entry"><img src="http://easyread.nos.netease.com/web/trunk/1446448567170/taiping.jpg" width="80"></a>').appendTo(document.body);
			var self_width = 80;  //根据图片宽度修改
		}
		else {
			var $entry = $('<a href="http://item.jd.com/2038057.html" target="_blank" class="event_match_2014_entry"><img src="http://easyread.nos.netease.com/web/trunk/1444629697834/qingguo.png" width="110"></a>').appendTo(document.body);
			var self_width = 110;  //根据图片宽度修改
		}	  

	  function position() {
	    var offset_right = 30;
	    var offset_left = ($(window).width() - 980) / 2 - self_width - offset_right;

	    $entry.css('left', offset_left);
	    $entry.css('bottom', 30);
	  }

	  position();

	  var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;

	  $(window).resize(function() {
		  position();
	  });

	  function ie6PositionFixed() {
	    $entry.css('bottom', 30);
	  }

	  // YD.setFixed($entry);

	  if (isIE6) {
	     $(window).scroll(ie6PositionFixed);
	  }
	};

	//只在首页、男频、女频、排行榜和书籍详情页添加banner
	if (showBanner && window.EVENT_MATCH_2014_SHOW !== false) {
		if($(document.body).hasClass('page-index') || $(document.body).hasClass('m-yc') || $(document.body).hasClass('m-ycmm') || $(document.body).hasClass('page-bookSource') || $(document.body).hasClass('page-bookRank') ) {			
			setupEntry();
		}		
	}




	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(3)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!D:\\eclipse_new\\yuedu_workspace\\yueduWebB1\\src\\main\\webapp\\node_modules\\css-loader\\index.js!D:\\eclipse_new\\yuedu_workspace\\yueduWebB1\\src\\main\\webapp\\promotion\\match_2014\\index.css", function() {
			var newContent = require("!!D:\\eclipse_new\\yuedu_workspace\\yueduWebB1\\src\\main\\webapp\\node_modules\\css-loader\\index.js!D:\\eclipse_new\\yuedu_workspace\\yueduWebB1\\src\\main\\webapp\\promotion\\match_2014\\index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".event_match_2014_entry {\n  position: fixed;\n  _position: absolute;\n  bottom: 20px;\n z-index: 99;\n line-height:0;\n}\n\n#event_match_2014_dialog {\n  background: url("+__webpack_require__(5)+");\n  width: 600px;\n  height: 370px;\n  position: absolute;\n}\n\n\n#event_match_2014_dialog .close {\n  position: absolute;\n  right: 9px;\n  top: 7px;\n  width: 25px;\n  height: 25px;\n}\n\n#event_match_2014_dialog a:hover {\n  text-decoration: none;\n}\n\n#event_match_2014_dialog .action_area  {\n  width: 50px;\n margin-left: 510px;\n   height: 100%;\n}\n\n#event_match_2014_dialog .readmore_link {\n  display:block;\n margin-top: 110px;\n  width:50px;\n  height:140px;\n  text-indent:-9999px;\n}\n\n", ""]);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "float-layer.jpg"

/***/ }
/******/ ])
});
