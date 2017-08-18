window.onload=function () {
        var shareImg= document.getElementById("shareImg");
        if(/selectChampion/.test(document.referrer)){
            document.getElementById("backToIndex").style.display="none";
        }else{
            document.getElementById("backToPrevious").style.display="none";
        }
        document.getElementById("shareBtn").addEventListener("click",function(){
           if(isWeixinBrowser()){
               shareImg.style.display="block";
           }else{
               alert("直接分享链接或二维码即可");
           }
        });
        if(isWeixinBrowser()){
            isWeixinBrowser()&& shareImg.addEventListener("click",function(){
                shareImg.style.display="none";
            }) ;
        }




        var globalDic={
            //255为未定位
            tier:["最强王者","钻石大神","铂金大神","黄金大神","白银大神","至尊青铜","超凡大师"],
            //大区分布 通过LOLGameAreaJS引入 window["PLS"]["LOLGameArea"][areaId].name可获得大区中文名
        };
        var championLines;
        var commonLines;
        // 文字的随机的颜色
        var randomColor=["#332532","#542164","#a3af00","#0060f6","#bd5f24","#193441"];
        // 强调文字的随机颜色
        var strongColor=["#00885d","#B9121B","#a91afd"];
        // 判断是否为最后一个并且宽度小于50%
        var count=0;
        var outerWitdh,textArray;
        var funcName;
        // 获取需要查询的召唤师名字和英雄ID
        var urlSearch=window.location.search||"?";
        var urlSearchArr=urlSearch.replace(/^\?/,"").split("&");
        var urlSearchObj={};
        for(var i=0;i<urlSearchArr.length;i++){
            var arr=urlSearchArr[i].split("=");
            urlSearchObj[arr[0]]=arr[1];
        }
        //定义需要加载的文本
        var textToAdd={
            summonerName:"训练营大神",
            championId:2,
            area:"峡谷之巅",
            tier:"巅峰王者",
            text:[]
        };
        //获取英雄台词
        util.ajax({
            url:"//res.tuwan.com/templet/weixin/lolhero/js/championLines.json",
            type:"GET",
            success:function(response){
                championLines=response.data;
                commonLines=response.common;
                cb();
                document.title="开黑吗？我的"+championLines[urlSearchObj.championid].title+"贼6！    LOL专属表情包一键制作";
            }
        });
        function cb(){
            util.ajax({
                type:"jsonp",
                url:"//app.tuwan.com/lolapi/api/getPlayerHeroInfo.ashx"+urlSearch,
                success:function(data){
                    if(!data){
                        alert("您输入的召唤师名称或大区有误");
                       window.location.href="//wx.tuwan.com/events/lolhero";
                        return;}
                    textToAdd.summonerName=data.Name;
                    textToAdd.championId=urlSearchObj.championid;
                    textToAdd.area=window["PLS"]["LOLGameArea"][data.AreaId].name;
                    textToAdd.tier=data.Tier===255?"匹配帝王":globalDic.tier[data.Tier];
                    var HeroComments=data.HeroComments;
                    // diff高的值排在前面
                    HeroComments.sort(function(a,b){
                        return b.diff-a.diff;
                    });

                    var text=[];
                    for(var i=0;i<HeroComments.length;i++){
                        text[i]={};
                        text[i]["value"]=HeroComments[i]["user_avg"];
                        text[i]["key"]=HeroComments[i]["key"];
                    }
                    textToAdd.text=convertToText(text);
                    //grid为容器ID，text为每一行p标签的类
                    addRankInfo(textToAdd);
                    addContent(textToAdd,3);
                }
            });
        }





         // 位置重排
        function refresh(id,className){
            funcName&&window.removeEventListener("resize",funcName);
            var elem = document.getElementById(id);
            textArray=[];
            var texts=elem.getElementsByClassName(className);
            outerWitdh=elem.offsetWidth;
            var randomColorCopy=randomColor.slice(0);
            var strongColorCopy=strongColor.slice(0);
            for(var i=0;i<texts.length;i++){
                var t=texts[i];
                textArray.push(t);
                var colorIndex=Math.floor(Math.random()*randomColorCopy.length);
                var strongColorIndex=Math.floor(Math.random()*strongColorCopy.length);
                t.color=randomColorCopy[colorIndex];

                randomColorCopy.splice(colorIndex,1);
                t.strongColor=strongColorCopy[strongColorIndex];
                strongColorCopy.splice(strongColorIndex,1);
                randomColorCopy=randomColorCopy.length?randomColorCopy:randomColor.slice(0);
                strongColorCopy=strongColorCopy.length?strongColorCopy:strongColor.slice(0);
            }

            resz(elem,texts,textArray);
            funcName=function(){
                resz(elem,texts,textArray)
            };
            window.addEventListener("resize",funcName);
        }
        // 缩放窗口时重新定位
        function resz(container,texts,textArray){
            outerWitdh=container.offsetWidth;
            count=0;
            for(var i=0;i<texts.length;i++){
                var tEle=textArray[i];
                tEle.style.cssText="";
                tEle.style.color=tEle.color;
                if(tEle.getElementsByTagName("strong")[0]){
                    tEle.getElementsByTagName("strong")[0].style.color=tEle.strongColor;
                }
            }
            for(var i=0;i<texts.length;i++){
                if(textArray[i].offsetWidth>outerWitdh*.5&&textArray[i].offsetWidth<outerWitdh*.7){
                    textArray[i].style.width="100%";
                    textArray[i].style.fontSize="0.22rem";
                }else if(textArray[i].offsetWidth<=outerWitdh*.5){
                    textArray[i].style.width="50%";
                    count++;
                    if((!textArray[i+1]&&count%2===1)||(textArray[i+1]&&count%2===1&&textArray[i+1].offsetWidth>=outerWitdh*.5)){
                        textArray[i].style.width="100%";
                        textArray[i].style.fontSize="0.22rem";
                        count=0;
                    }
                }else if(textArray[i].offsetWidth>outerWitdh*.7&&textArray[i].offsetWidth<outerWitdh*.9){
                    textArray[i].style.width="100%";
                    textArray[i].style.fontSize="0.22rem";
                }else{
                    textArray[i].style.width="100%";
                }
            }

        }
        // 数组随机打乱顺序 
        function randomArray(array) {
            var randomIndex;
            if(!Array.isArray(array)||array.length===0){
                return [];
            }
            var newArr=[];
            do{
                randomIndex=Math.floor(Math.random()*array.length);
                newArr.push(array[randomIndex]);
                array.splice(randomIndex,1);
            }
            while(array.length>0)
            return newArr;
        }
        // 添加文本数据
        function addContent(textToAdd,count,id,className){
            id=id||"grid";
            count=count&&count<textToAdd.text.length?count:textToAdd.text.length;
            className=className||"text";
            var textBox=document.getElementById(id);
            var championText=championLines[textToAdd.championId].lines;
            var championName=championLines[textToAdd.championId].title;
            // var championTextArr=[];
            var dataTextArr=[];
            var tempArr=[];
            var finalHtmlText;

            for(var j=0;j<count;j++){
                var dataText=textToAdd.text[j];
                tempArr.push(dataText);
            }

            var randomArr=randomArray(tempArr);
            var finalT=randomArr.splice(-1,1);

            dataTextArr.push(randomArr);
            for(var i=0;i<championText.length;i++){
                dataTextArr.push( '<p class="'+className+'">'+championText[i]+'</p>>');
            }
            dataTextArr.push('<p class="'+className+'"><strong>'+textToAdd.area+'</strong>'+'第一'+'<strong>'+championName+'</strong></p>');
            dataTextArr.push('<p class="'+className+'"><strong>'+textToAdd.tier+'</strong>'+'带你装逼带你飞</p>');
            dataTextArr=randomArray(dataTextArr);
            dataTextArr.push(finalT);
            finalHtmlText=dataTextArr.join("");
            textBox.innerHTML=finalHtmlText;
            refresh(id,className);
            var domToCvs=document.querySelector(".container");
            var width=domToCvs.offsetWidth;
            var height=domToCvs.offsetHeight;
            var scaleBy = window.devicePixelRatio||2;
            var canvas = document.createElement('canvas');
            canvas.width = width * scaleBy;
            canvas.height = height * scaleBy;
            canvas.style.width = width * scaleBy + 'px';
            canvas.style.height = height * scaleBy + 'px';
            var context = canvas.getContext('2d');
            context.scale(scaleBy, scaleBy);
            var img=new Image();
            img.onload=function(){
                html2canvas(domToCvs, {
                    canvas:canvas,
                    onrendered: function(canvas) {
                        var cvs=document.querySelector(".canvas");
                        var img=document.createElement("img");
                        img.src=canvas.toDataURL("image/jpeg",0.3);
                        cvs.appendChild(img);
                        if(cvs.innerHTML){
                            domToCvs.style.display="none";
                        }else{
                            document.querySelector(".loading").style.display="none";
                        }
                    },
                    background:"#fff",
                    useCORS:true
                });
                this.onload=null;
                document.querySelector(".loading").style.display="none";
            }

            img.src="//ossweb-img.qq.com/images/lol/img/champion/"+championLines[textToAdd.championId].key+".png";
        }
        //更新召唤师名字和英雄头像、时间
        function addRankInfo(textToAdd,userNameId,championSrcClass,dateId){
            if(!textToAdd){return;}
            userNameId=userNameId||"userName";
            championSrcClass=championSrcClass||"championSrc";
            dateId=dateId||"date";
            document.getElementById(userNameId).innerText=textToAdd.summonerName;
            var imgs=document.getElementsByClassName(championSrcClass);
            var length=imgs.length;
            for(var i=0;i<length;i++){
                imgs[i].src="//ossweb-img.qq.com/images/lol/img/champion/"+championLines[textToAdd.championId].key+".png";
            }
            var date1=new Date();
            var date=new Date(date1.getTime()-3600000);
            var hourStr=date.getHours()<10?"0"+date.getHours():date.getHours();
            var minutueStr=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
            var dateStr=(date.getMonth()+1)+"-"+date.getDate()+" "+hourStr+":"+minutueStr;
            document.getElementById(dateId).innerText=dateStr;
        }
        function convertToText(arr,className){
            if(!Array.isArray(arr)){return;}
            className='text'||className;
            var textArr=[];
            for(var i=0;i<arr.length;i++){
                var text="";
                switch(arr[i].key){
                    //击杀参与率
                    case "team_fight_rate":
                        text="<p class='"+className+"'>场均参团率高达<strong>"+parseInt(arr[i].value*100)+"%</strong> 团队支柱盘活全场</p>";
                        break;
                    //推塔
                    case "turrets_killed":
                        text="<p class='"+className+"'>祖传推土机 人送称号拆塔狂魔</p>";
                        break;
                    //发育
                    case "growth_score":
                        text="<p class='"+className+"'>发育能力一流 腰缠万贯富可敌国</p>";
                        break;
                    //输出转化率
                    case "damage_gold_take_rate":
                        text="<p class='"+className+"'>输出转化率<strong>"+parseInt(arr[i].value*100)+"%</strong> 吃的是草挤的是奶</p>";
                        break;
                    //视野分数
                    case "vision_score":
                        text="<p class='"+className+"'>有眼就插 这个峡谷由我点亮</p>";
                        break;
                    //输出伤害
                    case "total_damage_dealt_to_champions":
                        text="<p class='"+className+"'>场均输出<strong>"+parseInt(arr[i].value)+"</strong> 这局比赛我Carry</p>";
                        break;
                    //生存
                    case "total_damage_taken_rate":
                        text="<p class='"+className+"'>生存能力堪比厂长 跟我组队永不团灭！</p>";
                        break;
                    //插眼 ward_placed
                    case "ward_placed":
                        text="<p class='"+className+"'>场均插眼<strong>"+parseInt(arr[i].value)+"</strong>个 这个峡谷由我点亮</p>";
                        break;
                    //反眼ward_killed
                    case "ward_killed":
                        text="<p class='"+className+"'>场均反眼<strong>"+parseInt(arr[i].value)+"</strong>个 拆眼狂魔就是我</p>";
                        break;
                    //控制守卫
                    case "vision_wards_bought_in_game":
                        text="<p class='"+className+"'>场均真眼<strong>"+parseInt(arr[i].value)+"</strong>个 这片视野我承包了</p>";
                        break;
                    //治疗
                    case "total_health":
                        text="<p class='"+className+"'>场均治疗<strong>"+parseInt(arr[i].value)+"</strong> 论<strong>奶</strong>你是比不过我的</p>";
                        break;
                    //控制
                    case "total_time_crowd_control_dealt":
                        text="<p class='"+className+"'>控制时长远超同分段 请叫我控场大师</p>";
                        break;
                    //史诗野怪
                    case "super_monster_killed":
                    case "super_monster_score":
                        text="<p class='"+className+"'>场均控龙<strong>"+arr[i].value.toFixed(1)+"</strong>条 屠龙勇士唯一指定传人</p>";
                        break;
                    // 反野率
                    case "jungle_gank_rate":
                        text="<p class='"+className+"'>场均反野率<strong>"+parseInt(arr[i].value*100)+"</strong>% 你的野区我养猪</p>";
                        break;
                    default:
                        text="<p class='"+className+"'>数据类型暂未添加</p>";

                }
                if(arr[i].value<=0){
                    text="<p class='"+className+"'>"+commonLines[i]+"</p>";
                }

                textArr.push(text);

            }

            return textArr;
        }

    }
