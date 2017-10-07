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
	// ,
	// create: function () {
	// 	var tableHtmlElms = [];
	// 	var board = model.buildTableBody();
	// 	var tableCss = markup.cssHead(board);
	// 	var liveDisplay = tableHtmlElms.unshift(tableCss, board);
	// 	liveDisplay = tableHtmlElms.join('');
	// 	return liveDisplay;
	// }
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
		this.output(full);
	},
	output: function (content) {
		//output to iframe
		var doc = document.getElementById('live').contentWindow.document;
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
		destination.innerHTML = print;
	}
};
var markup = {
	start: '<table class="responsive-stacked-table with-mobile-labels" border="0" cellpadding="0" cellspacing="0"  style="width:100%;"><tr>',
	tableHead: function (headLabel, id) {
		return ('<th align="left" style="font-family: &#39;ClanPro-News&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:16px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border" id="head' + id + '" contenteditable>' + headLabel + "</th>");
	},
	tableBody: function (x, y, content) {
		return ('<td align="left" style="font-family: &#39;ClanPro-Book&#39;,&#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; color:#000000; font-size:14px; line-height:24px; padding:20px 3%; border:1px solid #e5e5e4;" class="border cedit" id="z' + y + x + '" contenteditable>' + content + '</td>');
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
$('#live').on('load', function () {
	$(this).contents().find('body').on('keyup', '.responsive-stacked-table', function (e) {
		view.updateHeadCss();
	});
});