
function replace_all_as(){
//	console.log('inside');
	var goto_link;
	var elems= document.getElementsByClassName('event-name');
//	console.log(elems);
	for(var i =0; i<elems.length;i++){
//		console.log('in for');
		var xframe = document.createElement('iframe');
		xframe.style.display="none";
		xframe.setAttribute('data-index', i);
		document.body.appendChild(xframe);
		var elem = elems[i];
		goto_link = elem.parentElement.href;
//		console.log(goto_link);
		xframe.onload = function(){
			var ind = this.getAttribute('data-index')*1;
			var myelem= document.getElementsByClassName('event-name')[ind];
//			console.log('callback');
			var txt= this.contentDocument.getElementById('maincontent').parentElement.children[1].innerHTML;
			myelem.innerHTML = txt;
			this.remove();
		}
		xframe.src= goto_link;
	}
	// near events section
	/*elems = document.querySelectorAll('[data-type=event]');
	for(var i =0; i<elems.length;i++){
		var xframe = document.createElement('iframe');
		xframe.style.display="none";
		xframe.setAttribute('data-index', i);
		document.body.appendChild(xframe);
		var elem = elems[i];
		goto_link = elem.href;
		xframe.onload = function(){
			var ind = this.getAttribute('data-index')*1;
			var myelem = document.querySelectorAll('[data-type=event]')[ind];
			var txt= this.contentDocument.getElementById('maincontent').parentElement.children[1].innerHTML;
			myelem.innerHTML = txt;
			this.remove();
		}
		xframe.src= goto_link;
	}*/

}
function wait_for_it(){
	if(!document.querySelector('[data-region=event-list-loading-placeholder]').classList.contains('hidden')){
//		console.log('waiting');
		setTimeout(wait_for_it,200);
		return;
	}
	setTimeout(replace_all_as, 70);
}
function darkmode_recursive(X,level,d,cutoff){
    var P = X.children;
    var newd = d;
    if(level<=cutoff) d += (level%2 ? 6 : -2);
    for(var i=0;i<P.length;i++){
        darkmode_recursive(P[i],level+1,newd,cutoff);
    }
    s = d.toString(16);
    X.style.backgroundColor = "#"+d+d+d;
    if(X.classList.contains("earlysubmission") || X.classList.contains("latesubmission")) X.style.backgroundColor = "#43A055";
    X.style.color = "white";
}

function apply_darkmode(){
    var N = document.querySelector("nav");
    var D = document.querySelector(".drawer");
    var P = document.querySelector("#page");
    var F = document.querySelector("footer");

    darkmode_recursive(N,0,40,0);
    darkmode_recursive(D,0,40,6);
    darkmode_recursive(P,0,40,5);
    darkmode_recursive(F,0,40,1);

    //css injection

    var X = document.createElement("style");
    X.innerHTML = ".list-group-item{ background-color:#444; color:white; }";
    document.head.appendChild(X);
}

if(window.location.pathname == "/"){
	chrome.storage.sync.get('autologin', (e)=>{
			if(e.autologin == true)
			window.location = "https://cw.sharif.edu/login/index.php";
			});
}else if(window.location.pathname == "/login/index.php"){
	chrome.storage.sync.get(['uname','pass','autologin'], (e)=>{
			if(e.autologin == true){
			document.getElementsByName("username")[0].value = e.uname;
			document.getElementsByName("password")[0].value = e.pass;
			document.getElementById("loginbtn").click();
			}
			});
}else if(window.location.pathname.startsWith('/my/')){
	wait_for_it();
}
chrome.storage.sync.get('darkmode', (e)=>{
	if(e.darkmode){
		if(e.darkmode == true){
			apply_darkmode();
		}
	}
});
