/* global browser */

browser.browserAction.onClicked.addListener(function () {
  run('print-file')
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
  id: 'print-url',
  title: 'Print current page',
  contexts: ['page', 'selection']
})

browser.contextMenus.create({
  id: 'print-readable',
  title: 'Print current page as article',
  contexts: ['page', 'selection']
})

browser.contextMenus.create({
  id: 'print-selection',
  title: 'Print selection formatted',
  contexts: ['selection']
})

browser.contextMenus.create({
  id: 'print-raw-selection',
  title: 'Print selection as plain text',
  contexts: ['selection']
})

browser.contextMenus.onClicked.addListener(function (info, tab) {
  run(info.menuItemId)
})
