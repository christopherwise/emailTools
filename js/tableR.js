//Refactoring tablejs
var model = {}
var controller = {
	getHoriztonal: function (x) {
		// get values
		var z = document.getElementById(x);
		var horizontal = z.value;
		return horizontal;
	},
	getVertical: function (y) {
		var p = document.getElementById(y);
		var vertical = p.value;
		return vertical;
	}
}
var view = {
	test: function (x) {
		return x
	}
}