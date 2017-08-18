var util;
var log=console.log.bind(console);
util = {
    ajax: function (options) {
        options=options||{};
        if(!options.url){return;}
        options.type=options.type.toUpperCase()||'GET';
        options.dataType=options.dataType||'json';
        options.async=!(options.async===false||options.async==="false");
        if(options.data&&typeof options.data==='object'){
            var str='';
            for (var key in options.data) {
                str += key + '=' + options.data[key] + '&';
            }
            options.data = str.replace(/&$/, '');
        }else{
            options.data="";
        }
        //定义需要用到的变量
        var url=options.url;
        var data=options.data;

        if(options.type==="JSONP"){
            var cb=options.callback||"callback";
            //设置一个时间，超时后提示，默认为30秒
            var timeout=options.timeout||30000;
            var oHead=document.querySelector("head");
            var oscript=document.createElement("script");
            var cbName=("cb"+Math.random()).replace(".","");
            oscript.src=url+"&"+cb+"="+cbName;
            // 将script插入到head中
            oHead.appendChild(oscript);
            //设置一个定时器
            var timer=setTimeout(function(){
                //当响应时间过后，后续函数不执行
                window[cbName]=null;
                // 并提示网络信息
                if(options.failed){
                    options.failed();
                }else{
                    alert("亲，网络不给力！请刷新或者稍后再试");
                }
            },timeout);
            window[cbName]=function(result){
                //关闭定时器
                clearTimeout(timer);
                //移除script标签
                oHead.removeChild(oscript);
                //执行成功的函数
                options.success&&options.success(result);
            }


        }else{
            //用于清除缓存
            var random = Math.random();
            //创建xhr对象
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            if(options.type==="GET"){
                xhr.open('GET',url+'?'+data+'&t='+random,options.async);
                xhr.send();
            }else if(type==="POST"){
                xhr.open('POST',url,options.async);
                //如果需要像html表单那样POST数据，请使用setRequestHeader()来添加HTTP头
                xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                xhr.send(data);
            }
            // 处理返回的数据
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4){
                    if(xhr.status===200){
                        var text=options.dataType==='json'?JSON.parse(xhr.responseText):xhr.responseText;
                        options.success&&options.success(text);
                    }else{
                        options.failed&&options.failed(xhr.status);
                    }
                }
            }
        }

    }
};

// pollyfill
// String.includes
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
// 微信判断
function isWeixinBrowser(){
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}