window.APP_METHODS={layerLogin:function(){layer.open({type:2,title:!1,area:["670px","580px"],skin:"login-layer",zIndex:99999999,content:["/user/login","no"],success:function(){},end:function(){}})},layerRegister:function(){layer.open({type:2,title:!1,area:["670px","600px"],skin:"login-layer",zIndex:99999999,content:["/user/register","no"]})}},$(window).ready(function(){$(".loginBtn").click(function(){APP_METHODS.layerLogin()}),$(".registerBtn").click(function(){APP_METHODS.layerRegister()})});Alert=[],e.geMsgUnreadcnt=function(){n.getUnreadcnt({hidemsg_:!0,load:!1}).then(function(o){if(1==o.code){var n=o.data,t=0,c={};angular.forEach(n,function(e,o){t+=1*e,c[o]=1*e>99?"99+":e}),e.msgUnreadcnt=t>99?"99+":t,e.msgUnreadList=c}})},e.$on("privateClose",function(o,n){e.geMsgUnreadcnt()}),window.isLogin&&e.geMsgUnreadcnt()}]).controller("login.com.controller",["$scope","uoocService","$window","courseService",function(e,o,n,t){e.cookieAccount=o.getCookieValue("account"),e.cookiePasswd=o.getCookieValue("passwd"),e.closeDialog=function(){o.closeSelfModel()};var c=window.parent==window?window:window.parent;e.isLoginLayer=c!=window,e.lginForm={remember:!0,account:e.cookieAccount||"",password:e.cookiePasswd||""};var r=!1;$("#slider").drag({dragok:function(){r=!0,$("#codeWrong").hide()}});$(".loginForm").Validform({tiptype:4,callback:function(n){return r?(t.login(e.lginForm).then(function(n){o.setCookie("account",e.lginForm.account,720,"/");var t=n.data;return sobj=o.searchToObj(),cookieurl=e.getCookieFromurl(),fromurl=sobj.fromurl,fromhome="/"==cookieurl||1==sobj.home,goteacher=fromhome&&(t.is_teacher||t.is_assistant),t.init_account?void layer.confirm("您正在使用初始账号进行登录，为保证您的账号安全避免泄露，请及时修改登录邮箱及密码。",{title:"安全提示",btn:["去修改","暂不修改"],end:function(){c.location.reload()}},function(){c.location.href="/home#/center/account/setting"}):void(goteacher?c.location.href="/teacher/manage/course#/center/course":fromurl?(c.location.href=fromurl,c.location.reload()):c==window?c.location.href=cookieurl||"/home":(c.location.reload(),layer.closeAll()))}),!1):($("#codeWrong").show(),!1)}}),e.close=function(){var e=parent.document.getElementById("registerBtn");e?(e.click(),o.closeSelfModel()):window.location.href="/user/register"}}]).controller("register.com.controller",["$scope","uoocService","$window","$filter","courseService",function(e,o,n,t,c){$("input[type='password']").val(""),e.closeDialog=function(){o.closeSelfModel()};var r=window.parent==window?window:window.parent;e.registerFrom={agree:!0},e.regcode=function(){var e=$("#account").val();c.sendCode({account:e,type:10}).then(function(e){layer.msg("验证码已发送，注意查收")})},$(".registerForm").Validform({tiptype:4,datatype:{passwd:o.password},callback:function(n){return c.register($(".registerForm").serialize()).then(function(n){if(1==n.code){var t=o.searchToObj().fromurl||e.getCookieFromurl()||"/home";r.location.href=t}else e.allError=n.msg}),!1}}),e.close=function(){var e=parent.document.getElementById("loginBtn");e?(e.click(),o.closeSelfModel()):window.location.href="/user/login"}}]).controller("bind.mail.controller",["$scope","uoocService","courseService","$window","$filter","$state",function(e,o,n,t,c,r){$("input[type='password']").val(""),e.formdata={account:"",code:"",password:""},e.codeInterval=0,e.curStep=1;var a=null;e.getCode=function(){var o=e.formdata.account;o&&!e.codeInterval&&n.sendCode({type:30,account:o}).then(function(){a&&clearInterval(a),e.codeInterval=60,a=setInterval(function(){--e.codeInterval,e.$apply(),e.codeInterval||clearInterval(a)},1e3)})},e.checkAccount=function(){var o=e.formdata.account,t=e.formdata.code;o&&t&&n.checkAccount({account:o}).then(function(o){var n=o.data.exists;n?e.bindAccount():e.curStep=2})},e.bindAccount=function(){n.bindAccountByCode(e.formdata).then(function(){layer.msg("绑定成功"),location.href="/home#/center/account/setting"})};$("form[name='setPassword']").Validform({tiptype:4,datatype:{passwd:o.password},callback:function(o){return e.bindAccount(),!1}})}]);