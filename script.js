/* global cloudprint */

var url = location.href
var title = document.title

// for (let i = 0; i < document.styleSheets.length; i++) {
//   try {
//     var sheet = document.styleSheets[i]
//     var rules = sheet.cssRules
//     console.log('looping through', sheet)
//     for (let j = 0; j < rules.length; j++) {
//       var rule = rules[j]
//       if (rule.condition) {
//         console.log(rule)
//       }
//     }
//   } catch (e) {
//     console.log('skipped', sheet)
//   }
// }

var gadget = new cloudprint.Gadget()
gadget.setPrintDocument('url', title, url)
gadget.openPrintDialog()

// function readable (url) {
//   return fetch('https://mercury.postlight.com/parser?url=' + url, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'x-api-key': 'LKyckVL4j7x9LtByAUD4LfCQ40M0VdSoXW0VW6W9'
//     }
//   })
//     .then(r => r.json())
//     .then(data => ({
//       title: data.title,
//       content: data.content
//     }))
// }
