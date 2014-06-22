/**
 * @author: zyh
 * @see: <a href="mailto:jikeytang@gmail.com">zyh</a>
 * @time: 2013-6-20 下午10:53
 * @info:
 */
require.config({
    baseUrl : 'js/libs',
    paths : {
        jquery : 'jquery-1.8.3.min',
        common : '../common',
        home : '../home'
    }
});

require(['jquery', 'common', 'home'], function($){

});
