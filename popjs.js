document.addEventListener('DOMContentLoaded',function(){
  chrome.storage.sync.get(['uname','pass','autologin'] , (e) => {
    if(e.uname){
        document.getElementById("uname").value = e.uname;
    }
    if(e.pass){
        document.getElementById("pass").value = e.pass;
    }
    if(e.autologin){
      document.getElementById("autologin").checked = e.autologin;
    }
  });
  document.getElementById("autologin").onchange = function(){
    chrome.storage.sync.set ( {'autologin' : document.getElementById("autologin").checked} );
  }
  document.getElementById("uname").onchange = function(){
    chrome.storage.sync.set( {"uname" : document.getElementById("uname").value } );
  }
  document.getElementById("pass").onchange = function(){
    chrome.storage.sync.set( {"pass" : document.getElementById("pass").value } );
  }
  document.getElementById("button1").onclick = function(){
    chrome.tabs.create( {"url" : "https://cw.sharif.edu"} );
  }
});

