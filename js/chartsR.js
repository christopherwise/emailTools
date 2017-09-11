//Refactoring chartjs
//mvc
//model
var model = {
		verticalBar: [],
		verticalComparison: [],
		horizontalBar: [],
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
	// add in markup for the actual graphs
	// create inputs for graph height as well as labels
	// build frontend ui