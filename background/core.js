(function() {
  chrome.storage.local.get([ 'exampleText' ], function( result ) {
    if ( result.exampleText && result.exampleText !== '') {
      console.log("sample extension input box says - " + String(result.exampleText));
    } else {
      console.log("sample extension working!");
    }
  });
})();