/* global fetch, cloudprint */

var url = location.href
var title = document.title

switch (window.cmd) {
  case 'print-url':
    let gadget = new cloudprint.Gadget()
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
    var range
    let selection = window.getSelection()
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0)
      let clonedSelection = range.cloneContents()
      let div = document.createElement('div')
      div.appendChild(clonedSelection)
      let gadget = new cloudprint.Gadget()
      gadget.setPrintDocument('text/html', title, div.innerHTML)
      gadget.openPrintDialog()
    }
    break
}
