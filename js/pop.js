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
        },
        create : function(){
            var defaults = this.defaults,
                handler = this.handler,
                container = handler.container,
                wrap = null;

            $('body').append('<div class="pop" />');
            var pop = $('.pop');
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
        }
    }
}(window, Jing));