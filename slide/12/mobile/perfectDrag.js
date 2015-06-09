function MiaovperfectDragSimple(vElement, fnOnDragStart, fnOnDraging, fnOnDragEnd){
    var oElementDrag = null;

    if(typeof vElement == 'string'){
        oElementDrag = document.getElementById(vElement);
    } else if(typeof vElement == 'object'){
        oElementDrag = vElement;
    }

    this.creator = MiaovPerfectDrag;

    this.creator(oElementDrag, function(){
            return {x : oElementDrag.offsetLeft, y : oElementDrag.offsetTop};
        }, function(x, y){
            oElementDrag.style.left = x + 'px';
            oElementDrag.style.top = y + 'px';

            if(fnOnDraging){
                fnOnDraging(x, y);
            }
        }, fnOnDragStart, fnOnDragEnd);

    delete this.creator;
}

MiaovperfectDragSimple.prototype = MiaovPerfectDrag.prototype;

function MiaovPerfectDrag(oElementDrag, fnGetPos, fnDoMove, fnOnDragStart, fnOnDragEnd){
    var obj = this;

    this.oElement = oElementDrag;

    this.oElement.style.overflow = 'hidden';

    this.fnGetPos = fnGetPos;
    this.fnDoMove = fnDoMove;
    this.fnOnDragStart = fnOnDragStart;
    this.fnOnDragEnd = fnOnDragEnd;

    this.__oStartOffset__ = {x : 0, y : 0};

    this.oElement.onmousedown = function(ev){
        obj.startDrag(window.event || ev);
    };

    this.fnOnMouseUp = function(ev){
        obj.stopDrag(window.event || ev);
    };

    this.fnOnMouseMove = function(ev){
        obj.doDrag(window.event || ev);
    };
}

MiaovPerfectDrag.prototype.enable = function(){
    var obj = this;

    this.oElement.onmousedown = function(ev){
        obj.startDrag(window.event || ev);
    };
};

MiaovPerfectDrag.prototype.disable = function(){
    this.oElement.onmousedown = null;
};

MiaovPerfectDrag.prototype.startDrag = function(oEvent){
    var oPos = this.fnGetPos();

    var x = oEvent.clientX;
    var y = oEvent.clientY;

    if(this.fnOnDragStart){
        this.fnOnDragStart();
    }

    this.__oStartOffset__.x = x - oPos.x;
    this.__oStartOffset__.y = y - oPos.y;

    if(this.oElement.setCapture){
        this.oElement.setCapture();

        this.oElement.onmouseup = this.fnOnMouseUp;
        this.oElement.onmousemove = this.fnOnMouseMove;
    } else {
        document.addEventListener("mouseup", this.fnOnMouseUp, true);
        document.addEventListener("mousemove", this.fnOnMouseMove, true);

        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    }
};

MiaovPerfectDrag.prototype.stopDrag = function(oEvent){
    if(this.oElement.releaseCapture){
        this.oElement.releaseCapture();

        this.oElement.onmouseup = null;
        this.oElement.onmousemove = null;
    } else {
        document.removeEventListener("mouseup", this.fnOnMouseUp, true);
        document.removeEventListener("mousemove", this.fnOnMouseMove, true);

        window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP);
    }

    if(this.fnOnDragEnd){
        if(oEvent.clientX == this.__oStartOffset__.x && oEvent.clientY == this.__oStartOffset__.y){
            this.fnOnDragEnd(false);
        } else {
            this.fnOnDragEnd(true);
        }
    }
};

MiaovPerfectDrag.prototype.doDrag = function(oEvent){
    var x = oEvent.clientX;
    var y = oEvent.clientY;

    this.fnDoMove(x - this.__oStartOffset__.x, y - this.__oStartOffset__.y);
};

