function onTextActivate() {
  chrome.browserAction.setBadgeText({ text: 'on' });
  chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
}
function onTextDeactivate() {
  chrome.browserAction.setBadgeText({ text: '' });
}

(function () {
  // wait till popup is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    // declare elements to look for
    var testText = document.getElementById('testText');
    var testSwitch = document.getElementById('testSwitch');

    // get data from local var for text box
    chrome.storage.local.get(['exampleText'], function (result) {
      if (result.exampleText) {
        testText.value = result.exampleText || '';
      }
    });
    // do something on text box input change
    testText.addEventListener('change', function () {
      if (testText.value) {
        chrome.storage.local.set({ exampleText: testText.value });
      }
    });

    // get data from local var for switch
    chrome.storage.local.get(['activateSwitch'], function (result) {
      if (result.activateSwitch && result.activateSwitch === true) {
        testSwitch.checked = true;
        onTextActivate();
      }
    });
    // do something on switch value change
    testSwitch.addEventListener('click', function () {
      if (testSwitch.checked === true) {
        chrome.storage.local.set({ activateSwitch: true });
        onTextActivate();
      } else {
        chrome.storage.local.set({ activateSwitch: false });
        onTextDeactivate();
      }
    });
  });
})();
