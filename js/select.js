define(['drag'], function(drag){
    $.pop = function(options){
        var conf = this.conf = {
            width : 200,
//            height : 300,
            title : '弹出层',
            mask : 1,
            content : '',
            isDrag : 1,
            container : document.body
        }
        $.extend(conf, options);

        this.handler = {
            container : $(conf.container),
            wrap : null,
            title : null,
            content : null,
            bottom : null,
            z : 2014
        }

        this.init(conf);
    }
    $.pop.prototype = {
        init : function(options){
            var conf = this.conf;
            this.create();
            conf.mask && this.mask();
            this.bindClose();

            conf.callOpen && conf.callOpen.call(this);
            return this;
        },
        create : function(){
            var conf = this.conf,
                handler = this.handler,
                container = handler.container,
                title = this.title(),
                content = this.content(),
                pop = null,
                wrap = null;

            this.z = $.pop.z;
            pop = $('<div class="ui-pop"><div class="ui-pop-title ' + (conf.title == false ? 'none' : '') +'"><h1>' + title + '</h1><a class="ui-close" href="javascript:void(0)">×</a></div><div class="ui-pop-body">'+ content +'</div></div>').appendTo('body');
            pop.css({ width : conf.width, height: conf.height, top : ($(window).height() - pop.height()) / 2, left : ($(window).width() - pop.width()) / 2, zIndex : ++$.pop.z });
            if(conf.isDrag){
                conf.title && drag(pop.find('.ui-pop-title'));
            }
            this.pop = pop;
        },
        mask : function(){
            var m = null,
                conf = this.conf,
                handler = this.handler;

            this.mask = m = $('<div class="ui-mask"></div>').appendTo('body');
            m.css({ width :$(window).width(), height : $(document).height(), zIndex : this.z });
        },
        // 绑定事件
        bindClose : function(){
            var that = this,
                conf = this.conf,
                handler = this.handler,
                mask = this.mask,
                pop = this.pop,
                btn = pop.find('.ui-close');

            btn.on('click', function(){
                that.close();
            });
        },
        close : function(){
            var conf = this.conf,
                mask = this.mask,
                pop = this.pop;

            pop.hide();
            mask.length && mask.hide();

            conf.callClose && conf.callClose.call(this);
        },
        title : function(){
            return this.conf.title || '消息';
        },
        content : function(d){
            return this.conf.content || '内容';
        }
    }
    $.pop.z = 2014;

    return $.pop;
});