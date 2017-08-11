window.onload=function () {
        // 文字的随机的颜色
        var randomColor=["#332532","#542164","#a3af00","#0060f6","#bd5f24","#193441"];
        // 强调文字的随机颜色
        var strongColor=["#00885d","#B9121B","#a91afd"];
        // 判断是否为最后一个并且宽度小于50%
        var count=0;
        var outerWitdh,textArray;
        var funcName;
        var championLines;

        // 假数据===============================
        var changeBtn=document.getElementById("change");
        var key22={
            "1": "Annie",
            "2": "Olaf",
            "3": "Galio",
            "4": "TwistedFate",
            "5": "XinZhao",
            "6": "Urgot",
            "7": "Leblanc",
            "8": "Vladimir",
            "9": "Fiddlesticks",
            "10": "Kayle",
            "11": "MasterYi",
            "12": "Alistar",
            "13": "Ryze",
            "14": "Sion",
            "15": "Sivir",
            "16": "Soraka",
            "17": "Teemo",
            "18": "Tristana",
            "19": "Warwick",
            "20": "Nunu",
            "21": "MissFortune",
            "22": "Ashe",
            "23": "Tryndamere",
            "24": "Jax",
            "25": "Morgana",
            "26": "Zilean",
            "27": "Singed",
            "28": "Evelynn",
            "29": "Twitch",
            "30": "Karthus",
            "31": "Chogath",
            "32": "Amumu",
            "33": "Rammus",
            "34": "Anivia",
            "35": "Shaco",
            "36": "DrMundo",
            "37": "Sona",
            "38": "Kassadin",
            "39": "Irelia",
            "40": "Janna",
            "41": "Gangplank",
            "42": "Corki",
            "43": "Karma",
            "44": "Taric",
            "45": "Veigar",
            "48": "Trundle",
            "50": "Swain",
            "51": "Caitlyn",
            "53": "Blitzcrank",
            "54": "Malphite",
            "55": "Katarina",
            "56": "Nocturne",
            "57": "Maokai",
            "58": "Renekton",
            "59": "JarvanIV",
            "60": "Elise",
            "61": "Orianna",
            "62": "MonkeyKing",
            "63": "Brand",
            "64": "LeeSin",
            "67": "Vayne",
            "68": "Rumble",
            "69": "Cassiopeia",
            "72": "Skarner",
            "74": "Heimerdinger",
            "75": "Nasus",
            "76": "Nidalee",
            "77": "Udyr",
            "78": "Poppy",
            "79": "Gragas",
            "80": "Pantheon",
            "81": "Ezreal",
            "82": "Mordekaiser",
            "83": "Yorick",
            "84": "Akali",
            "85": "Kennen",
            "86": "Garen",
            "89": "Leona",
            "90": "Malzahar",
            "91": "Talon",
            "92": "Riven",
            "96": "KogMaw",
            "98": "Shen",
            "99": "Lux",
            "101": "Xerath",
            "102": "Shyvana",
            "103": "Ahri",
            "104": "Graves",
            "105": "Fizz",
            "106": "Volibear",
            "107": "Rengar",
            "110": "Varus",
            "111": "Nautilus",
            "112": "Viktor",
            "113": "Sejuani",
            "114": "Fiora",
            "115": "Ziggs",
            "117": "Lulu",
            "119": "Draven",
            "120": "Hecarim",
            "121": "Khazix",
            "122": "Darius",
            "126": "Jayce",
            "127": "Lissandra",
            "131": "Diana",
            "133": "Quinn",
            "134": "Syndra",
            "136": "AurelionSol",
            "141": "Kayn",
            "143": "Zyra",
            "150": "Gnar",
            "154": "Zac",
            "157": "Yasuo",
            "161": "Velkoz",
            "163": "Taliyah",
            "164": "Camille",
            "201": "Braum",
            "202": "Jhin",
            "203": "Kindred",
            "222": "Jinx",
            "223": "TahmKench",
            "236": "Lucian",
            "238": "Zed",
            "240": "Kled",
            "245": "Ekko",
            "254": "Vi",
            "266": "Aatrox",
            "267": "Nami",
            "268": "Azir",
            "412": "Thresh",
            "420": "Illaoi",
            "421": "RekSai",
            "427": "Ivern",
            "429": "Kalista",
            "432": "Bard",
            "497": "Rakan",
            "498": "Xayah"
        };
        var keyArr=[];
        for( var i in key22){
            keyArr.push(i);
        }
        var championId=keyArr[Math.floor(Math.random()*keyArr.length)];
        var textToAdd={
            summonerName:"训练营大神",
            championId:championId,
            area:"峡谷之巅",
            tier:"钻石",
            text:{
                killParticipationRate:"50%",
                damage:4000,
                wards:20
            }
        };
        var dataDic={
            "area":"第一",
            "tier":"大神带你飞",
            "killParticipationRate":["场均参团","团队支柱盘活全场"],
            "damage":["场均伤害","这局比赛我Carry"],
            "wards":["场均插眼","这个峡谷由我点亮"]
        };
        //换英雄按钮
        changeBtn.addEventListener("click",function(){
            textToAdd.championId=keyArr[Math.floor(Math.random()*keyArr.length)];
            textToAdd.summonerName="大神"+textToAdd.championId+"号";
            document.querySelector(".container").style.display="block";
            document.querySelector(".canvas").innerHTML="";
            util.ajax({
                url:"./championLines.json",
                type:"GET",
                success:function(response){
                    championLines=response.data;
                    //grid为容器ID，text为每一行p标签的类
                    addRankInfo(textToAdd);
                    addContent(textToAdd,"grid","text");
                }
            });
        });
        //======================================

        util.ajax({
           url:"./championLines.json",
           type:"GET",
           success:function(response){
               championLines=response.data;
               //grid为容器ID，text为每一行p标签的类
               addRankInfo(textToAdd);
               addContent(textToAdd,"grid","text");
           }
        });
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
        function addContent(textToAdd,id,className){
            id=id||"grid",
            className=className||"text";
            var textBox=document.getElementById(id);
            var championText=championLines[textToAdd.championId].lines;
            var championName=championLines[textToAdd.championId].title;
            // var championTextArr=[];
            var dataTextArr=[];
            var tempArr=[];
            var finalHtmlText;

            for(var j in textToAdd.text){
                var dataText='<p class="'+className+'">'+dataDic[j][0]+'<strong>'+textToAdd.text[j]+'</strong>&nbsp;&nbsp;'+dataDic[j][1]+'</p>>';
                tempArr.push(dataText);
            }
            var randomArr=randomArray(tempArr);
            var finalT=randomArr.splice(-1,1);
            dataTextArr.push(randomArr);
            for(var i=0;i<championText.length;i++){
                dataTextArr.push( '<p class="'+className+'">'+championText[i]+'</p>>');
            }

            dataTextArr.push('<p class="'+className+'"><strong>'+textToAdd.area+'</strong>'+dataDic["area"]+'<strong>'+championName+'</strong>','<p class="'+className+'"><strong>'+textToAdd.tier+'</strong>'+dataDic["tier"]);
            dataTextArr=randomArray(dataTextArr);
            dataTextArr.push(finalT);
            finalHtmlText=dataTextArr.join("");
            textBox.innerHTML=finalHtmlText;
            refresh(id,className);
            var domToCvs=document.querySelector(".container");
            var width=domToCvs.offsetWidth;
            var height=domToCvs.offsetHeight;
            var scaleBy = window.devicePixelRatio;
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
                        img.src=canvas.toDataURL();
                        cvs.appendChild(img);
                        if(cvs.innerHTML){
                            domToCvs.style.display="none";
                        }else{
                            document.querySelector(".loading").style.display="none";
                        }
                    },
                    allowTaint:true,
                    background:"#fff",
                    useCORS:true
                });
                this.onload=null;
            }
            img.src="champion/"+championLines[textToAdd.championId].key+".png";

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
                imgs[i].src="champion/"+championLines[textToAdd.championId].key+".png";
            }
            var date1=new Date();
            var date=new Date(date1.getTime()-3600000);
            var hourStr=date.getHours()<10?"0"+date.getHours():date.getHours();
            var minutueStr=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
            var dateStr=(date.getMonth()+1)+"-"+date.getDate()+" "+hourStr+":"+minutueStr;
            document.getElementById(dateId).innerText=dateStr;
        }

    }
