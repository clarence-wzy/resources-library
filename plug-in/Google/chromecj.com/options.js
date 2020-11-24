(function () {
	var input = document.getElementsByTagName("input"),
		status = document.getElementById("status"),
		fieldSet=document.getElementsByTagName("fieldset"),
		help=document.getElementById("help"),
	
		disableExtension=Number(localStorage["QTDisable"]),
		selectedChannel = localStorage["QTChannel"] || '1';
	
	if(disableExtension===1){
		input[0].checked=false;
		fieldSet[0].disabled=true;
		fieldSet[0].className="disabled";
		input[5].className="";
	}else{
		input[0].checked=true;
	}	
	
	input[0].addEventListener('click',function(){
		disableExtension = disableExtension === 1 ? 0 : 1;
		localStorage["QTDisable"] = disableExtension;
		chrome.extension.getBackgroundPage().updateQTExtension();

		if(disableExtension===1){
			fieldSet[0].disabled=true;
			fieldSet[0].className="disabled";
			input[5].className="";
		}else{
			fieldSet[0].disabled=false;
			fieldSet[0].removeAttribute("class");
			input[5].className="btns";
		}
	},false);
	
	for (var i = 1; i <= 4; i++) {
		if (input[i].value === selectedChannel) {
			input[i].checked = true;
			break;
		}
	}
	
	input[5].addEventListener('click', function () {
		for (var i = 1; i <= 4; i++) {
			if (input[i].checked) {
				localStorage["QTChannel"] = input[i].value;
				chrome.extension.getBackgroundPage().updateQTExtension();
				status.innerHTML = "切换成功!";
				setTimeout(function () {
					status.innerHTML = "";
				}, 1000);
				break;
			}
		}
	}, false);

	input[6].addEventListener('click', function () {
		if(help.getAttribute("class")=='hide'){
			help.removeAttribute("class");
		}else{
			help.setAttribute("class","hide");
		}
	}, false);
})();
