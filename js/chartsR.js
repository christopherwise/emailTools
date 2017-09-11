//Refactoring chartjs
//mvc
//model
var model = {
		activeChart: {
			type: '',
			maxCol: 0,
			numberOfBars: 0,
			containerWidth: 700
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
		viewChartTypes: function () { //select type of chart
			var list = this.chartOptions;
			for (var i = 0; i < list.length; i++) {
				console.log(list[i].type);
			}
		},
		barWidth: function () {
			width = this.activeChart.containerWidth;
			console.log(width);
			numberOfBars = this.activeChart.numberOfBars;
			console.log(numberOfBars);
			barWidth = (width - 28) / numberOfBars;
			barWidth = Math.floor(barWidth);
			console.log(barWidth);
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
			console.log(numberOfBars);
			model.activeChart.numberOfBars = numberOfBars;
		},
		setContainerWidth: function () {
			var width = $('#containerWidth').val();
			console.log(width);
			model.activeChart.containerWidth = width;
		},
		generate: function () {
			this.setContainerWidth();
			view.printActiveChart();
		}
	}
	//view
var view = {
	printActiveChart: function () {
		if (model.activeChart.type == '') {
			console.log('No chart selected!')
		} else {
			console.log('The chart selected is ' + model.activeChart.type + ' and it has ' + model.activeChart.maxCol + ' max columns. The entered container width is ' + model.activeChart.containerWidth + '.');
		}
	},
	resetActiveChart: function () {
		model.activeChart.type = '';
		model.activeChart.maxCol = 0;
		model.activeChart.numberOfBars = 0;
		model.activeChart.containerWidth = 0;
		this.printActiveChart();
		$('#chartPicker').val('');
	},
	barOptions: function () {
		var maxCol = model.activeChart.maxCol;
		console.log(maxCol);
		$('#numberOfBars').empty();
		for (var i = 0; i < maxCol; i++) {
			$('#numberOfBars').append($("<option></option>").attr('value', i + 1).text(i + 1));
		}
	}
}
var chartMarkup = {
		chartMarkup: {
			tableStart: '<table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:700px"> <tr> <td align="center"><table width="90%" height="240" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>',
			horizontalTableStart: '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; max-width: 700px; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed; width: 100%;"> <tr><td style="direction: ltr;">',
			tableStop: '</td> </tr> </table></td> </tr> </table> </td> </tr> </table>',
			bottomLine: '</td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0" class=""> <tr> <td height="1" width="100%" bgcolor="#c3c8c9" class="tronHr" style="background-color:#c3c8c9;font-size:1px;line-height:1px">&amp;nbsp;</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td align="center"> <table width="90%" height="20" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>',
			barChart: function (width, height, antiheight, topLabel) {
				return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0"  style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left;">' + topLabel + '</td> </tr> <tr> <td height="9" style="font-size:1px;line-height:1px">&nbsp;</td> </tr> <tr> <td height="' + height + '" class="animate" style="font-size:0px; line-height:0px; background-color:#cfedb5; background-color:%%=v(@chart_color)=%%;" bgcolor="%%=v(@chart_color)=%%">&amp;nbsp;</td> </tr></table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			verticalComparisonChart: function (width, height1, height2, antiheight1, antiheight2, topLabel1, topLabel2) {
				return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center" width="50%" style="width:50%"> <table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight1 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;">' + topLabel1 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height1 + '" class="animate" style="font-size:0;line-height:0;background-color:#cfedb5; background-color:%%=v(@chart_color)=%%;" bgcolor="%%=v(@chart_color)=%%">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table></td><td valign="bottom" align="center" width="50%" style="width:50%"><table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight2 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;">' + topLabel2 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height2 + '" class="animate" style="font-size:0;line-height:0;background-color:#d5d5d4;" bgcolor="#d5d5d4">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			horizontalChart: function (percentage, bottomLabel, topLabel) {
				return '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%"> <tr> <td width="15%" style="border-right:1px solid #c3c8c9; color:#000000;direction:ltr;font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:14px;line-height:28px;padding-top:15px;text-align:left;vertical-align:top; text-align:right; padding-right:5px; min-width:55px;" valign="top">' + bottomLabel + '</td> <td width="85%" style="direction:ltr;vertical-align:top" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;width:100%"> <tr> <td align="left" style="direction:ltr"><table style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:' + percentage + '%" class="bar"> <tr> <td align="left" style="direction:ltr;padding-bottom:15px;padding-left:0;padding-top:15px"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#cfedb5; background-color:%%=v(@chart_color)=%%; border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%" bgcolor="%%=v(@chart_color)=%%"> <tr> <td height="40" style="font-size:0;line-height:0;">&amp;nbsp;</td> </tr> </table></td> <td width="40" align="left" style="color:#717172;direction:ltr;font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif;font-size:16px;line-height:28px;padding-left:8px;padding-top:15px;text-align:left;vertical-align:top; max-width:40px;" valign="top">' + topLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table>'
			},
			bottomLabels: function (width, bottomLabel) {
				return '<td valign="top"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"> <table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"><tr><td><table width="' + width + '" style="width:100%" border="0" cellpadding="0" cellspacing="0" class="" align="left"> <tr> <td height="7" style="font-size:1px;line-height:1px"> </td> </tr> <tr> <td align="center" class="label" style="color: #000000; font-family: &#39;Helvetica Neue&#39;, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 28px; text-align:left;">' + bottomLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
			},
			chartSeperator: function () {
				return '</td> <td width="10%"><table width="100%" border="0" cellpadding="0" cellspacing="0" > <tr> <td>&nbsp;</td> </tr> </table></td>'
			}
		}
	}
	// add in markup for the actual graphs
	// create inputs for graph height as well as labels
	// build frontend ui