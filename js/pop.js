(function(win,$){
    $.pop = function(options){
        var defaults = this.defaults = {
            width : 200,
            height : 300,
            container : document.body
        }
        $.extend(defaults, options);

        this.handler = {
            container : $(defaults.container),
            wrap : null,
            title : null,
            content : null,
            bottom : null
        }

        this.init(defaults);
    }
    $.pop.prototype = {
        init : function(options){
            this.create();
            this.mask();
        },
        create : function(){
            var defaults = this.defaults,
                handler = this.handler,
                container = handler.container,
                pop = null,
                wrap = null;

            pop = $('<div class="ui-pop"><h1 class="ui-win-title">消息<a class="ui-closeWin" href="javascript:void(0)">关闭</a></h1><p>春来江水鸭先知1</p></div>').appendTo('body');
            console.log(pop);
            /*
            wrap = handler.wrap = $.html('section', { class : 'pop-wrap' });
            handler.title = $.html({ class : 'pop-title'});
            handler.title.innerHTML = '我是一个兵';
            handler.content = $.html({ class : 'pop-body' });
            wrap.appendChild(handler.title);
            wrap.appendChild(handler.content);
            container.appendChild(handler.wrap);
            */

            this.position();
        },
        position : function(){
            var defaults = this.defaults,
                handler = this.handler;

//            $.css(handler.wrap, { position : 'absolute',width: '100px'});
//            console.log($.css(handler.wrap, 'width'));
        },
        mask : function(){
            var m = null,
                defaults = this.defaults,
                handler = this.handler;

            m = $('<div class="ui-mask"></div>').appendTo('body');
            console.log('m', $(window).width());
            console.log('m', $(document).height());
            m.css({ width :100, height : $(document).height() });
        }
    }
}(window, Jing));