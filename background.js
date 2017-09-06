/* global browser */

browser.browserAction.onClicked.addListener(function () {
  run('print-url')
})

function run (command) {
  Promise.all([
    browser.tabs.executeScript({file: '/vendor/gcp.js'}),
    browser.tabs.executeScript({code: `window.cmd = "${command}"`})
  ])
    .then(() =>
      browser.tabs.executeScript({
        file: '/script.js',
        matchAboutBlank: true
      })
    )
    .catch(e => console.log('google cloud print loading error', e))
}

browser.contextMenus.create({
  id: 'print-selection',
  title: 'Print selection on Google Cloud Print',
  contexts: ['selection']
})

browser.contextMenus.create({
  id: 'print-page-as-article',
  title: 'Print current page as article on Google Cloud Print',
  contexts: ['page']
})

browser.contextMenus.onClicked.addListener(function (info, tab) {
  switch (info.menuItemId) {
    case 'print-raw-selection':
      run('print-selection-raw')
      break
    case 'print-selection':
      run('print-selection')
      break
    case 'print-page-as-article':
      run('print-readable')
      break
  }
})
