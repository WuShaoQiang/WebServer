/* 
 * create by Pollux
 * date 2016-08-17
 * 拖动滑块
 */
(function($){
    $.fn.drag = function(options){
        // 鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
       var drag = this, defaults = {};
        function Drag(){
            this.options = $.extend(defaults, options);
            //添加背景，文字，滑块
            var html = '<div class="drag_bg"></div>'+
                        '<div class="drag_text" onselectstart="return false;" unselectable="on">拖动滑块验证</div>'+
                        '<div class="handler handler_bg"></div>';
            this.x = null;
            this.isMove = false;
            this.drag = drag;
            this.drag.append(html);
            this.handler = this.drag.find('.handler');
            this.drag_bg = this.drag.find('.drag_bg');
            this.text = this.drag.find('.drag_text');
            this.maxWidth = this.drag.width() - this.handler.width();  //能滑动的最大间距
            this.agentsIsPC = this.isPC();
            this.bindEvent();
        }
        Drag.prototype = {
            // 是否为PC
            isPC: function(){
                var userAgentInfo = navigator.userAgent; 
               var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
               var flag = true; 
               for (var v = 0; v < Agents.length; v++) { 
                   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
               } 
               return flag; 
            },
            bindEvent: function(){
                var that = this;
                //鼠标按下时候的x轴的位置
                that.handler.on(this.agentsIsPC ? 'mousedown' : 'touchstart', function(e){
                    var _pageX = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : 0);
                    that.x = _pageX - parseInt(that.handler.css('left'), 10);
                    that.isMove = true;
                })
                $(document).on(this.agentsIsPC ? 'mousemove' : 'touchmove', function(e){
                    var _pageX = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : 0);
                    var _x = _pageX - that.x;
                    if(that.isMove){
                        if(_x > 0 && _x <= that.maxWidth){
                            that.handler.css({'left': _x});
                            that.drag_bg.css({'width': _x});
                        }else if(_x > that.maxWidth){  //鼠标指针移动距离达到最大时清空事件
                            that.handler.css({'left': that.maxWidth});
                            that.drag_bg.css({'width': that.maxWidth});
                            that.dragOk();
                        }
                    }
                })
                function _valideDone (e){
                    if(!that.x || !that.isMove) return;
                    that.isMove = false;
                    var _pageX = e.pageX || (e.originalEvent.touches[0] ? e.originalEvent.touches[0].pageX : 0);
                    var _x = _pageX - that.x;
                    if(_x < that.maxWidth){ //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                        that.handler.css({'left': 0});
                        that.drag_bg.css({'width': 0});
                    }else{
                        that.handler.css({'left': that.maxWidth});
                        that.drag_bg.css({'width': that.maxWidth});
                        that.dragOk();
                    }
                }
                $(document).on(this.agentsIsPC ? 'mouseup': 'touchend', function(e){
                    _valideDone(e)
                })
                that.handler.on(this.agentsIsPC ? 'mouseup': 'touchend', function(e){
                    _valideDone(e)
                })
            },
            dragOk: function(){
                this.isMove = false;
                this.handler.removeClass('handler_bg').addClass('handler_ok_bg');
                this.text.text('验证通过');
                this.drag.css({'color': '#fff'});
                this.handler.unbind(this.agentsIsPC ? 'mousedown' : 'touchstart');
                this.handler.unbind(this.agentsIsPC ? 'mouseup': 'touchend');
                $(document).unbind(this.agentsIsPC ? 'mousemove' : 'touchmove');
                $(document).unbind(this.agentsIsPC ? 'mouseup': 'touchend');
                if(this.options.dragok) this.options.dragok();
            },
            reset: function(){
                this.handler.removeClass('handler_bg').addClass("handler_bg").removeClass('handler_ok_bg');
                this.text.text('拖动滑块验证');
                this.handler.css({'left': 0});
                this.drag_bg.css({'width': 0});
                this.drag.css({'color': '#888'});
                this.bindEvent();
                if(this.options.reset) this.options.reset();
            }
        }
        var drag = new Drag(options);
        return drag;
    };
})(jQuery);
