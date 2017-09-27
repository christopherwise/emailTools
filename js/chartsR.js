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
			width = this.activeChart.containerWidth;
			numberOfBars = this.activeChart.numberOfBars;
			containerWidth = ((width) * .9);
			var spacers = numberOfBars - 1;
			var spacerWidth = containerWidth * .1;
			var barWidth = (containerWidth - (spacerWidth * spacers)) / numberOfBars;
			barWidth = Math.floor(barWidth);
			return barWidth;
		},
		buildVerticalBar: function () {
			handlers.updateGenerate();
			var width = this.activeChart.containerWidth;
			var codeArray = [];
			var code = '';
			var numberOfBars = this.activeChart.numberOfBars;
			var barWidth = this.barWidth();
			var topDescLabel = 'type here top!'
			var chartColor = this.activeChart.chartColor;
			// for loop for top of chart including top label, actualy chart, and anti height spacer
			for (var i = 1; i <= numberOfBars; i++) {
				chartHeight = $('#height' + i).val() * 2;
				antiHeight = 200 - chartHeight;
				codeArray.push(chartMarkup.chartMarkup.barChart(barWidth, chartHeight, antiHeight, chartColor, topDescLabel));
			};
			code = codeArray.join(chartMarkup.chartMarkup.chartSeperator());
			code = chartMarkup.chartMarkup.tableStart(width) + code;
			code = code + chartMarkup.chartMarkup.bottomLine;
			codeArray = [];
			for (var i = 1; i <= numberOfBars; i++) {
				var botLabel = 'type here!'
				codeArray.push(chartMarkup.chartMarkup.bottomLabels(barWidth, botLabel));
			};
			code += codeArray.join(chartMarkup.chartMarkup.chartSeperator());
			code = code + chartMarkup.chartMarkup.tableStop;
			this.activeChart.chartCode = code;
			$('#dump').html(this.activeChart.chartCode);
			//output to iframe
			var doc = document.getElementById('live').contentWindow.document;
			doc.open();
			doc.write(this.activeChart.chartCode);
			doc.close();
			$('.liveCol').removeClass('hide');
			view.alert("Click the labels to edit! The code will automatically update.", "success", 5000);
		},
		update: function () {
			var finalCode = $('#live').contents().find('body').html();
			finalCode = model.replaceAll(finalCode, 'contenteditable=""', '')
			$('#dump').html(finalCode);
		},
		replaceAll: function (str, find, replace) {
			return str.replace(new RegExp(find, 'g'), replace);
		}
	}
	//controller
var handlers = {
		selectChartType: function () {
			var chartSelection = $('#chartPicker').val();
			var result = model.chartOptions.filter(function (obj) {
				return obj.type == chartSelection;
			})
			model.activeChart.type = result[0].type;
			model.activeChart.maxCol = result[0].maxCol;
			view.printActiveChart();
			view.barOptions();
		},
		selectBars: function () {
			var numberOfBars = $('#numberOfBars').val();
			model.activeChart.numberOfBars = numberOfBars;
			this.updateGenerate();
		},
		setContainerWidth: function () {
			var width = $('#containerWidth').val();
			model.activeChart.containerWidth = width;
		},
		selectColor: function () {
			var color = $('#colorPickerId').val();
			model.activeChart.chartColor = color;
			$('.panel-title').css("background-color", color);
		},
		generate: function () {
			var empty = view.printActiveChart();
			if (empty === true) {
				this.setContainerWidth();
				this.selectColor();
				var numberOfBars = $('.chartInputRow div').length;
				if (model.activeChart.numberOfBars == numberOfBars) {} else {
					var inputs = view.chartInputInsert();
				}
				$('.inputCol').removeClass('hide');
				$('#col1Submit').addClass('hide');
				$('#chartInput').html(inputs);
			} else {
				view.alert("Make sure to fill out all inputs!", "danger", 2000);
			}
		},
		updateGenerate: function () {
			var empty = view.printActiveChart();
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
			}
		}
	}
	//view
var view = {
	printActiveChart: function () {
		if (model.activeChart.type == '' || model.activeChart.numberOfBars === 0) {
			console.log('No chart selected!');
			return false;
		} else {
			return true;
		}
	},
	/*resetActiveChart: function () {
		model.activeChart.type = '';
		model.activeChart.maxCol = 0;
		model.activeChart.numberOfBars = 0;
		model.activeChart.containerWidth = 0;
		this.printActiveChart();
		$('#chartPicker').val('');
	},*/
	barOptions: function () {
		var maxCol = model.activeChart.maxCol;
		$('#numberOfBars').empty();
		$('#numberOfBars').append("<option>Please Select</option>");
		for (var i = 1; i < maxCol; i++) {
			$('#numberOfBars').append($("<option></option>").attr('value', i + 1).text(i + 1));
		}
	},
	chartInputInsert: function () {
		var numberOfBars = model.activeChart.numberOfBars;
		var htmlInputs = chartMarkup.chartMarkup.chartInputs(numberOfBars);
		return htmlInputs;
	},
	alert: function (message, type, closeDelay) {
		// default to alert-info; other options include success, warning, danger
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
}
var chartMarkup = {
		chartMarkup: {
			tableStart: function (width) {
				return '<table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px"> <tr> <td align="center"><table width="90%" height="240" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>'
			},
			horizontalTableStart: '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; max-width: 700px; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed; width: 100%;"> <tr><td style="direction: ltr;">',
			tableStop: '</td> </tr> </table></td> </tr> </table> </td> </tr> </table>',
			bottomLine: '</td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0" class=""> <tr> <td height="1" width="100%" bgcolor="#c3c8c9" class="tronHr" style="background-color:#c3c8c9;font-size:1px;line-height:1px">&amp;nbsp;</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td align="center"> <table width="90%" height="20" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>',
			barChart: function (width, height, antiheight, chartColor, topLabel) {
				return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0"  style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left;" contenteditable>' + topLabel + '</td> </tr> <tr> <td height="9" style="font-size:1px;line-height:1px">&nbsp;</td> </tr> <tr> <td height="' + height + '" class="animate" style="font-size:0px; line-height:0px; background-color:' + chartColor + ';" bgcolor="' + chartColor + '">&amp;nbsp;</td> </tr></table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			verticalComparisonChart: function (width, height1, height2, antiheight1, antiheight2, topLabel1, topLabel2) {
				return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center" width="50%" style="width:50%"> <table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight1 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;">' + topLabel1 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height1 + '" class="animate" style="font-size:0;line-height:0;background-color:#cfedb5;" bgcolor="#cfedb5">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table></td><td valign="bottom" align="center" width="50%" style="width:50%"><table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight2 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;">' + topLabel2 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height2 + '" class="animate" style="font-size:0;line-height:0;background-color:#d5d5d4;" bgcolor="#d5d5d4">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			horizontalChart: function (percentage, bottomLabel, topLabel) {
				return '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%"> <tr> <td width="15%" style="border-right:1px solid #c3c8c9; color:#000000;direction:ltr;font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:28px;padding-top:15px;text-align:left;vertical-align:top; text-align:right; padding-right:5px; min-width:55px;" valign="top">' + bottomLabel + '</td> <td width="85%" style="direction:ltr;vertical-align:top" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;width:100%"> <tr> <td align="left" style="direction:ltr"><table style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:' + percentage + '%" class="bar"> <tr> <td align="left" style="direction:ltr;padding-bottom:15px;padding-left:0;padding-top:15px"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#cfedb5; border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%" bgcolor="#cfedb5"> <tr> <td height="40" style="font-size:0;line-height:0;">&amp;nbsp;</td> </tr> </table></td> <td width="40" align="left" style="color:#717172;direction:ltr;font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:16px;line-height:28px;padding-left:8px;padding-top:15px;text-align:left;vertical-align:top; max-width:40px;" valign="top">' + topLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table>'
			},
			bottomLabels: function (width, bottomLabel) {
				return '<td valign="top"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"> <table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"><tr><td><table width="' + width + '" style="width:100%" border="0" cellpadding="0" cellspacing="0" class="" align="left"> <tr> <td height="7" style="font-size:1px;line-height:1px"> </td> </tr> <tr> <td align="center" class="labelBot" style="color: #000000; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 28px; text-align:left;" contenteditable>' + bottomLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			chartSeperator: function () {
				return '</td> <td width="10%"><table width="100%" border="0" cellpadding="0" cellspacing="0" > <tr> <td>&nbsp;</td> </tr> </table></td>'
			},
			chartInputs: function (numberOfBars) {
				var inject = "<p>Enter a value for each chart between 1 and 100. This will corespond to the height of the chart.";
				for (var i = 1; i <= numberOfBars; i++) {
					inject += '<div class="row chartInputRow"><div class="col inputCol"><span>Bar # ' + i + ' </span><input type="number" name="percentage" id="height' + i + '" placeholder="Enter bar height" value="" min="1" max="100"></div></div>'
				}
				return inject;
			}
		}
	}
	//  event listenrs
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
//monitor keystrokes and auto update code when typing
$('#live').on('load', function () {
	$(this).contents().find('table').one('click', '[class^=label]', function (e) {
		$(this).html('');
	});
	$(this).contents().find('body').on('keyup', '[class^=label]', function (e) {
		model.update();
	});
});
// color picker
$(function () {
	$('#colorPicker').colorpicker();
});
// add in markup for the actual graphs
// build frontend ui