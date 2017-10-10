//Refactoring tablejs
var model = {
	activeTable: {
		horizontalNumber: 0,
		verticalNumber: 0
	},
	createHead: function () {
		//get values
		var horizontal = model.activeTable.horizontalNumber;
		var vertical = model.activeTable.verticalNumber;
		var headLabel;
		var tableH = [];
		for (var x = 1; x <= horizontal; x++) {
			// headLabel = document.getElementById('head' + x).value;
			var id = "#head";
			id = id + x;
			var headLabel = $("#live").contents().find(id).html();
			if (headLabel == null) {
				headLabel = "Edit here";
			}
			tableH += markup.tableHead(headLabel, x);
		}
		return tableH;
	},
	buildTableHead: function () {
		//add in the head
		var board = markup.start;
		board += this.createHead(board);
		return board;
	},
	buildTableBody: function () {
			//get values
			var horizontal = model.activeTable.horizontalNumber;
			var vertical = model.activeTable.verticalNumber;
			var end = (vertical - 1);
			tableBody = [];
			var board = "</tr><tr>";
			tableBody.push(board);
			// pull in table body
			for (var y = 0; y < vertical; y++) {
				for (var x = 0; x < horizontal; x++) {
					var id = '#z' + y + x;
					var content = $("#live").contents().find(id).html();
					if (content == null) {
						content = "";
					}
					console.log(id);
					console.log(content);
					tableBody += markup.tableBody(x, y, content);
				}
				if (y == end) {
					tableBody += "</tr>";
				} else if (y !== end) {
					tableBody += "</tr><tr>";
				}
			}
			tableBody += "</table>"
			return tableBody;
		}
};
var controller = {
	getvalue: function (x) {
		// get values
		var z = document.getElementById(x);
		var nowYouANumba = z.value - 0;
		return nowYouANumba;
	}
};
var view = {
	getInfo: function () {
		var horizontal = controller.getvalue("horizontalSelect");
		var vertical = controller.getvalue("verticalSelect");
		model.activeTable.horizontalNumber = horizontal;
		model.activeTable.verticalNumber = vertical;
		this.assemble();
	},
	assemble: function () {
		var full = "";
		var cssArray = [];
		var body;
		css = markup.cssHead();
		liveCss = '<style>' + css + '</style>'
		full = model.buildTableHead();
		body = model.buildTableBody();
		full += body;
		full = cssArray.unshift(liveCss, full);
		full = cssArray.join('')
		this.output(full, 'live');
		this.writeCode('htmlCode', full);
		view.alert("Click into the live table to edit the content", "success", 2000);;
	},
	output: function (content, id) {
		//output to iframe
		var doc = document.getElementById(id).contentWindow.document;
		doc.open();
		doc.write(content);
		doc.close();
	},
	updateHeadCss: function () {
		var css = markup.cssHead();
		liveCss = '<style>' + css + '</style>'
		var head = $("#live").contents().find("head");
		head.html(liveCss);
		this.writeCode('cssCode', css)
	},
	writeCode: function (id, print) {
		var destination = document.getElementById(id);
		print = print.replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/contenteditable=\"\"|contenteditable/g, '');
		destination.innerHTML = print;
	}
	,
	updateBodyHtml: function () {
		// remove content editable tags before printing final code
		var finalCode = $('#live').contents().find('body').html();
		finalCode = finalCode.replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/contenteditable=\"\"|contenteditable/g, '');
		// output to page
		this.writeCode('htmlCode', finalCode);
	},
	alert: function (message, type, closeDelay) {
		// function to  display alerts at the top of the page based on user input
		type = type || "info";
		// create the alert div
		var alert = $('<div class="alert alert-' + type + ' role="alert">').append($('<button type="button" class="close" data-dismiss="alert">').append("&times;")).append(message);
		// add the alert div to top of alerts-container, use append() to add to bottom
		$("#alerts-container").prepend(alert);
		// if closeDelay was passed - set a timeout to close the alert
		if (closeDelay) window.setTimeout(function () {
			alert.alert("close")
		}, closeDelay);
	}
};
var markup = {
	start: '<table class="responsive-stacked-table with-mobile-labels" border="0" cellpadding="0" cellspacing="0"  style="width:100%;"><tr>',
	tableHead: function (headLabel, id) {
		return ('<th align="left" style="font-family: &#39;ClanPro-News&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:16px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border" id="head' + id + '" contenteditable>' + headLabel + "</th>");
	},
	tableBody: function (x, y, content) {
		return ('<td align="left" style="font-family: &#39;ClanPro-Book&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:14px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border" id="z' + y + x + '" contenteditable>' + content + '</td>');
	},
	cssHead: function () {
		//get values
		var horizontal = controller.getvalue("horizontalSelect");
		//CSS to make responsive tables work
		var tableCss = "@media (max-width:450px){ .topTable{border:0!important;}th{display:none!important;} .border{border:none!important;padding:5px 2%!important;} .responsive-stacked-table thead{display:none;} .responsive-stacked-table td, .responsive-stacked-table th, .responsive-stacked-table tr{display:block;} .responsive-stacked-table td{border-top:none;} .responsive-stacked-table tr td:first-child{border-top:1px solid #ddd!important; font-weight:700; margin-top:10px; padding-top:20px !important;} .responsive-stacked-table.with-mobile-labels tr td:first-child{font-weight:300} .responsive-stacked-table.with-mobile-labels td:before{display:block;font-weight:700;}";
		for (var x = 1; x <= horizontal; x++) {
			// headLabel = document.getElementById('head' + x).value;
			var id = "#head";
			id = id + x;
			var headLabel = $("#live").contents().find(id).html();
			tableCss += ".responsive-stacked-table.with-mobile-labels td:nth-of-type(" + x + '):before { content:"' + headLabel + '"; font-family: &#39;ClanPro-News&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; font-size: 16px;}';
		}
		tableCss += "}";
		return tableCss;
	}
};
/* -- event listenrs -- */
//clipboard code
var clipboard2 = new Clipboard('.cssCopy');
clipboard2.on('success', function (e) {
	view.alert("CSS Successfully copied!", "success", 2000);
});
clipboard2.on('error', function (e) {
	view.alert("Something went wrong!", "danger", 2000);
});
var clipboard = new Clipboard('.htmlCopy');
clipboard.on('success', function (e) {
	view.alert("HTML Successfully copied!", "success", 2000);
});
clipboard.on('error', function (e) {
	view.alert("Something went wrong!", "danger", 2000);
});
clipboard.on('success', function (e) {
	console.log(e);
});
clipboard.on('error', function (e) {
	console.log(e);
});
//update
$('#live').on('load', function () {
	$(this).contents().find('body').on('keyup', '.responsive-stacked-table', function (e) {
		view.updateHeadCss();
		view.updateBodyHtml();
	});
});
//mobile preview
$(document).ready(function() {
  $("#mobileButton").click(function() {
    $("#live").addClass("mobileDiv").removeClass("desktopDiv");
    $("#mobileButton").parent().addClass("active");
    $("#desktopButton").parent().removeClass("active");
  });
});
$(document).ready(function() {
  $("#desktopButton").click(function() {
    $("#live").addClass("desktopDiv").removeClass("mobileDiv");
    $("#desktopButton").parent().addClass("active");
    $("#mobileButton").parent().removeClass("active");
  });
});