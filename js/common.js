/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2013-6-17 下午8:06
 * @info:
 */
;(function(win){ // 主开发框架
    var doc = document,
        isIE6 = !window.XMLHttpRequest;

    var $ = function(selector, context){
        return new $.fn.init(selector, context);
    }

    $.fn = $.prototype = {
        splice : [].splice,
        init : function(selector, context){
            if(selector.indexOf('#') === 0){
                this.length = 0;
                return this.setArray(this.makeArray(document.getElementById(selector.slice(1))));
            }
        },
        setArray : function(obj){
            Array.prototype.push.apply(this, obj);
            return this;
        },
        makeArray : function(obj){
            var ret = [];
            if(obj != null){
                ret[0] = obj;
            }
            return ret;
        },
        viewSize : function(){
            var de = doc.documentElement;

            return {
                width : (window.innerWidth || (de && de.clientWidth) || doc.body.clientWidth),
                height : (window.innerHeight || (de && de.clientHeight) || doc.body.clientHeight)
            };
        }(),
        /**
         * 根据 name 得到元素　// 这儿有更好的实现： http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1529640.html
         * @param name
         * @param ele
         */
        getElementsByClassName: function(name, ele){
            if(document.getElementsByClassName){ // 如果游览器支持，则直接返回
                return document.getElementsByClassName(name);
            } else {
                ele = ele || document;
                var res = [],
                    child = null,
                    regex = new RegExp("(^|\\s)" + name + "(\\s|$)");

                for(var i=0,len=ele.all.length; i<len; i++){
                    child = ele.all[i];
                    if(regex.test(child.className)){
                        res.push(child);
                    }
                }
                return res;
            }
        },
        html : function(target, config){
            if(config == undefined){
                config = target;
                target = 'div';
            }
            var tag = document.createElement(target),
                p;

            for(p in config){
                switch(p){
                    case 'style' :
                        tag.style.cssText = config[p];
                        break;
                    case 'class' :
                    case 'cls' :
                        tag.className = config[p];
                        break;
                }
            }

            return tag;
        },
        // 得到下一个元素
        next: function(obj){
            do{
                obj = obj.nextSibling;
            } while(obj && obj.nodeType != 1);
            return obj;
        },
        css : function(prop){
            var obj = this[0];
            if(typeof prop == 'string'){
                if(obj.style.length > 0 && obj.hasOwnProperty(prop)){
                    return obj.style[prop];
                } else {
                    if(obj.currentStyle){
                        return obj.currentStyle[prop];
                    } else if(window.getComputedStyle) {
                        return document.defaultView.getComputedStyle(obj, null)[prop];
                    }
                }
            } else if(typeof prop == 'object'){
                for(var p in prop){
                    obj.style[p] = prop[p];
                }
            }
        }
    }

    $.fn.init.prototype = $.fn;

    // 添加命名空间
    $.namespace = function (name, sep) {
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
    $.apply = function(obj, config){
        if(obj && config && typeof config == 'object'){
            for( var p in config){
                obj[p] = config[p];
            }
        }
        return obj;
    }

    // core
    $.apply($, {
        id : function(){
            return doc.getElementById(arguments[0]);
        },
        viewSize : function(){
            var de = doc.documentElement;

            return {
                width : (window.innerWidth || (de && de.clientWidth) || doc.body.clientWidth),
                height : (window.innerHeight || (de && de.clientHeight) || doc.body.clientHeight)
            };
        }(),
        /**
         * 根据 name 得到元素　// 这儿有更好的实现： http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1529640.html
         * @param name
         * @param ele
         */
        getElementsByClassName: function(name, ele){
            if(document.getElementsByClassName){ // 如果游览器支持，则直接返回
                return document.getElementsByClassName(name);
            } else {
                ele = ele || document;
                var res = [],
                    child = null,
                    regex = new RegExp("(^|\\s)" + name + "(\\s|$)");

                for(var i=0,len=ele.all.length; i<len; i++){
                    child = ele.all[i];
                    if(regex.test(child.className)){
                        res.push(child);
                    }
                }
                return res;
            }
        },
        html : function(target, config){
            if(config == undefined){
                config = target;
                target = 'div';
            }
            var tag = document.createElement(target),
                p;

            for(p in config){
                switch(p){
                    case 'style' :
                        tag.style.cssText = config[p];
                        break;
                    case 'class' :
                    case 'cls' :
                        tag.className = config[p];
                        break;
                }
            }

            return tag;
        },
        // 得到下一个元素
        next: function(obj){
            do{
                obj = obj.nextSibling;
            } while(obj && obj.nodeType != 1);
            return obj;
        },
        css : function(obj, prop){
            if(typeof prop == 'string'){
                if(obj.style.length > 0 && obj.hasOwnProperty(prop)){
                    return obj.style[prop];
                } else {
                    if(obj.currentStyle){
                        return obj.currentStyle[prop];
                    } else if(window.getComputedStyle) {
                        return document.defaultView.getComputedStyle(obj, null)[prop];
                    }
                }
            } else if(typeof prop == 'object'){
                for(var p in prop){
                    obj.style[p] = prop[p];
                }
            }
        }
    });

    $.namespace('$.cookie');

    $.apply($.cookie, {
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
            var cval = $.cookie.getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    });

    win.Jing = $;
}(window));

// ui
(function(win, $){
    $.namespace('$.ui');

    $.apply($.ui, {
        init : function(options){
            var that = this,
                config = this.config = {
                    name : 'tang'
                };

            $.apply(config, options);

            this.handler = {
                sideBar : $.id(config.sideBar),
                iframe : $.id(config.iframe)
            }

            that.initMain();
            that.siderHref();
        },
        initMain : function(){
            var that = this,
                config = this.config,
                handler = that.handler,
                winWidth = $.viewSize.width,
                winHeight = $.viewSize.height;

            handler.iframe.style.width = winWidth - 190 + 'px';
            handler.iframe.style.height = handler.sideBar.style.height = winHeight - 5 + 'px';
        },
        siderHref : function(){

        }
        
    });

}(window, Jing));


