function onTextActivate() {
  chrome.browserAction.setBadgeText({ text: 'on' });
  chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
}
function onTextDeactivate() {
  chrome.browserAction.setBadgeText({ text: '' });
}

(function () {
  // get data from local switch to populate icon text
  chrome.storage.local.get(['activateSwitch'], function (result) {
    if (result.activateSwitch && result.activateSwitch == true) {
      onTextActivate();
    } else {
      onTextDeactivate();
    }
  });

  // load js on page "start" (before dom ready) if switch is active
  chrome.webNavigation.onCommitted.addListener(function (details) {
    chrome.storage.local.get(['activateSwitch'], function (result) {
      if (result.activateSwitch && result.activateSwitch === true) {
        // ignore loaded iframes on the page (only top level)
        if (details.frameId == 0) {
          chrome.tabs.executeScript({
            file: 'background/core.js',
          });
        }
      }
    });
  });
})();
