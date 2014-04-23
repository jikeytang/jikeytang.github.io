/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2014-4-16 上午7:55
 * @info:
 */
;(function(win){
    var textcode = Jing.getElementsByClassName('code');
    for (var i = 0, len = textcode.length; i < len; i++) {
        var text = textcode[i];
        var textVal = textcode[i].value;
        var hl = new DlHighlight({lang : "js", lineNumbers : false });
        var formatted = hl.doItNow(textVal);
        var nextPre = Jing.next(text);
        text.style.display = 'none';
        nextPre.className = 'jkhightlight';
        nextPre.innerHTML = '<pre>' + formatted + '</pre>';
    }

    var oMain = Jing.getElementsByClassName('main')[0],
        oSection = Jing.getElementsByClassName('section')[0],
        oOver = Jing.getElementsByClassName('overlay')[0];

    oOver.style.height = oMain.style.height = oSection.clientHeight + 'px';
}(window));
