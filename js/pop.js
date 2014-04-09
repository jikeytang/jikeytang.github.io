;(function(win){ // 弹出层
    Jing.namespace('Jing.pop');

    Jing.apply(Jing.pop, {
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