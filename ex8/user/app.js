var app=angular.module("app",["common.module","oc.lazyLoad","ui.router","uooc.pager","course.service"]).run(["$rootScope","$state","$stateParams","$filter","uoocService",function(e,o,t,i,s){e.$state=o,e.$stateParams=t,e.staticRoot=window.staticRoot,e.$watch("$state.current.url",function(){e.stateName=e.$state.current.name,e.setCookieFromurl()}),e.closeAll=function(){layer.closeAll()};var n={prevent:!1,msg:"路由被阻止"};e.preventRouter=function(e,o){n.prevent=e,n.msg=o||n.msg},e.$on("$stateChangeStart",function(t,i,s){n.prevent&&(t.preventDefault(),layer.confirm(n.msg,{btn:["确定离开","留在本页"]},function(){e.preventRouter(!1),o.go(i.name,s),layer.closeAll()},function(){layer.closeAll()}))}),e.setCookieFromurl=function(){if("/user/login"!=location.pathname){var e=encodeURI(location.pathname,"utf-8"),o=encodeURI(location.hash.replace("#",""),"utf-8");s.setCookie("formpath",e,720,"/"),s.setCookie("formhash",o,720,"/")}},e.setCookieFromurl(),e.getCookieFromurl=function(){var e=s.getCookieValue("formpath"),o=s.getCookieValue("formhash");return e+(o?"#"+o:"")},window.onbeforeunload=function(){if(n.prevent)return n.msg};var r=["tip_source","tip_fuxibtn","tip_homework_set","tip_homework_public","tip_archived"];_.forEach(r,function(o){e[o]=i("getCookie")(o)}),e.tipDone=function(o,t){t&&t.stopPropagation(),e[o]=i("setCookie")(o,"yes")}}]).config(["$controllerProvider","$compileProvider","$filterProvider","$provide",function(e,o,t,i){app.controller=e.register,app.directive=o.directive,app.filter=t.register,app.factory=i.factory,app.service=i.service,app.constant=i.constant,app.value=i.value}]).constant("Ueditor_Config",{"default":["bold","italic","underline","forecolor","justifyleft","justifyright","justifycenter","link","insertimage","inserttable","kityformula","fontsize"],question:["fullscreen","bold","italic","underline","forecolor","justifyleft","justifyright","justifycenter","link","insertimage","inserttable","kityformula","fontsize","attachment"]}).constant("Lazy_Files",{ueditor:["/assets/ueditor/ueditor.config.js","/assets/ueditor/ueditor.min.js","/assets/ueditor/lang/zh-cn/zh-cn.js"],ueditorKityFormula:["/assets/ueditor/kityformula-plugin/addKityFormulaDialog.js","/assets/ueditor/kityformula-plugin/getKfContent.j","/assets/ueditor/kityformula-plugin/defaultFilterFix.js"],laydate:[window.staticRoot+"/index/css/plugins/laydate.css?v1526900280612=4ded7f9f69",window.staticRoot+"/index/js/vendors/laydate/laydate.js"],uploadFile:[window.staticRoot+"/index/js/vendors/jquery.ui.widget.js",window.staticRoot+"/index/js/vendors/jquery.iframe-transport.js",window.staticRoot+"/index/js/vendors/jquery.fileupload.js"],validform:[window.staticRoot+"/index/js/vendors/Validform_v5.3.1.js"],chosen:[window.staticRoot+"/index/js/vendors/chosen.jquery.min.js",window.staticRoot+"/index/js/vendors/select2/select2.min.css"],bosUp:[window.staticRoot+"/index/js/vendors/bce-bos-uploader.bundle.min.js",window.staticRoot+"/index/js/directives/bosUp.js?v1526900280612=522c6470be",window.staticRoot+"/index/js/directives/bosLib.js?v1526900280612=e9dbcbf5f2",window.staticRoot+"/index/js/directives/bosAll.js?v1526900280612=7d2e4f328a"],uoocVideo:[window.staticRoot+"/index/js/vendors/videojs-contrib-hls.js",window.staticRoot+"/index/js/service/videoService.js?v1526900280612=e45702e1dc",window.staticRoot+"/index/js/directives/uoocVideo.js?v1526900280612=bebaa00934"],fileupload:[window.staticRoot+"/index/js/vendors/jquery.ui.widget.js",window.staticRoot+"/index/js/vendors/jquery.iframe-transport.js",window.staticRoot+"/index/js/vendors/jquery.fileupload.js"],videoJs:[window.staticRoot+"/index/css/plugins/video-js.css?v1526900280612=e83ffa9176",window.staticRoot+"/index/js/vendors/video.js"],uoocPdf:[window.staticRoot+"/index/js/vendors/pdf.js",window.staticRoot+"/index/js/vendors/pdf.worker.js",window.staticRoot+"/index/js/directives/angular-pdf.js?v1526900280612=545d6e3acb"],uoocEditor:[window.staticRoot+"/index/js/directives/uoocEditor.js?v1526900280612=1decd4a383"],orderChapter:[window.staticRoot+"/index/js/directives/orderChapter.js?v1526900280612=ba80de1746"],chapterSource:[window.staticRoot+"/index/js/directives/chapterSource.js?v1526900280612=24c8c291d6"],sourceView:[window.staticRoot+"/index/js/directives/sourceView.js?v1526900280612=a8056fbc1b"],questionSubject:[window.staticRoot+"/index/js/directives/questionSubject.js?v1526900280612=8a042735cc"],swfObject:[window.staticRoot+"/index/js/vendors/swfObject/swfobject.js"],cropAvatar:[window.staticRoot+"/index/js/vendors/cropper.min.js",window.staticRoot+"/index/css/plugins/cropper.css?v1526900280612=5431399b8a",window.staticRoot+"/index/js/directives/cropAvatar.js?v1526900280612=188dab3ef0"]}).config(["$ocLazyLoadProvider",function(e){e.config({debug:!1,events:!0,modules:[{name:"uooc.pager",files:[window.staticRoot+"/index/js/directives/pager.js?v1526900280612=f66c30a338"]},{name:"uooc.tableDrop",files:[window.staticRoot+"/index/js/directives/tableDrop.js?v1526900280612=6730ec2ec5"]},{name:"uooc.dropMenu",files:[window.staticRoot+"/index/js/directives/dropMenu.js?v1526900280612=49bbacf855"]},{name:"correct.table",files:[window.staticRoot+"/index/js/directives/correctTable.js?v1526900280612=ee61471cc1"]},{name:"privateMsg.module",files:[window.staticRoot+"/index/js/directives/privateMsg.js?v1526900280612=055db9746b"]},{name:"course.service",files:[window.staticRoot+"/index/js/service/courseService.js?v1526900280612=e859ff8b86"]},{name:"question.service",files:[window.staticRoot+"/index/js/service/questionService.js?v1526900280612=8cc89ef279"]},{name:"CacheFactory",files:[window.staticRoot+"/index/js/vendors/angular-cache.js"]},{name:"bos",files:[window.staticRoot+"/index/js/service/bosService.js?v1526900280612=1f138befa5"]}]})}]);