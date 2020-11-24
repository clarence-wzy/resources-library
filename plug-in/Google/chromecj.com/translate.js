(function (global) {
	/**set default variables*/
	var currentTabId = -1,
	currentChannel = Number(localStorage["QTChannel"]) || 1,
	contextMenuId,
	/**localStorage value type is always string, we should convert it into number when need*/
	disableExtension = Number(localStorage["QTDisable"]),
	transalteChannel = {
		1 : {
			name : 'Dict',
			url : 'http://dict.cn/'	
		},
		2 : {
			name : 'YouDao',
			url : 'http://dict.youdao.com/search?q='	
		},
		3 : {
			name : 'Iciba',
			url : 'http://www.iciba.com/'
		},
		4 : {
			name : 'Google',
			url : 'http://translate.google.cn/?hl=en#en|zh-CN|'
		}
	};
	
	global.updateQTExtension = function () {
		currentChannel = Number(localStorage["QTChannel"]) || 1;
		disableExtension = Number(localStorage["QTDisable"]);
		updateExtensionStatus();
	};
	
	/**get selection and translate it*/
	function getSelection(info) {
		var content = info.selectionText;
		
		/**if display method is not the same page then open new page*/
		if (currentTabId < 0) {
			/**if translate tab is not exist, then create it.*/
			chrome.tabs.create({
				'url' : transalteChannel[currentChannel].url + content,
				// 'pinned': true,
				'active' : true
			}, function (tab) {
				currentTabId = tab.id;
			});
		} else {
			/**if translate tab is created, then update it*/
			chrome.tabs.update(currentTabId, {
				'url' : transalteChannel[currentChannel].url + content,
				'active' : true
			});
		}
	}
	
	/**update extension status*/
	function updateExtensionStatus() {
		chrome.browserAction.setIcon({
			path : "icons/icon19" + (disableExtension ? "_disabled" : "") + ".png"
		});
		
		/**create or remove chrome context menus*/
		if (disableExtension === 1) {
			typeof contextMenuId !== 'undefined' && chrome.contextMenus.remove(contextMenuId);
			/*typeof contextMenuId!=='undefined'&&chrome.contextMenus.remove(contextMenuId, function () {
				alert("menu removed");
			});*/

			contextMenuId = undefined;
		} else {			
			if (typeof contextMenuId !== 'undefined') {
				/**if exist then update context menus*/
				chrome.contextMenus.update(contextMenuId, {
					// "title" : "翻译 "+(currentChannel===4?"":"\"%s\"")+" By " + transalteChannel[currentChannel].name
					"title" : "翻译 "+(currentChannel===4?"":"\"%s\"")
				});
			} else {
				/**if not exist then create new context menu*/
				contextMenuId = chrome.contextMenus.create({
						"title" : "翻译 "+(currentChannel===4?"":"\"%s\""),
						"contexts" : ["selection"],
						"onclick" : function (info) {
							getSelection(info);
						}
					});
			}
		}
	}
	
	/**add chrome tabs removed event listener*/
	chrome.tabs.onRemoved.addListener(function (tabIdRemove, removeInfo) {
		/**if translate tab was closed, reset currentTabId*/
		if (tabIdRemove === currentTabId) {
			currentTabId = -1;
		};
	});
	
	/**update extension status use localStorage data*/
	updateExtensionStatus();
})(window);