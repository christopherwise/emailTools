//Refactoring chartjs
//mvc
//model
var model = {
		activeChart: {
			type: '',
			maxCol: 0,
			numberOfBars: 0,
			containerWidth: 700,
			chartColor: '',
			chartCode: ''
		},
		chartOptions: [{
			type: "verticalBar",
			maxCol: 4
		}, {
			type: "verticalComparison",
			maxCol: 3
		}, {
			type: "horizontalBar",
			maxCol: 5
		}],
		barWidth: function () {
			// get Container width from active chart object
			width = this.activeChart.containerWidth;
			//set number of bars from active chart object
			numberOfBars = this.activeChart.numberOfBars;
			// calculations for bar size
			containerWidth = ((width) * .9);
			var spacers = numberOfBars - 1;
			var spacerWidth = containerWidth * .1;
			var barWidth = (containerWidth - (spacerWidth * spacers)) / numberOfBars;
			barWidth = Math.floor(barWidth);
			//return final width
			return barWidth;
		},
		build: function () {
			if (this.activeChart.type === 'verticalBar') {
				this.buildVerticalBar();
			} else if (this.activeChart.type === 'verticalComparison') {
				this.buildVerticalCompare();
			} else if (this.activeChart.type === 'horizontalBar') {
				this.buildHorizontalBar();
			}
		},
		buildBottom: function (codeArray) {
			var code = '';
			var barWidth = this.barWidth();
			// put a 10% spacer inbetween each bar
			code = codeArray.join(chartMarkup.chartMarkup.chartSeperator());
			// add table opening to top of chart
			code = chartMarkup.chartMarkup.tableStart(width) + code;
			// add bottom line
			code = code + chartMarkup.chartMarkup.bottomLine;
			codeArray = [];
			//build bottom labels
			for (var i = 1; i <= numberOfBars; i++) {
				var botLabel = 'type here!'
				codeArray.push(chartMarkup.chartMarkup.bottomLabels(barWidth, botLabel));
			};
			// put a 10% spacer inbetween each label
			code += codeArray.join(chartMarkup.chartMarkup.chartSeperator());
			//close table
			code = code + chartMarkup.chartMarkup.tableStop;
			// add code to active chart data object
			this.activeChart.chartCode = code;
			var finalCode = this.activeChart.chartCode;
			finalCode = finalCode.replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/contenteditable=\"\"|contenteditable/g, '');;
			$('#dump').html(finalCode);
			//output to iframe
			var doc = document.getElementById('live').contentWindow.document;
			doc.open();
			doc.write(this.activeChart.chartCode);
			doc.close();
			var $head = $("#live").contents().find("head");
			$head.append($("<style>" + chartMarkup.chartMarkup.cssCode + "</style>"));
			// show live preview
			$('.liveCol').removeClass('hide');
			view.alert("Click the labels to edit! The code will automatically update.", "success", 5000);
			view.jump('liveCol');
		},
		buildVerticalBar: function () {
			// on build, get latest input values
			handlers.getInputDataFromUi();
			// get data from active chart object
			var numberOfBars = this.activeChart.numberOfBars;
			var chartColor = this.activeChart.chartColor;
			var barWidth = this.barWidth();
			var codeArray = [];
			var code = '';
			var topDescLabel = 'type here!'
				// for loop for top of chart including top label, bars, and anti bar spacer
			for (var i = 1; i <= numberOfBars; i++) {
				chartHeight = $('#height' + i).val() * 2;
				antiHeight = 200 - chartHeight;
				codeArray.push(chartMarkup.chartMarkup.barChart(barWidth, chartHeight, antiHeight, chartColor, topDescLabel));
			};
			this.buildBottom(codeArray);
		},
		buildVerticalCompare: function () {
			// on build, get latest input values
			handlers.getInputDataFromUi();
			var numberOfBars = this.activeChart.numberOfBars;
			var chartColor = this.activeChart.chartColor;
			var barWidth = this.barWidth();
			var codeArray = [];
			var code = '';
			var topDescLabel = 'type here!'
				// for loop for top of chart including top label, bars, and anti bar spacer
			for (var i = 1; i <= numberOfBars; i++) {
				height1 = $('#height' + i).val() * 2;
				height2 = $('#height' + i + i).val() * 2;
				antiheight1 = 200 - height1;
				antiheight2 = 200 - height2;
				codeArray.push(chartMarkup.chartMarkup.verticalComparisonChart(barWidth, height1, height2, antiheight1, antiheight2, "Type Here!", "Type Here!", chartColor));
			};
			this.buildBottom(codeArray);
		},
		buildHorizontalBar: function () {
			// on build, get latest input values
			handlers.getInputDataFromUi();
			var numberOfBars = this.activeChart.numberOfBars;
			var chartColor = this.activeChart.chartColor;
			var barWidth = this.barWidth();
			var width = model.activeChart.containerWidth;
			var codeArray = [];
			var code = chartMarkup.chartMarkup.horizontalTableStart(width);
			var bottomLabel = 'type here!'
			var topLabel = '$xx'
				// for loop for top of chart including top label, bars, and anti bar spacer
			for (var i = 1; i <= numberOfBars; i++) {
				percentage = $('#height' + i).val();
				codeArray.push(chartMarkup.chartMarkup.horizontalChart(percentage, bottomLabel, topLabel, chartColor));
			};
			code += codeArray.join('');
			code += chartMarkup.chartMarkup.tableStop;
			// add code to active chart data object
			this.activeChart.chartCode = code;
			var finalCode = this.activeChart.chartCode;
			finalCode = finalCode.replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/contenteditable=\"\"|contenteditable/g, '');;
			$('#dump').html(finalCode);
			//output to iframe
			var doc = document.getElementById('live').contentWindow.document;
			doc.open();
			doc.write(this.activeChart.chartCode);
			doc.close();
			var $head = $("#live").contents().find("head");
			$head.append($("<style>" + chartMarkup.chartMarkup.cssCode + "</style>"));
			// show live preview
			$('.liveCol').removeClass('hide');
			view.alert("Click the labels to edit! The code will automatically update.", "success", 5000);
			view.jump('liveCol');
		},
		update: function () {
			// remove content editable tags before printing final code
			var finalCode = $('#live').contents().find('body').html();
			finalCode = finalCode.replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/contenteditable=\"\"|contenteditable/g, '');
			// output to page
			$('#dump').html(finalCode);
		},
		convertRGBA: function (rgb) {
			var orig = rgb;
			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			if (rgb) {
				return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
			} else return orig
		}
	}
	//controller
var handlers = {
		selectChartType: function () {
			// get chart selection from front end
			var chartSelection = $('#chartPicker').val();
			// get max number of charts from data object and set that value as max cols in data object
			var result = model.chartOptions.filter(function (obj) {
				return obj.type == chartSelection;
			})
			model.activeChart.type = result[0].type;
			model.activeChart.maxCol = result[0].maxCol;
			view.checkSelectionsEmpty();
			// add height input to page
			view.barOptions();
			handlers.selectBars()
		},
		selectBars: function () {
			// get number of bars from UI and write back to data object
			var numberOfBars = $('#numberOfBars').val();
			model.activeChart.numberOfBars = numberOfBars;
			//write back all inputs to data object
			this.getInputDataFromUi();
		},
		setContainerWidth: function () {
			// get container width values and write back to data object
			var width = $('#containerWidth').val();
			model.activeChart.containerWidth = width;
		},
		selectColor: function () {
			// get chart color and write back to data object
			var color = $('#colorPickerId').val();
			color = model.convertRGBA(color);
			model.activeChart.chartColor = color;
			$('#colorPickerId').val(color);
		},
		generate: function () {
			// get all inputs and send to
			this.getInputDataFromUi();
			var empty = view.checkSelectionsEmpty();
			if (empty === true) {
				// Show second column of inputs
				$('.inputCol, .buildCell').removeClass('hide');
				// remove submit button to reduce confusion
				$('#col1Submit').addClass('hide');
				view.jump('inputCol');
			}
		},
		getInputDataFromUi: function () {
			// run methods to get all inputs and write back to data source
			var empty = view.checkSelectionsEmpty();
			if (empty === true) {
				this.setContainerWidth();
				this.selectColor();
				var numberOfBars = $('.chartInputRow div').length;
				if (model.activeChart.numberOfBars == numberOfBars) {} else {
					var inputs = view.chartInputInsert();
					$('#chartInput').html(inputs);
				}
			} else {
				view.alert("Make sure to fill out all inputs!", "danger", 2000);
				return false
			}
		}
	}
	//view
var view = {
	checkSelectionsEmpty: function () {
		// check if selections have been made
		if (model.activeChart.type == '' || model.activeChart.numberOfBars === 0) {
			console.log('No chart selected!');
			return false;
		} else {
			return true;
		}
	},
	barOptions: function () {
		// dynamically add options to UI for number of bars based on chart selection
		var maxCol = model.activeChart.maxCol;
		$('#numberOfBars').empty();
		$('#numberOfBars').append("<option>Please Select</option>");
		for (var i = 1; i < maxCol; i++) {
			$('#numberOfBars').append($("<option></option>").attr('value', i + 1).text(i + 1));
		}
	},
	chartInputInsert: function () {
		// dynamically place inputs for height of chart based on number of bars selected
		var numberOfBars = model.activeChart.numberOfBars;
		if (model.activeChart.type === 'verticalBar' || model.activeChart.type === 'horizontalBar') {
			var htmlInputs = chartMarkup.chartMarkup.chartInputs(numberOfBars);
		} else if (model.activeChart.type === 'verticalComparison') {
			var htmlInputs = chartMarkup.chartMarkup.chartInputsCompare(numberOfBars);
		}
		return htmlInputs;
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
	},
	jump: function (h) {
		var top = document.getElementById(h).offsetTop;
		top = top - 50;
		window.scrollTo(0, top);
	}
}
var chartMarkup = {
		// Object holding all markup required to create the tables
		chartMarkup: {
			tableStart: function (width) {
				return '<table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px"> <tr> <td align="center"><table width="90%" height="240" border="0" cellpadding="0" cellspacing="0" class="wrap90" style="table-layout:fixed"> <tr>'
			},
			horizontalTableStart: function (width) {
				return '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; max-width: ' + width + 'px; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed; width: 100%;"> <tr><td style="direction: ltr;">'
			},
			tableStop: '</td> </tr> </table></td> </tr> </table> </td> </tr> </table>',
			bottomLine: '</td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0" class=""> <tr> <td height="1" width="100%" bgcolor="#c3c8c9" class="tronHr" style="background-color:#c3c8c9;font-size:1px;line-height:1px">&amp;nbsp;</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td align="center"> <table width="90%" height="20" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>',
			barChart: function (barWidth, height, antiheight, chartColor, topLabel) {
				return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + barWidth + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0"  style="max-width:' + barWidth + 'px" align="center"> <tr> <td valign="bottom" align="center"><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 28px; text-align:left;" contenteditable>' + topLabel + '</td> </tr> <tr> <td height="9" style="font-size:1px;line-height:1px">&nbsp;</td> </tr> <tr> <td height="' + height + '" class="animate" style="font-size:0px; line-height:0px; background-color:' + chartColor + ';" bgcolor="' + chartColor + '">&amp;nbsp;</td> </tr></table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			verticalComparisonChart: function (barWidth, height1, height2, antiheight1, antiheight2, topLabel1, topLabel2, chartColor) {
				return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + barWidth + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + barWidth + 'px" align="center"> <tr> <td valign="bottom" align="center" width="50%" style="width:50%"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight1 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;" contenteditable>' + topLabel1 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height1 + '" class="animate" style="font-size:0;line-height:0;background-color:' + chartColor + ';" bgcolor="' + chartColor + '">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table></td><td valign="bottom" align="center" width="50%" style="width:50%"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight2 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;" contenteditable>' + topLabel2 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height2 + '" class="animate" style="font-size:0;line-height:0;background-color:#d5d5d4;" bgcolor="#d5d5d4">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			horizontalChart: function (percentage, bottomLabel, topLabel, color) {
				return '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%"> <tr> <td width="15%" style="border-right:1px solid #c3c8c9; color:#000000;direction:ltr;font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:28px;padding-top:10px;text-align:left;vertical-align:top; text-align:right; padding-right:5px; min-width:55px;" valign="top" class="label" contenteditable>' + bottomLabel + '</td> <td width="85%" style="direction:ltr;vertical-align:top" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;width:100%"> <tr> <td align="left" style="direction:ltr"><table style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:' + percentage + '%" class="bar"> <tr> <td align="left" style="direction:ltr;padding-bottom:15px;padding-left:0;padding-top:15px"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:' + color + '; border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%" bgcolor="' + color + '"> <tr> <td height="40" style="font-size:0;line-height:0;">&amp;nbsp;</td> </tr> </table></td> <td width="40" align="left" style="color:#717172;direction:ltr;font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:16px;line-height:28px;padding-left:8px;padding-top:20px;text-align:left;vertical-align:top; max-width:40px;" valign="top" class="label" contenteditable>' + topLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table>'
			},
			bottomLabels: function (width, bottomLabel) {
				return '<td valign="top"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"> <table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"><tr><td><table width="' + width + '" style="width:100%" border="0" cellpadding="0" cellspacing="0" class="" align="left"> <tr> <td height="7" style="font-size:1px;line-height:1px"> </td> </tr> <tr> <td align="center" class="labelBot" style="color: #000000; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 28px; text-align:left;" contenteditable>' + bottomLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			chartSeperator: function () {
				return '</td> <td width="10%"><table width="100%" border="0" cellpadding="0" cellspacing="0" > <tr> <td>&nbsp;</td> </tr> </table></td>'
			},
			chartInputs: function (numberOfBars) {
				var inject = "<p>Enter a value for each chart between 1 and 100. This will correspond to the height of the chart.</p>";
				for (var i = 1; i <= numberOfBars; i++) {
					inject += '<div class="row chartInputRow"><div class="col inputCol"><label for="height' + i + '">Bar # ' + i + ' </label><br><input type="number" name="percentage" id="height' + i + '" placeholder="Enter bar height" value="" min="1" max="100"></div></div>'
				}
				return inject;
			},
			chartInputsCompare: function (numberOfBars) {
				var inject = "<p>Enter a value for each chart between 1 and 100. This will correspond to the height of the chart.</p>";
				for (var i = 1; i <= numberOfBars; i++) {
					inject += '<div class="row chartInputRow"><div class="col inputCol"><label for="height' + i + '">Group ' + i + ' </label><br><input type="number" name="percentage" class="sideInputs" id="height' + i + '" placeholder="Enter bar height" value="" min="1" max="100"><input type="number" name="percentage" class="sideInputs" id="height' + i + i + '" placeholder="Enter bar height" value="" min="1" max="100"></div></div>'
				}
				return inject;
			},
			cssCode: '.bar{-moz-animation:animate-bar 3s linear;-webkit-animation:animate-bar 3s linear;-ms-animation:animate-bar 3s linear;-o-animation:animate-bar 3s linear;animation:animate-bar 3s linear}@-moz-keyframes animate-bar{0%{width:0}}@-webkit-keyframes animate-bar{0%{width:0}}@-ms-keyframes animate-bar{0%{width:0}}@-o-keyframes animate-bar{0%{width:0}}@keyframes animate-bar{0%{width:0}}.animate{-webkit-animation:animate-height;-moz-animation:animate-height;animation:animate-height;animation-duration:3s;-webkit-animation-duration:3s;-moz-animation-duration:3s;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}@-webkit-keyframes animate-height{0%{height:0}100%{visibility:visible}}@-moz-keyframes animate-height{0%{height:0}100%{visibility:visible}}@keyframes animate-height{0%{height:0}100%{visibility:visible}}'
		}
	}
	/* -- event listenrs -- */
	//Check percentage inputs if over 100
$('#chartInput').on('keyup', '[id^=height]', function () {
	var numberOfBars = model.activeChart.numberOfBars;
	for (var i = 1; i <= numberOfBars; i++) {
		var perc = $('#height' + i);
		var percVal = perc.val();
		if (percVal > 100) {
			view.alert("Please enter value between 1 and 100.", 'danger', 3000);
			perc.val('');
			console.log(percVal);
		}
	}
});
//monitor keystrokes and auto update code when typing labels
$('#live').on('load', function () {
	$(this).contents().find('.wrap90').one('focus', '[class^=label]', function (e) {
		$(this).html('');
	});
	$(this).contents().find('body').on('keyup', '[class^=label]', function (e) {
		model.update();
	});
});
// color picker
$(function () {
	$('#colorPicker').colorpicker({
		color: '#17a2b8'
	}).on('changeColor', function (e) {
		$('.buildBtn')[0].style.backgroundColor = e.color.toString('rgba');
		$('.buildBtn')[0].style.borderColor = e.color.toString('rgba');
	});;
});
//clipboard code
var clipboard = new Clipboard('.htmlCopy');
clipboard.on('success', function (e) {
	view.alert("HTML Successfully copied!", "success", 2000);
});
clipboard.on('error', function (e) {
	view.alert("Something went wrong!", "danger", 2000);
});
var clipboard2 = new Clipboard('.cssCopy');
clipboard2.on('success', function (e) {
	view.alert("CSS Successfully copied!", "success", 2000);
});
clipboard2.on('error', function (e) {
	view.alert("Something went wrong!", "danger", 2000);
});