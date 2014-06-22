/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2014-4-16 上午7:55
 * @info:
 */
;(function(win){
    var textcode = document.getElementsByClassName('code');
    for (var i = 0, len = textcode.length; i < len; i++) {
        var text = textcode[i];
        var textVal = textcode[i].value;
        var hl = new DlHighlight({lang : "js", lineNumbers : false });
        var formatted = hl.doItNow(textVal);
        var nextPre = $(text).next()[0];
        text.style.display = 'none';
        nextPre.className = 'jkhightlight';
        nextPre.innerHTML = '<pre>' + formatted + '</pre>';
    }

    var oMain = document.getElementsByClassName('main')[0],
        oSection = document.getElementsByClassName('section')[0],
        oOver = document.getElementsByClassName('overlay')[0];

    oOver.style.height = oMain.style.height = oSection.clientHeight + 'px';
}(window));
