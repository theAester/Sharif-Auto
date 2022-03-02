//chrome.browserAction.onClicked.addListener( (tab) =>{
//  chrome.tabs.create( {"url" : "https:/cw.sharif.edu/" } );
//} );
/*
chrome.contextMenus.create({
  id: "FOO_ACTION",
  title: "Foo",
  contexts: ["browser_action"],
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "FOO_ACTION") {
    // Execute foo using tab id
    foo(tab.id);
  }
});

const foo = (tabId) => { console.log(`Foo called on tab with id ${tabId}`) };
*/
