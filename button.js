/* global fetch */

// https://www.google.com/cloudprint/client/cpgadget.js

var gadget = new cloudprint.Gadget()
gadget.setPrintDocument('[document mimetype]', '[document title]', '[document content]', '[encoding] (optional)')
gadget.openPrintDialog()

/*
"url"   URL to be printed
"dataUrl"   Content of a URL data document as a string
"google.drawing"    Document ID of a Google Drawing
"google.drive"  ID of a file in a user's Google Drive
"google.kix"    ID of a Google Document
"google.mail"   ID of a Gmail thread
"google.presentation"   ID of a Google Presentation
"google.spreadsheet"
*/

function readable (url) {
  return fetch('https://mercury.postlight.com/parser?url=' + url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': 'LKyckVL4j7x9LtByAUD4LfCQ40M0VdSoXW0VW6W9'
    }
  })
    .then(r => r.json())
    .then(data => ({
      title: data.title,
      content: data.content
    }))
}
