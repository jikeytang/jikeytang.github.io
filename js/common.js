/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2013-6-17 下午8:06
 * @info:
 */
;(function(win){ // 主开发框架
    win.Jing = win.Jing || {};
    var doc = document,
        isIE6 = !window.XMLHttpRequest;

    // 添加命名空间
    Jing.namespace = function (name, sep) {
        var s = name.split(sep || '.'),
            d = {},
            o = function (a, b, c) {
                if (c < b.length) {
                    if (!a[b[c]]) {
                        a[b[c]] = {};
                    }
                    d = a[b[c]];
                    o(a[b[c]], b, c + 1);
                }
            };

        o(window, s, 0);
        return d;
    };

    // 继承
    Jing.apply = function(obj, config){
        if(obj && config && typeof config == 'object'){
            for( var p in config){
                obj[p] = config[p];
            }
        }
        return obj;
    }

    // core
    Jing.apply(Jing, {
        id : function(){
            return doc.getElementById(arguments[0]);
        },
        viewSize : function(){
            var de = doc.documentElement;

            return {
                width : (window.innerWidth || (de && de.clientWidth) || doc.body.clientWidth),
                height : (window.innerHeight || (de && de.clientHeight) || doc.body.clientHeight)
            };
        }()
    });

    Jing.namespace('Jing.cookie');

    Jing.apply(Jing.cookie, {
        setCookie : function (name, value, days) {
            var exp = new Date();
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString();
        },
        getCookie : function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) {
                return decodeURI(arr[2]);
            }
            return null;
        },
        delCookie : function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = Jing.cookie.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    });

}(window));

// ui
(function(win){
    Jing.namespace('Jing.ui');

    Jing.apply(Jing.ui, {
        init : function(options){
            var that = this,
                config = this.config = {
                    name : 'tang'
                };

            Jing.apply(config, options);

            this.handler = {
                sideBar : Jing.id(config.sideBar),
                iframe : Jing.id(config.iframe)
            }

            that.initMain();
            that.siderHref();
        },
        initMain : function(){
            var that = this,
                config = this.config,
                handler = that.handler
                winWidth = Jing.viewSize.width,
                winHeight = Jing.viewSize.height;

            handler.iframe.style.width = winWidth - 210 + 'px';
            handler.iframe.style.height = handler.sideBar.style.height = winHeight + 'px';
        },
        siderHref : function(){

        }
        
    });

}(window));


