/**
 * @author: 豪情
 * @see: <a href="mailto:jikeytang@gmail.com">豪情</a>
 * @time: 6/21/14
 * @info:
 */
define(function(){
    var drag = function(obj, options){
        var defaults = {
            },
            that    = obj,
            opts    = $.extend({}, defaults, options),
            doc     = $(document),
            width   = $(window).width(),
            height  = $(window).height(),
            startX  = 0,
            startY  = 0,
            lastX   = 0,
            lastY   = 0,
            box     = that.parent(), // handler.parentNode
            handler = that[0],
            drag    = {
                down: function(e){
                    that.css('cursor', 'move');
                    startX            = e.clientX - parseInt(box.css('left'));
                    startY            = e.clientY - parseInt(box.css('top'));
                    this.setCapture && this.setCapture(); // IE to prevent fast drag losing of object
                    doc.on('mousemove', drag.move);
                    doc.on('mouseup', drag.up);
                    return false; // chrome to prevent rolling screen, and the loss of the mouse move style
                },
                move: function(e){
                    lastX             = e.clientX - startX;
                    lastY             = e.clientY - startY;
                    lastX             = Math.max(0, Math.min(width - box.outerWidth(), lastX));
                    lastY             = Math.max(0, Math.min(height - box.outerHeight() - 1, lastY));
                    box.css({'top': lastY + 'px', 'left': lastX + 'px'});
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // cancel the selected text
                    e.stopPropagation();
                },
                up: function(){
                    // that.css('cursor', 'auto');
                    doc.off('mousemove', drag.move);
                    doc.off('mouseup', drag.up);
                    handler.releaseCapture && handler.releaseCapture(); // IE to prevent fast drag losing of object
                }
            };
        that.on('mousedown', drag.down);
    }
    return drag;
});
