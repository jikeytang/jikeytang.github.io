var o = document.getElementsByClassName("mp-banner-ct");
//var left=document.defaultView.getComputedStyle(o[0],null)["left"];
//var o_left=parseInt(!o[0].style.left?left:o[0].style.left);
//alert(o_left);
//alert(document.defaultView.getComputedStyle(o[3],null)["visibility"]);
function Utils(){
}
Utils.prototype.slide = function(obj, opt, value, duration){
    var begin = parseFloat(document.defaultView.getComputedStyle(obj, null)[opt]);
    var end = parseFloat(value);
    var fps = 108;
    var frames = fps / 1000 * duration;
    var frames_count = 0;
    var frames_value = (end - begin) / frames;
    var now_value = begin;
    var real_duration = 1000 / fps;
    setTimeout(function(){
        now_value = now_value + frames_value;
        //alert(now_value);
        o[0].style.cssText = opt + ":" + now_value + "px;";
        frames_count++;
        var that = arguments.callee;
        if(frames_count <= frames){
            setTimeout(function(){
                that();
            }, real_duration);
        } else {
            //alert(frames_count);
            //alert(now_value);
        }
    }, real_duration);
}

var utils = new Utils();
var turnleft = false;

setTimeout(function(){
    if(turnleft){
        utils.slide(o[0], "left", 0, 500);
    } else {
        utils.slide(o[0], "left", -745, 500);
    }
    turnleft = !turnleft;
    var that = arguments.callee;
    setTimeout(function(){
        that();
    }, 4000);
}, 4000);

//hover
var prev = document.getElementById("mp-banner-pager-prev");
var next = document.getElementById("mp-banner-pager-next");
var inner = document.getElementById("j-banner");
//alert(document.defaultView.getComputedStyle(prev,null)["display"]);
inner.onmouseover = function(){
    prev.style.display = "block";
    next.style.display = "block";
}
inner.onmouseleave = function(){
    prev.style.display = "none";
    next.style.display = "none";
}
next.onclick = function(){
    if(turnleft == true){
        return
    } else {
        turnleft = !turnleft;
        utils.slide(o[0], "left", -745, 500);
    }
}
prev.onclick = function(){
    if(turnleft == false){
        return
    } else {
        turnleft = !turnleft;
        utils.slide(o[0], "left", 0, 500);
    }
}