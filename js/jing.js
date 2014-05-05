/**
 * @author: 豪情
 * @see: <a href="mailto:jikeytang@gmail.com">豪情</a>
 * @time: 2014-4-19 下午5:45
 * @info:
 */
;(function(win, undefined){
    var document = win.document,
        loc = win.location,
        docEle = document.documentElement,
        arr = [],
        slice = arr.slice,
        concat = arr.concat,
        push = arr.push,
        indexOf = arr.indexOf,// js 1.6新增加的方法
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
                return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
            }
        };

    win.$ = win.Jing = $ = function(selector, context){
        return new $.fn.init(selector, context);
    }
    
    $.fn = $.prototype = {
        jing : '1.0',
        constructor : $,
        sort : arr.sort,
        push : push,
        splice : arr.splice,
        context : null,
        init : function(selector, context){
            var obj = null,
                context = context || document,
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
            this.context = document;

            return this.setArray(this.makeArray(obj));
        },
        toArray : function(){
            return slice.call(this);
        },
        /**
         * 如果num为负则返回this.length+num值；如果num为空，直接返回一个数组元素
         * @param num
         */
        get : function(num){
            return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
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
            if(document.getElementsByClassName){
                return document.getElementsByClassName(name);
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
        },
        /**
         * 确定elem在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
         * @param elem
         * @param arr
         * @param i 开始位置
         */
        inArray : function(elem, arr, i){
            var len;

            if(arr){
                if(indexOf){
                    return indexOf.call(elem, arr, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for( ; i < len; i++){
                    if(i in arr && arr[i] == elem){
                        return i;
                    }
                }
            }

            return -1;
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
                    if(options[name] != undefined){
                        target[name] = options[name];
                    }
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
    $.fn.extend({
        append : function(){
            return this.domMainp(arguments, function(elem){
                if(this.nodeType == 1 || this.nodeType == 11 || this.nodeType == 9){
                    this.appendChild(elem);
                }
            });
        },
        prepend : function(){
            return this.domMainp(arguments, function(elem){
                if(this.nodeType == 1 || this.nodeType == 11 || this.nodeType == 9){
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before : function(){
            return this.domMainp(arguments, function(elem){
                if(this.parentNode){
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after : function(){
            return this.domMainp(arguments, function(elem){
                if(this.parentNode){
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        /**
         * dom处理，将args转换为dom元素，并放在一个文档碎片中，
         * 执行callback，实现真正的回调插入操作
         * @param args
         * @param callback
         */
        domMainp : function(args, callback){
            args = concat.apply([], args);

            var i = 0,
                l = this.length,
                fragment,
                node;

            if(l){
//                fragment = this.buildFragment(args, this[0].ownerDocument, false, this);
                var div = document.createElement('div');
                div.innerHTML = args;
                node = div.childNodes[0];
                div = null;

                for( ; i < l; i++){
                    callback.call(this[i], node, i);
                }
            }

            return this;
        },
        buildFragment : function(elems, context, scripts, selection){

        },
        cleanData : function(elems, acceptData){

        }
    });

    // 'Boolean Number String Function Array Date RegExp Object Error'.split(' ')
    $.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name){
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });


    // className 相关操作
    var rnotwhite = (/\S+/g);
    $.fn.extend({
        addClass : function(value){
            var i = 0,
                j = 0,
                cur = '',
                elem = null,
                classes = [],
                clazz = '',
                len = this.length,
                proceed = typeof value === 'string' && value;

            if(proceed){
                classes = value.match(rnotwhite);
                for( ; i < len; i++){
                    elem = this[i];

                    cur = elem.nodeType === 1 && elem.className ? ' ' + elem.className + ' ' : '';
                    if(cur){

                    }
                }
            }
        }
    });

}(window));

// 2014-04-21 : 准备开发第一版
// 2014-04-30 : 完成$.type, $.each等方法
// 2014-05-04 : 增加$.get方法
// 2014-05-05 : 以精减的方式添加：append,prepend,before,after方法，但存在tbody问题未处理；添加addClass