/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2014-4-19 下午5:45
 * @info:
 */
;(function(win, undefined){
    var doc = win.document,
        loc = win.location,
        docEle = doc.documentElement,
        arr = [],
        slice = arr.slice,
        concat = arr.concat,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        isIE6 = !win.XMLHttpRequest && !win.opera,
        _ = { // 所有私有方法集合
            isArraylike : function(obj){
                var length = obj.length,
                    type = $.type(obj);

                if(type == 'function' && $.isWindow(obj)){
                    return false;
                }

                if(obj.nodeType === 1 && length){
                    return true;
                }
                // http://bbs.csdn.net/topics/390413500
                // 若type==='array'直接返回true
                // 若type!=='array'的话，如果type!=='function'为true的话开始判断括号里的内容，否则整体返回false
                // 括号里的内容如果length===0为true若括号里整体为true，整体返回true
                // 若length===0为false，判断typeof length==='number'，如果为flase，整体返回false
                // 如果typeof length==='number'，如果为true,判断length>0，如果为false，整体返回false
                // 如果length>0为true，判断( length - 1 ) in obj，这话的意思就是如果是类数组的对象，
                // 其结构肯定是{0:'aaa',1:'bbb',length:2}这样的key值为数字的，所以如果是类数组对象，判断在obj里是否能找到length-1这样的key，如果找到，整体返回true，否则整体返回false
                // in就是判断一个key是否在一个obj里。比如var obj = {a:'111'}，'a' in obj为true，'b' in obj为false
                return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
            }
        };

    win.$ = win.Jing = $ = function(selector, context){
        return new $.fn.init(selector, context);
    }
    
    $.fn = $.prototype = {
        version : 1,
        constructor : $,
        splice : arr.splice,
        context : null,
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
                    // 不能处理多标签的情况，如<p><span></span></p>
//                    return this.setArray([context.createElement(selector.slice(1, -2))]);
                    var div = document.createElement('div');
                    div.innerHTML = selector;
                    return this.setArray(this.makeArray(div.childNodes));
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
            this.context = doc;

            return this.setArray(this.makeArray(obj));
        },
        toArray : function(){
            return slice.call(this);
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
        },

        each : function(callback){
            return $.each(this, callback);
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


    // 常用工具方法
    $.extend({
        // 空函数快捷方式
        noop : function(){},
        isFunction : function(obj){
            return $.type(obj) === 'function';
        },
        isArray : Array.isArray || function(obj){
            return $.type(obj) === 'array';
        },
        // 是否为窗口
        isWindow : function(obj){
            return obj != null && obj == obj.window;
        },
        trim : function(text){
            return text.replace(/^\s+|\s+$/g, '');
        },
        type : function(obj){
            return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
        },
        each : function(obj, callback){
            var value,
                i = 0,
                length = obj.length,
                isArray = _.isArraylike(obj);

            if(isArray){ // 如果是数组
                for( ; i < length; i++){
                    value = callback.call(obj[i], i, obj[i]);
                    if(value === false){
                        break;
                    }
                }
            } else { // 如果不是数组
                for(i in obj){
                    value = callback.call(obj[i], i, obj[i]);
                    if(value === false){
                        break;
                    }
                }
            }

            return obj;
        },
        /**
         * 合并两个参数
         * @param first
         * @param end
         */
        merge : function(first, second){
            var len = second.length,
                i = first.length,
                j = 0;

            while(j < len){
                first[i++] = second[j++];
            }
            first.length = i;
            return first;
        },
        map : function(elems, callback, arg){
            var i = 0,
                value,
                ret = [],
                length = elems.length,
                isArray = _.isArraylike(elems);

            if(isArray){
                for( ; i < length; i++){
                    value = callback(elems[i], i, arg);
                    if(value != null){
                        ret.push(value);
                    }
                }
            } else {
                for(i in elems){
                    value = callback(elems[i], i, arg);
                    if(value != null){
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        }
    });

    // DOM常规操作
    $.extend({
        append : function(){
            return true;
        }
    });

    // 'Boolean Number String Function Array Date RegExp Object Error'.split(' ')
    $.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name){
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });

}(window));

// 2014-04-21 : 准备开发第一版
// 2014-04-30 : 完成$.type, $.each等方法
