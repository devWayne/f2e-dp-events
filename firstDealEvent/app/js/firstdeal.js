 // console.log('main init');;
 var $ = require('./zepto.min.cortex'),
 	isFirstBuy = window.data.isFirstBuy,
 	isLogin = window.data.isLogin,
 	isUploadCheck = window.data.isUploadCheck,
 	isNeedBind = window.data.isNeedBind,
 	appVersion = window.data.appVersion,
 	dpId=window.data.dpId,
 	isValidateVersion = false,
 	buyBtn = $('.list'),
 	cancelBtn=$('.j-back'),
 	updateBtn=$('.j-update'),
 	jumpBtn=$('.j-jump'),
 	sendBtn=$('.sendBtn'),
 	_event = {
 		buyCb: function(e) {
 			e.preventDefault();
 			var dealId = $(e.target).parents('.list').attr("data-dealId");
 			if (isFirstBuy) {
 				if (!isValidateVersion) {
 					_utils.showOverlay(0);
 					_utils.centershow('.popbox');
 					return false;
 				}
 				if (!isLogin) {
 					window.location.href="dianping://complexweb?url=" + encodeURIComponent(window.location.hostname + "/lab/dealfree&logintype=m&token=!");
 					return false;
 				}
 				if (!isNeedBind) {
 					window.location.href="/lab/dealfree/landing?callback=bind&dealGroupId=" + dealId+"&dpId="+dpId;
 					return false;
 				}
 				if (!isUploadCheck) {
 					window.location.href="/lab/dealfree/landing?callback=uploadCheck&dealGroupId=" + dealId+"&dpId="+dpId;
 					return false;
 				}
 				window.location.href="dianping://tuandeal?id=" + dealId;
 				return false;
 			} else {
 				window.location.href="dianping://tuandeal?id=" + dealId;
 				return false;
 			}

 		}

 	},_utils = {

 	compareVersion: function(version1, version2) {
 		var ver1Array = version1.split("."),
 			ver2Array = version2.split("."),
 			result = false;
 		if (ver1Array[0] > ver2Array[0]) {
 			result = true;
 			return result;
 		} else if (ver1Array[1] > ver2Array[1]) {
 			result = true;
 			return result;
 		} else if (ver1Array[2] >= ver2Array[2]) {
 			result = true;
 			return result;
 		}
 		return result;
 	},

 	showOverlay: function(clear, opts) {
 		var overlay = $('<div id="J_overlay" style="position:absolute;left:0;top:0;background:#000;_filter:alpha(opacity=50);z-index:999;"></div>');

 		if (!clear) {
 			overlay.appendTo($('body')).css({
 				'width': $(window).width(),
 				'height': '1464px',
 				'opacity': 0.5
 			});
 		} else {
 			$('#J_overlay').remove();
 		}
 	},
 	centershow: function(divName) {
 		var top = ($(window).height() - $(divName).height()) / 2;
 		var left = ($(window).width() - $(divName).css('width').substring(0,3) )/ 2;
 		var scrollTop = $(document).scrollTop() || 0;
 		var scrollLeft = $(document).scrollLeft() || 0;
 		$(divName).css({
 			position: 'absolute',
 			'top': top + scrollTop,
 			'left': left + scrollLeft
 		}).show();
 		//$('#_overlay_').show();
 	}
 }



 exports.init = function() {
 	isValidateVersion = _utils.compareVersion(appVersion, "6.8.5");
 	buyBtn.on('click', _event.buyCb);
 	cancelBtn.on('click',function(e){
 		e.preventDefault();
 		_utils.showOverlay(1);
 		$('.popbox').hide();
 	});
 	updateBtn.on('click',function(e){
 		e.preventDefault();
 		window.location.href="http://m.api.dianping.com/downloadlink?redirect=3222";
 		return false;
 	})

 }