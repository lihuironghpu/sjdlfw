/************************************************************************
 * AUTHOR: 李惠荣
 * FILENAME: common.js
 * DESCRIPTION: 公用方法编写
 * NOTE: iframe对象，ui组件对象，表单校验对象，请求相关对象
 * HISTORY: create 2016/12/19 by lhr;
 ***********************************************************************/
//cookie设置读取
var cookieObj = {
    setCookie: function(cname,cvalue){
        document.cookie = cname + "=" + cvalue;
    },
    getCookie: function(cname){
        if (document.cookie.length>0)
        {
            var c_start=document.cookie.indexOf(cname + "=");
            if (c_start!=-1)
            {
                c_start=c_start + cname.length+1;
                var c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                return document.cookie.substring(c_start,c_end);
            }
        }
        return ""
    }
};
/*
* base64加解密
* 加密调用方法 base64Obj.encode(base64Obj.utf16to8(str))
* 解密调用方法 base64Obj.utf8to16(base64Obj.decode(str))
* */
var base64Obj = {
    encodeCharts : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    decodeChars : [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1,　0,　1,　2,　3,  4,　5,　6,　7,　8,　9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1],
    encode : function(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if(i == len)
            {
                out += this.encodeCharts.charAt(c1 >> 2);
                out += this.encodeCharts.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if(i == len)
            {
                out += this.encodeCharts.charAt(c1 >> 2);
                out += this.encodeCharts.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
                out += this.encodeCharts.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += this.encodeCharts.charAt(c1 >> 2);
            out += this.encodeCharts.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
            out += this.encodeCharts.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
            out += this.encodeCharts.charAt(c3 & 0x3F);
        }
        return out;
    },
    decode : function(str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while(i < len) {
            /* c1 */
            do {
                c1 = this.decodeChars[str.charCodeAt(i++) & 0xff];
            } while(i < len && c1 == -1);
            if(c1 == -1)
                break;
            /* c2 */
            do {
                c2 = this.decodeChars[str.charCodeAt(i++) & 0xff];
            } while(i < len && c2 == -1);
            if(c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if(c3 == 61)
                    return out;
                c3 = this.decodeChars[c3];
            } while(i < len && c3 == -1);
            if(c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if(c4 == 61)
                    return out;
                c4 = this.decodeChars[c4];
            } while(i < len && c4 == -1);
            if(c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    },
    utf16to8 : function(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for(i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >>　6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >>　0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >>　6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >>　0) & 0x3F));
            }
        }
        return out;
    },
    utf8to16 : function(str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while(i < len) {
            c = str.charCodeAt(i++);
            switch(c >> 4)
            {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i-1);
                break;
                case 12: case 13:
                // 110x xxxx　 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
                case 14:
                    // 1110 xxxx　10xx xxxx　10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }
};
//ui组件
var uiPartObj = {
    //初始化左侧和顶部的公用区域菜单
    initMenuTop: function(){
        //左侧菜单内容
        var leftHtml =
            '<div class="left_container">'+
            '<div class="header"><a href="index.html"><img src="" alt="logo图片"></a></div>'+
            '<div class="menu_container">'+
            '<dl><dt><a class="menu sy" href="index.html">首页</a></dt></dl>'+
            '<dl><dt><a class="menu fwkz" href="visitControl.html">访问控制</a></dt></dl>'+
            '<dl>'+
            '<dt><a class="menu dlgz">代理规则</a></dt>'+
            '<dd><a class="submenu dlgz-webdl" href="webProxy.html">web代理</a><a class="submenu dlgz-yydl" href="applicationProxy.html">应用代理</a></dd>'+
            '</dl>'+
            '<dl><dt><a class="menu xtpz" href="systemSetting.html">系统配置</a></dt></dl>'+
            '<dl><dt><a class="menu qhztxpz" href="communicationSetting.html">前后置通信配置</a></dt></dl>'+
            '<dl><dt><a class="menu rzsj" href="logCount.html">日志审计</a></dt></dl>'+
            '</div>'+
            '</div>';
            $("#leftMenu").append(leftHtml);
            //绑定左侧一级菜单点击事件
            $("#leftMenu .menu").click(function(){
                cookieObj.setCookie("menuId",$(this).attr("class").split(' ')[1]);
                $("#leftMenu .menu_container dd").not( $(this).parent().next()).slideUp();
                $(".menu").not($(this)).removeClass("active");
                $(this).addClass("active");
                $(this).parent().next().slideToggle();
            });
            //二级菜单点击事件
            $("#leftMenu .submenu").click(function(){
                cookieObj.setCookie("menuId",$(this).attr("class").split(' ')[1]);
            });

        var topHtml = "我是顶部区域";
        $("#header").append(topHtml);


    },
    //报错提示框
    alert: function(txt){

    },
    //确认框
    confirme: function(txt,callback){
        //    显示确认框

        //    绑定点击取消事件
        //    绑定点击确定事件
    },
    //显示loading
    showLoading: function(){

    },
    //隐藏loading
    hideLoading: function(){

    }

};
//报文相关处理对象
var requestObj = {
    url: "http://192.168.1.1:",
    port: "8080/",
    timeOutTime: 60000,
    addresss : {
        login: ""

    },
    ajaxServer: function(url,postData,successFun,errorFun){
        $.ajax({
            url: this.url+this.port+url,
            type: 'POST',
            timeout: this.timeOutTime,
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(postData),
            beforeSend: function() {
                uiPartObj.showLoading();
            },
            success: function(data){
                if(data.head["_rd"] == "000000"){
                    //请求成功处理逻辑
                    //todo
                    //alert(successFun);
                    successFun(data);
                }else if(data.head["_rd"] == "000001"){
                    //需要登录
                }else{
                    //请求失败提示
                    uiPartObj.alert(data.head["_rd"],data.head["_rm"]);
                }
            },
            error: function(data){
                if(data.status === 404){
                    //    显示404页面
                    window.location.href("404.html");
                }else if(data.status === 401){
                    //未认证通过，超时或者用户名密码不正确
                    //todo
                }else{
                    //其他错误，直接显示错误信息
                    uiPartObj.alert("ERROR: "+data.status+" ", data.statusText);
                }
            },
            complete: function(data,status){
                uiPartObj.hideLoading();
            }

        })
    },
    //初始化分页
    "initPager": function(url,successFun){
        //初始化分页
        kkpager.generPageHtml({
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isGoPage: false,
            pno : pageObj.pageIndex,
            mode : 'click', //设置为click模式
            //总页码
            total : pageObj.totalPage,
            //总数据条数
            totalRecords : pageObj.recordsTotal,
            //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
            click : function(n){
                //处理完后可以手动条用selectPage进行页码选中切换
                pageObj.pageIndex = n;
                //requestObj.ajaxServer(url,postData,successFun);
            }
        },true);
    }
};
//tab切换

//进入页面立即执行的方法
(function(){
    //初始化左侧菜单和顶部菜单
    if($(".left_container")){
        uiPartObj.initMenuTop();
        /*判断是否有cookie，有的话设置当前菜单*/
        var menuClass=cookieObj.getCookie('menuId');
        if (menuClass!=null && menuClass!=""){
            if(menuClass.split("-").length>1){
            //是二级菜单
                $(".submenu."+menuClass).addClass("active");

                $(".submenu."+menuClass).parent().show();
                $(".menu."+menuClass.split("-")[0]).addClass("active");
            }else{
                $(".menu."+menuClass).addClass("active");
            }
        }else{
            //默认首页
            $(".menu.sy").addClass("active");
        }
    }
    //tab切换事件
    $(".nav.nav-tabs li").click(function(){
        //console.log($(".nav.nav-tabs a").index($(this)));
        var aIndex = $(".nav.nav-tabs li").index($(this));
        var indexContent = $(this).parent().next().children($(".tab-pane")).eq(aIndex);
        $(this).parent().next().children($(".tab-pane")).not(indexContent).hide();
        indexContent.show();
    });

})();
