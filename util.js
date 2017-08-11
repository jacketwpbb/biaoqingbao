var util;
util = {
    ajax: function (options) {
        options=options||{};
        options.type=options.type.toUpperCase()||'GET';
        options.dataType=options.dataType||'json';
        options.async=options.async||true;
        if(options.data&&typeof options.data==='object'){
            var str='';
            for (var key in options.data) {
                str += key + '=' + options.data[key] + '&';
            }
            options.data = str.replace(/&$/, '');
        }else{
            options.data=undefined;
        }
        //创建ajax对象
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        //用于清除缓存
        var random = Math.random();

        if(options.type==="GET"){
            if(options.data){
                xhr.open('GET',options.url+'?'+options.data,options.async);
            }else{
                xhr.open('GET',options.url+'?t='+random,options.async);
            }
            xhr.send();
        }else if(type==="POST"){
            xhr.open('POST',options.url,options.async);
            //如果需要像html表单那样POST数据，请使用setRequestHeader()来添加HTTP头
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.send(options.data);
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
};