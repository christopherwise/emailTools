//Set locations on page
var horz = "horizontalSelect";
var vertz = "verticalSelect";

function locationHorz(x) {
  'use strict'
  // get values
  var z = document.getElementById(x);
  return z.value;
}

function locationVert(y) {
  var p = document.getElementById(y);
return  p.value;
}

//start the table HTML
var start = '<table class="responsive-stacked-table with-mobile-labels" border="0" cellpadding="0" cellspacing="0"  style="width:100%;"><tr>'
  //Table head
function tableHead(headLabel, id) {
  return '<th align="left" style="font-family: &#39;ClanPro-News&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:16px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border" id="head' + id + '" contenteditable>' + headLabel + '</th>'

}

// Create the stylesheet for the table
function cssHead() {
  //get values
  var horizontal = locationHorz(horz);
  //CSS to make responsive tables work
  var tableCss = '<style> @media (max-width:450px){ .topTable{border:0!important;}th{display:none!important;} .border{border:none!important;padding:5px 2%!important;} .responsive-stacked-table thead{display:none;} .responsive-stacked-table td, .responsive-stacked-table th, .responsive-stacked-table tr{display:block;} .responsive-stacked-table td{border-top:none;} .responsive-stacked-table tr td:first-child{border-top:1px solid #ddd!important; font-weight:700; margin-top:10px; padding-top:20px !important;} .responsive-stacked-table.with-mobile-labels tr td:first-child{font-weight:300} .responsive-stacked-table.with-mobile-labels td:before{display:block;font-weight:700;}'

  for (var x = 1; x <= horizontal; x++) {
    // headLabel = document.getElementById('head' + x).value;
    var id = "#head"
    id = id + x
    var headLabel = $('#output').contents().find(id).html();
    tableCss += '.responsive-stacked-table.with-mobile-labels td:nth-of-type(' + x + '):before { content:"' + headLabel + '"; font-family: &#39;ClanPro-News&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; font-size: 16px;}';
  }
  tableCss += '} </style>'
  return tableCss;
}

// create the <th> for the table
function th(tableH) {
  //get values
  var horizontal = locationHorz(horz);
  var vertical = locationVert(vertz);
  var headLabel;
  var tableH = [];

  for (var x = 1; x <= horizontal; x++) {
    // headLabel = document.getElementById('head' + x).value;
    var id = "#head"
    id = id + x
    var headLabel = $('#output').contents().find(id).html();
    if (headLabel == null){
    headLabel = "Edit here"
    }
    tableH += tableHead(headLabel, x);
  }
  return tableH;
}

// Creates the code for the table
function tableBuild() {
  //get values
  var horizontal = locationHorz(horz);
  var vertical = locationVert(vertz);
  var end = (vertical - 1);
  var overWrite = "";
  // start table
  var board = start;
  //add in the head
  board += th(board);

  board += "</tr><tr>";
  // pull in table body
  for (var y = 0; y < vertical; y++) {
    for (var x = 0; x < horizontal; x++) {

      board += '<td align="left" style="font-family: &#39;ClanPro-Book&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:14px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border cedit" id="z' + y + x + '" contenteditable>' + overWrite + '</td>'
    }
    if (y == end) {
      board += "</tr>";
    } else if (y !== end) {
      board += "</tr><tr>";
    }
  }
  board += "</table>"
  return board;
}

function update() {
  //get values
  var horizontal = locationHorz(horz);
  var vertical = locationVert(vertz);
  var end = (vertical - 1);

  // start table
  var board = start;
  //add in the head
  board += th(board);
  board += "</tr><tr>";
  // pull in table body
  for (var y = 0; y < vertical; y++) {
    for (var x = 0; x < horizontal; x++) {

      var id = "#z"
      id = id + y + x
      var updateContent = $('#output').contents().find(id).html();

      board += '<td align="left" style="font-family: &#39;ClanPro-Book&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:14px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border" id="z' + y + x + '"contenteditable>' + updateContent + '</td>'
    }
    if (y == end) {
      board += "</tr>";
    } else if (y !== end) {
      board += "</tr><tr>";
    }
  }
  board += "</table>"
  return board;
}

function rebuild() {
  var tableHtmlElms = [];
  var board = tableBuild();
  var tableCss = cssHead(board);

  var liveDisplay = tableHtmlElms.unshift(board);
  liveDisplay = tableHtmlElms.join('');

  //output to iframe
  var doc = document.getElementById('output').contentWindow.document;
  doc.open();
  doc.write(liveDisplay);
  doc.close();
  document.getElementById("livePrev").style.display = 'inline-block';
  document.getElementById("codePrev").style.display = 'block';
  document.getElementById("updateBtn").style.display = 'block';
}

function updateCode() {
  var tableHtmlElms = [];
  var board = update();
  var tableCss = cssHead(board);

   var liveDisplay = tableHtmlElms.unshift(board);
  liveDisplay = tableHtmlElms.join('');
  var doc = document.getElementById('output').contentWindow.document;
  doc.open();
  doc.write(liveDisplay);
  doc.close();

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  var boardCode = replaceAll(board, 'contenteditable', '')
  boardCode = boardCode.replace(/\</g, '&lt;');
  var cssCode = tableCss.replace(/\</g, '&lt;');
  var finalCode = boardCode;
  document.getElementById("code").innerHTML = finalCode;

}

//clipboard code
var clipboard = new Clipboard('#cssButton');
var clipboard2 = new Clipboard('#htmlButton');
clipboard.on('success', function(e) {
  console.log(e);
});
clipboard.on('error', function(e) {
  console.log(e);
});
//mobile preview
$(document).ready(function() {
  $("#mobileButton").click(function() {
    $("#output").addClass("mobileDiv").removeClass("desktopDiv");
    $("#mobileButton").parent().addClass("activeF");
    $("#desktopButton").parent().removeClass("activeF");
  });
});
$(document).ready(function() {
  $("#desktopButton").click(function() {
    $("#output").addClass("desktopDiv").removeClass("mobileDiv");
    $("#desktopButton").parent().addClass("activeF");
    $("#mobileButton").parent().removeClass("activeF");
  });
});