(function(window, undefined) {
    window.Mi = window.Mi || {};

    var Utils = {
        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === "[object Array]";
        },
        each: function(obj, callback) {
            if (Utils.isArray(obj)) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    callback && callback(i, obj[i]);
                }
            } else {
                for (var key in obj) {
                    callback && callback(key, obj[key]);
                }
            }
        },
        clone: function(obj) {
            var out = null;
            if (Utils.isArray(obj)) {
                out = [];
                Utils.each(obj, function(i, e) {
                    out.push(e);
                });
            } else {
                out = {};
                Utils.each(obj, function(i, e) {
                    out[i] = e;
                });
            }
            return out;
        },
        merge: function(baseObj, extendObj, moreObj) {
            var args = arguments,
                len = args.length,
                temp = {};

            for (var i = len - 1; i > 0; i--) {
                if (Utils.isArray(args[i - 1])) {
                    temp = {};
                    for (var j = 0; j < args[i - 1].length; j++) {
                        temp[j] = args[i - 1][j];
                    }
                    args[i - 1] = temp;
                }

                if (Utils.isArray(args[i])) {
                    for (var j = 0; j < args[i].length; j++) {
                        args[i - 1][j] = args[i][j];
                    }
                } else {
                    for (var j in args[i]) {
                        args[i - 1][j] = args[i][j];
                    }
                }
            }
            return args[0];
        },
        trim: function(str) {
            var rBlank = /(^\s+)|(\s+$)/g;
            return str.replace(rBlank, "");
        },
        hasClass: function(node, cls) {
            var clsn = node.className,
                rCls = new RegExp("(^|\\s+)" + cls + "(\\s+|$)", "g");
            return rCls.test(clsn);
        },
        addClass: function(node, cls) {
            var clsn = node.className;
            if (!Utils.hasClass(node, cls)) {
                node.className = clsn + " " + cls;
            }
        },
        removeClass: function(node, cls) {
            var clsn = node.className,
                rCls = new RegExp("(^|\\s+)" + cls + "(\\s+|$)", "g");
            if (Utils.hasClass(node, cls)) {
                node.className = Utils.trim(clsn.replace(rCls, "$1$2"));
            }
        }
    };

    var _default = {
        page: "J_opaPage", // id
        dragger: "J_opaScroll", // id
        pannel: "J_opaPannel", // class
        transEnd: function() {}
    };

    var css3Surport = function() {
        var obj = {},
            div = document.createElement("div"),
            style = div.style;
        if ('-webkit-transition' in style) {
            obj.prefix = 'webkit';
        } else if ('-o-transition' in style) {
            obj.prefix = 'o';
        } else if ('-ms-transition' in style) {
            obj.prefix = 'ms';
        } else {
            obj.prefix = '';
        }
        return obj;
    }

    function Moonlight(cfg) {
        var config;

        this.config = Utils.merge({}, _default, cfg || {});
        config = Utils.clone(this.config);

        this.get = function(key) {
            return config[key];
        }
        this.set = function(key, val) {
            config[key] = val;
        }

        this.init();
    }

    Moonlight.prototype = {
        init: function() {
            this.set('pageNode', document.querySelector('#' + this.get('page')));
            this.set('dragger', document.querySelector('#' + this.get('dragger')));
            this.set('pannels', this.get('pageNode').querySelectorAll('.' + this.get('pannel')));
            this.set('count', this.get('pannels').length);
            this.set('offset', {
                left: 0,
                top: 0
            });
            if (this.get('size')) {
                this.set('vw', this.get('size').width || (window.innerWidth > 640 ? 640 : window.innerWidth));
                this.set('vh', this.get('size').height || window.height);
            } else {
                this.set('vw', (window.innerWidth > 640 ? 640 : window.innerWidth));
                this.set('vh', window.height);
            }
            this.set('prefix', css3Surport().prefix);
            if (this.get('prefix')) {
                this.set('transform', this.get('prefix') + 'Transform');
            } else {
                this.set('transform', 'transform');
            }
            this.parsePannel();
            this.preload(0);
            this.bindEvent();
        },
        parsePannel: function() {
            var _this = this,
                pans = _this.get('pannels'),
                len = _this.get('count');
            for (var i = 0; i < len; i++) {
                pans[i].setAttribute('data-index', i);
                pans[i].style.width = _this.get('vw') + 'px';
                pans[i].style.height = _this.get('vh') + 'px';
                if (i == 0) {
                    Utils.addClass(pans[i], 'current');
                    Utils.addClass(pans[i], 'start-animate');
                }
            }
        },
        preload: function(index) {
            var pans = this.get('pannels'),
                nextIndex = index + 1;
            if (pans[nextIndex] && pans[nextIndex].querySelector('.J_MiLazyLoad')) {
                pans[nextIndex].innerHTML = pans[nextIndex].querySelector('.J_MiLazyLoad').innerHTML;
            }
        },
        hasNext: function(currentNodeIndex, flag) {
            var pans = this.get('pannels');
            if (flag == -1) {
                return pans[currentNodeIndex - 1];
            } else {
                return pans[currentNodeIndex + 1];
            }
        },
        getNext: function(nowIndex, dir) {
            var pans = this.get('pannels');
            switch (dir) {
                case 'up':
                    return pans[nowIndex - 1];
                case 'down':
                    return pans[nowIndex + 1];
            }
            return;
        },
        bindEvent: function() {
            var _this = this,
                page = _this.get('pageNode'),
                dragger = _this.get("dragger"),
                pans = _this.get('pannels'),
                count = _this.get('count'),
                vh = _this.get('vh'),
                ofs = {},
                start = {
                    x: 0,
                    y: 0
                },
                end = {
                    x: 0,
                    y: 0
                },
                dis = 0;

            var touchStart = function(ev) {
                var evo = ev.touches ? ev.touches[0] : ev;
                ofs = _this.get('offset');
                start = {
                    x: evo.clientX,
                    y: evo.clientY
                };

                var touchMove = function(ev) {
                    ev.preventDefault();

                    evo = ev.touches ? ev.touches[0] : ev;
                    end = {
                        x: evo.clientX,
                        y: evo.clientY
                    };
                    dis = end.y - start.y;
                    if (Math.abs(dis) > 20) {
                        dragger.style[_this.get('transform')] = 'translate3d(0, ' + (ofs.top + dis) + 'px, 0)';
                    }
                };

                var touchEnd = function(ev) {
                    // _this.set('offset', {left: 0, top: ofs.top + dis});
                    if (Math.abs(dis) <= 20) {
                        return;
                    }

                    var current = page.querySelector('.current'),
                        index = +current.getAttribute('data-index'),
                        next = _this.getNext(index, dis > 0 ? 'up' : 'down');
                    Utils.addClass(dragger, 'has-transition');
                    if (next) {
                        if (Math.abs(dis) > 200) {
                            var nextTop = -(next.getAttribute('data-index') * vh);
                            dragger.style[_this.get('transform')] = 'translate3d(0, ' + nextTop + 'px, 0)';
                            Utils.removeClass(current, 'current');
                            Utils.addClass(next, 'current');
                            _this.set('offset', {
                                left: 0,
                                top: nextTop
                            });
                            _this.preload(+next.getAttribute('data-index'));
                            setTimeout(function() {
                                _this.get('transEnd').call(_this);
                            }, 300);
                        } else {
                            dragger.style[_this.get('transform')] = 'translate3d(0, -' + index * vh + 'px, 0)';
                        }
                    } else {
                        dragger.style[_this.get('transform')] = 'translate3d(0, -' + index * vh + 'px, 0)';
                    }

                    setTimeout(function() {
                        Utils.removeClass(dragger, 'has-transition');
                    }, 300);

                    page.removeEventListener('touchmove', touchMove, false);
                    page.removeEventListener('mousemove', touchMove, false);
                    page.removeEventListener('touchend', touchEnd, false);
                    page.removeEventListener('mouseup', touchEnd, false);
                };

                page.addEventListener('touchmove', touchMove, false);
                page.addEventListener('mousemove', touchMove, false);
                page.addEventListener('touchend', touchEnd, false);
                page.addEventListener('mouseup', touchEnd, false);
            };

            page.addEventListener('touchstart', touchStart, false);
            page.addEventListener('mousedown', touchStart, false);
        }
    };

    Mi.Utils = Mi.Utils || Utils;
    Mi.Moonlight = Mi.Moonlight || Moonlight;
})(window);