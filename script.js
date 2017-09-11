/* global fetch, cloudprint */

var url = location.href
var title = document.title

var done = function () {}

var included = new Promise((resolve, reject) => {
  done = resolve
})

// include google cloud print widget script
if (!document.getElementById('f-gcp')) {
  let s = document.createElement('script')
  s.src = 'https://www.google.com/cloudprint/client/cpgadget.js'
  s.id = 'f-gcp'
  s.onload = done
  document.body.appendChild(s)
}

// add a hidden input
if (!document.getElementById('f-gcp-i')) {
  let v = document.createElement('input')
  v.id = 'f-gcp-i'
  v.style.display = 'none'
  v.onchange = run
  document.body.appendChild(v)
}

function run (command) {
  included.then(() => {
    var gadget
    var selection
    switch (command) {
      case 'print-url':
        gadget = new cloudprint.Gadget()
        gadget.setPrintDocument('url', title, url)
        gadget.openPrintDialog()
        break
      case 'print-readable':
        fetch('https://mercury.postlight.com/parser?url=' + url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-api-key': 'LKyckVL4j7x9LtByAUD4LfCQ40M0VdSoXW0VW6W9'
          }
        })
          .then(r => r.json())
          .then(data => {
            let gadget = new cloudprint.Gadget()
            gadget.setPrintDocument('text/html', data.title, data.content)
            gadget.openPrintDialog()
          })
        break
      case 'print-selection':
        selection = window.getSelection()
        if (selection.rangeCount > 0) {
          let range = selection.getRangeAt(0)
          let clonedSelection = range.cloneContents()
          let div = document.createElement('div')
          div.appendChild(clonedSelection)
          let gadget = new cloudprint.Gadget()
          gadget.setPrintDocument('text/html', title, div.innerHTML)
          gadget.openPrintDialog()
        }
        break
      case 'print-raw-selection':
        selection = window.getSelection()
        if (selection.rangeCount > 0) {
          let range = selection.getRangeAt(0)
          let clonedSelection = range.cloneContents()
          let div = document.createElement('div')
          div.appendChild(clonedSelection)
          let gadget = new cloudprint.Gadget()
          gadget.setPrintDocument('text/plain', title, div.innerText)
          gadget.openPrintDialog()
        }
        break
      case 'print-file':
        let config = new cloudprint.Configuration()
          .setMode(cloudprint.Configuration.Mode.PRINT_FILE)
        gadget = new cloudprint.Gadget(config)
        gadget.openPrintDialog()
        break
    }
  })
}

true
