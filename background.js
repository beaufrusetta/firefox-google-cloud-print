/* global browser */

browser.browserAction.onClicked.addListener(function () {
  run('print-url')
})

function run (command) {
  browser.tabs.executeScript({code: `
var s = document.getElementById('f-gcp')
if (!s) {
  s = document.createElement('script')
  s.classList.add('f-gcp')
  s.src = '${browser.extension.getURL('script.js')}'
  document.body.appendChild(s)
}

true
  `})
    .then(() =>
      browser.tabs.executeScript({code: `
var s = document.createElement('script')
s.innerHTML = "run('${command}')"
document.body.appendChild(s)

true
      `})
    )
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
