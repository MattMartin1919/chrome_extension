// get data from local var to populate icon
chrome.storage.local.get([ 'testExtensionVar' ], function( result ) {
  if ( result.testExtensionVar && result.testExtensionVar == true ) {
    chrome.browserAction.setBadgeText({ text: "On" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
  } else {
    chrome.browserAction.setBadgeText({ text: "Off" });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
  }
});

// load js on page "start" (before dom ready)
chrome.webNavigation.onCommitted.addListener( function( details ) {
  // get a local variable to see if we should fire the core code
  chrome.storage.local.get([ 'testExtensionVar' ], function( result ) {
    if ( result.testExtensionVar && result.testExtensionVar === true ) {
      // ignore loaded iframes on the page (only top level)
      if( details.frameId==0 ) {
        // execute core code
        chrome.tabs.executeScript({ 
          file: 'background/core.js' 
        });
      }
    }
  });
});