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
            this.close();
        },
        create : function(){
            var defaults = this.defaults,
                handler = this.handler,
                container = handler.container,
                pop = null,
                wrap = null;

            pop = $('<div class="ui-pop"><h1 class="ui-win-title">消息<a class="ui-closeWin" href="javascript:void(0)">关闭</a></h1><p>春来江水鸭先知1</p></div>').appendTo('body');
            pop.css({ top : ($(window).height() - pop.height()) / 2, left : ($(window).width() - pop.width()) / 2 });

            this.pop = pop;
        },
        center : function(){
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
            m.css({ width :$(window).width(), height : $(document).height() });
        },
        // 绑定事件
        close : function(){
            var defaults = this.defaults,
                handler = this.handler,
                pop = this.pop;

        }
    }
}(window, Jing));