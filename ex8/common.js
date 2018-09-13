!function(){var e=angular.module("common.module",[]);e.factory("uoocService",["$http","$httpParamSerializerJQLike","$q",function(e,t,n){var r=!1,o={ajaxHttpEx:function(r,a,i,c){a=a||{},i=i||"GET";var s;a.load!==!1?s=layer.load():delete a.load;var l,u;return"POST"==i?l=_.isString(a)?a:t(a):u=a,e({method:i,url:r,data:l,params:u,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8",XSRF:angular.element("meta[name=_xsrf]").attr("content")}}).then(function(e){if(!angular.isObject(e.data))return n.reject({msg:"数据格式错误"});if(1!=e.data.code)return n.reject(e.data);var t=e.data||{};return"function"==typeof c&&c(t),t},function(e){return e.status?200!=e.status?n.reject({msg:"网络请求超时，请稍后重试。"}):void 0:n.reject({msg:"出现错误..."})})["catch"](function(e){if(401==e.code)o.showLogin();else if(601==e.code){var t="<h2>请修正下列错误：</h2><ul>";_.each(e.data,function(e){t+="<li>"+e+"</li>"}),t+="</ul>",layer.alert(t,{title:e.msg})}else 450==e.code?layer.alert("您当前身份没有验证,请前往认证",{btn:["前往认证"]},function(){location.href="/home#/center/identify/student"}):a.hidemsg_||layer.msg(e.msg||"出现错误",{offset:"300px"});return n.reject(e)})["finally"](function(){s&&layer.close(s)})},showLogin:function(){if(r)return!1;r=!0;var e=location.href,t="/"==$(".header ul .active").attr("href");this.layerOpen({width:"670px",height:"580px",skin:"login-layer",zIndex:99999999,content:["/user/login?fromurl="+e+"&home="+(t?1:0),"no"],success:function(){},end:function(){r=!1}})},layerLogin:function(){this.ajaxHttpEx("/home/announce/getUnreadCnt",{hidemsg_:!0,load:!1},"GET").then(function(){location.reload()})},checkLogin:function(){return this.ajaxHttpEx("/home/announce/getUnreadCnt",{hidemsg_:!0,load:!1},"GET")},layerRegister:function(){this.layerOpen({width:"670px",height:"600px",skin:"login-layer",zIndex:99999999,content:["/user/register","no"]})},loginActive:function(){window.top.layer.confirm("你的邮箱没有激活,是否前往激活",{btn:["前往激活","取消"]},function(){swindow.location.href="/user/active",swindow.layer.closeAll()},function(){curWindow==window?swindow.location.href="/":swindow.location.reload()})},refreshCode:function(e){return"string"==typeof e&&(e=document.getElementById(e)),oldSrc_=e.getAttribute("src").replace(/\?.+$/,""),curSrc_=oldSrc_+"?"+Math.random(),e.setAttribute("src",curSrc_),e},layerOpen:function(e,t){var n=window.layer;t&&(n=window.parent.layer);var r={closeBtn:1,type:2,move:!1,title:!1,fix:!1,shadeClose:!0,maxmin:!1,offset:"auto",scrollbar:!1,moveType:1,area:[e.width||"400px",e.height||"500px"]};return e=$.extend(!0,r,e),n.open(e)},closeSelfModel:function(){var e=parent.layer.getFrameIndex(window.name);parent.layer.close(e)},refreshWindow:function(e,t){var n=e;if(arguments.length>=2)for(;n.parent&&t>0;)t--,n=n.parent;n.location.reload()},browser:function(){var e={msie:!1,chrome:!1,firefox:!1,opera:!1,safari:!1,name:"unknown",version:0},t=window.navigator.userAgent.toLowerCase();return/(msie|chrome|firefox|opera|netscape)\D+(\d[\d.]*)/.test(t)?(e[RegExp.$1]=!0,e.name=RegExp.$1,e.version=RegExp.$2):/version\D+(\d[\d.]*).*safari/.test(t)&&(e.safari=!0,e.name="safari",e.version=RegExp.$2),e},searchToObj:function(e){for(var t=e||window.location.search,n=t.substring(1).split("&"),r={},o=0;o<n.length;o++){var a=n[o].split("=");r[a[0]]=a[1]}return r},newWin:function(e){var t=window.open("about:blank");t.location.href=e},setCookie:function(e,t,n,r){var e=escape(e),t=escape(t),o=new Date;o.setTime(o.getTime()+36e5*n),r=""==r?"":";path="+r,_expires="string"==typeof n?"":";expires="+o.toUTCString(),document.cookie=e+"="+t+_expires+r},getCookieValue:function(e){var e=escape(e),t=document.cookie;e+="=";var n=t.indexOf(e);if(n!=-1){var r=n+e.length,o=t.indexOf(";",r);o==-1&&(o=t.length);var a=t.substring(r,o);return a}return""},deleteCookie:function(e,t){var e=escape(e),n=new Date(0);t=""==t?"":";path="+t,document.cookie=e+"=;expires="+n.toUTCString()+t},password:function(e,t,n,r){var o=/\s+/,a=/((?=[\x21-\x7e]+)[^A-Za-z0-9])+/,i=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/;return e||0!=e.length?o.test(e)?"密码不能包含空格":a.test(e)?"密码不能包含特殊符号":!!i.test(e)||"密码需由8-15数字与英文构成":"密码不能包含空格"}};return o}])}();