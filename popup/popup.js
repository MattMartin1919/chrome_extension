
(function() {
  // wait till popup is fully loaded
  document.addEventListener( 'DOMContentLoaded', function() {
    var testButton = document.getElementById( 'testSwitch' );
    // get data from local var
    chrome.storage.local.get([ 'testExtensionVar' ], function( result ) {
      if ( result.testExtensionVar && result.testExtensionVar === true ) {
        testButton.checked = true;
        chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
        chrome.browserAction.setBadgeText({ text: "on" });
      }
    });
    // do something on button click
    testButton.addEventListener( 'click', function() {
      if ( testButton.checked === true ) {
        chrome.storage.local.set({ 'testExtensionVar': true });
        chrome.browserAction.setBadgeText({ text: "on" });
        chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
      } else {
        chrome.storage.local.set({ 'testExtensionVar': false });
        chrome.browserAction.setBadgeText({ text: "off" });
        chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
      }
    });
  });
})();