/* global browser */

browser.browserAction.onClicked.addListener(function () {
  browser.tabs.executeScript({
    file: '/vendor/gcp.js'
  })
    .then(() =>
      browser.tabs.executeScript({
        file: '/script.js',
        matchAboutBlank: true
      })
    )
    .catch(e => console.log('google cloud print loading error', e))
})
