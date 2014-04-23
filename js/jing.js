/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2014-4-19 下午5:45
 * @info:
 */
;(function(win, undefined){
    var doc = document,
        isIE6 = !XMLHttpRequest;

    win.$ = win.Jing = $ = function(selector, context){
        return new $.fn.init(selector, context);
    }
    
    $.fn = $.prototype = {
        version : 1,
        constructor : $,
        splice : [].splice,
        init : function(selector, context){
            var obj = null,
                context = context || doc,
                select = '';

            // $(''), $(null), $(undefined), $(false)
            if(!selector){
                return this;
            }

            // HTML strings
            if(typeof selector === 'string'){
                if(selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3){
                    return this.setArray([context.createElement(selector.slice(1, -2))]);
                }
            } else if(selector.nodeType || selector == win){ // $(window,document,document.body,tag)
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            }

            selector = selector.toString();
            // $("#id")
            if(selector.indexOf('#') == 0){
                obj = context.getElementById(selector.slice(1));
            } else if(selector.indexOf('.') == 0){ // $(".className")
                obj = this.getElementsByClassName(context, selector.slice(1));
            } else { // $("tagName")
                obj = context.getElementsByTagName(selector);
            }

            return this.setArray(this.makeArray(obj));
        },
        setArray : function(obj){
            this.length = 0;
            Array.prototype.push.apply(this, obj);
            return this;
        },
        // 把传入参数变成数组
        makeArray : function(arr) {
            var ret = [];
            if( arr != null ){
                var i = arr.length;
                // 单个元素，但window, string、 function有 'length'的属性，加其它的判断
                if (i == null || arr.split || arr.setInterval || arr.call) {
                    ret[0] = arr;
                } else {
                    try {
                        ret = Array.prototype.slice.call(arr);
                    } catch (e) {
                        while (i) ret[--i] = arr[i]; // Clone数组
                    }
                }
            }
            return ret;
        },
        getElementsByClassName : function(context, name){
            if(!doc.getElementsByClassName){
                return doc.getElementsByClassName(name);
            } else {
                var regex = new RegExp('(^|\\s)' + name + '(\\s|$)'),
                    len = context.all.length,
                    child = null,
                    res = [],
                    i = 0;

                for(i = 0; i < len; i++){
                    child = context.all[i];
                    if(regex.test(child.className)){
                        res.push(child);
                    }
                }
                return res;
            }
        }
    }

    $.fn.init.prototype = $.fn;

    $.extend = $.fn.extend = function(){
        var target = arguments[0] || {},
            length = arguments.length,
            options,
            name,
            i = 1;

        if(length == i){
            target = this;
            --i;
        }
        for( ; i < length; i++){
            if((options = arguments[i]) != null){
                for(name in options){
                    target[name] = options[name];
                }
            }
        }

        return target;
    }

    var toString = Object.prototype.toString;
    $.extend({
        isFunction : function(obj){
            return toString.call(obj) === '[object Function]';
        },
        isArray : function(obj){
            return toString.call(obj) === '[object Array]';
        },
        trim : function(text){
            return text.replace(/^\s+|\s+$/g, '');
        }
    });



}(window));
