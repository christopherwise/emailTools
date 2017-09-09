var numberOfCharts = document.getElementById('chartNum');
var chartNumberValue;
var chartz = "";
var codeBlock = "";
var horCodeBlock = "";
var topLabel = "";
var chartWidth;
var output = document.getElementById('print');

var whichChartShouldIPick = "";
var colOptions;
/*
function that runs onclick for radio button selections.
First get value of radio button.
Then set value for radio button selection.
Then create and input options for dropdown depending on selection
*/
function setChart(e) {
  whichChartShouldIPick = e.target.value;
  if (whichChartShouldIPick === "vertBar") {
    colOptions = 4;
  } else if (whichChartShouldIPick === "compBar") {
    colOptions = 3;
  } else if (whichChartShouldIPick === "horBar") {
    colOptions = 5;
  }
  var select = document.getElementById('chartNum');
  var numberOfCol = "";
  numberOfCol += "<option>Please Select</option>";
  for (var i = 2; i <= colOptions; i++) {
    numberOfCol += '<option value="' + i + '">' + i + '</option>';
  };
  select.innerHTML = numberOfCol;
}
//clipboard code
var clipboard = new Clipboard('#clip');
clipboard.on('success', function(e) {
  console.log(e);
});
clipboard.on('error', function(e) {
  console.log(e);
});
//open table code
var start = '<table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td align="center"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:700px"> <tr> <td align="center"><table width="90%" height="240" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>';
var horStart = '<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: none; border-collapse: collapse; border-spacing: 0; max-width: 700px; mso-table-lspace: 0; mso-table-rspace: 0; width: 100%;"> <tr> <td align="center" style="direction: ltr;"><table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border: none; border-collapse: collapse; border-spacing: 0; mso-table-lspace: 0; mso-table-rspace: 0; table-layout: fixed; width: 100%;"> <tr><td style="direction: ltr;">'
var stop = '</td> </tr> </table></td> </tr> </table> </td> </tr> </table>';
var line = '</td> </tr> </table></td> </tr> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td><table width="100%" border="0" cellpadding="0" cellspacing="0" class=""> <tr> <td height="1" width="100%" bgcolor="#c3c8c9" class="tronHr" style="background-color:#c3c8c9;font-size:1px;line-height:1px">&amp;nbsp;</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td align="center"> <table width="90%" height="20" border="0" cellpadding="0" cellspacing="0" class="" style="table-layout:fixed"> <tr>';

function chart(width, height, antiheight, topLabel) {
  return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0"  style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"><table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;ClanPro-News&#39;, &#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left;">' + topLabel + '</td> </tr> <tr> <td height="9" style="font-size:1px;line-height:1px">&nbsp;</td> </tr> <tr> <td height="' + height + '" class="animate" style="font-size:0px; line-height:0px; background-color:#cfedb5; background-color:%%=v(@chart_color)=%%;" bgcolor="%%=v(@chart_color)=%%">&amp;nbsp;</td> </tr></table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
}

function compChart(width, height1, height2, antiheight1, antiheight2, topLabel1, topLabel2) {
  return '<td valign="bottom"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center" width="50%" style="width:50%"> <table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight1 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;ClanPro-News&#39;, &#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;">' + topLabel1 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height1 + '" class="animate" style="font-size:0;line-height:0;background-color:#cfedb5; background-color:%%=v(@chart_color)=%%;" bgcolor="%%=v(@chart_color)=%%">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table></td><td valign="bottom" align="center" width="50%" style="width:50%"><table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="width:100%" align="left"> <tr> <td> <table width="100%" border="0" cellpadding="0" cellspacing="0"> <tr> <td height="' + antiheight2 + '" style="font-size:0px; line-height:0px;">&nbsp;</td> </tr> </table> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td align="left" valign="bottom"><table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"> <tr> <td align="center" class="label" style="color: #717172; font-family: &#39;ClanPro-News&#39;, &#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 28px; text-align:left; padding-left:3px;">' + topLabel2 + '</td> </tr> <tr> <td height="7" style="font-size:1px;line-height:1px"></td> </tr> <tr> <td height="' + height2 + '" class="animate" style="font-size:0;line-height:0;background-color:#d5d5d4;" bgcolor="#d5d5d4">&amp;nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
}

function horChart(percentage, bottomLabel, topLabel) {
  return '<table width="100%" border="0" cellpadding="0" cellspacing="0" class="" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%"> <tr> <td width="15%" style="border-right:1px solid #c3c8c9; color:#000000;direction:ltr;font-family:&#39;ClanPro-Book&#39;,&#39;HelveticaNeue-Light&#39;,&#39;Helvetica Neue Light&#39;,Helvetica,Arial,sans-serif;font-size:14px;line-height:28px;padding-top:15px;text-align:left;vertical-align:top; text-align:right; padding-right:5px; min-width:55px;" valign="top">' + bottomLabel + '</td> <td width="85%" style="direction:ltr;vertical-align:top" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="left" style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;table-layout:fixed;width:100%"> <tr> <td align="left" style="direction:ltr"><table style="border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:' + percentage + '%" class="bar"> <tr> <td align="left" style="direction:ltr;padding-bottom:15px;padding-left:0;padding-top:15px"><table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#cfedb5; background-color:%%=v(@chart_color)=%%; border:0;border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;width:100%" bgcolor="%%=v(@chart_color)=%%"> <tr> <td height="40" style="font-size:0;line-height:0;">&amp;nbsp;</td> </tr> </table></td> <td width="40" align="left" style="color:#717172;direction:ltr;font-family:&#39;ClanPro-News&#39;,&#39;HelveticaNeue-Light&#39;,&#39;Helvetica Neue Light&#39;,Helvetica,Arial,sans-serif;font-size:16px;line-height:28px;padding-left:8px;padding-top:15px;text-align:left;vertical-align:top; max-width:40px;" valign="top">' + topLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table>'
}

function bottomLabel(width, bottomLabel) {
  return '<td valign="top"><!--[if (gte mso 9)|(IE)]> <table width="' + width + '" align="center" cellpadding="0" cellspacing="0" border="0"> <tr> <td> <![endif]--> <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:' + width + 'px" align="center"> <tr> <td valign="bottom" align="center"> <table width="100%" cellpadding="0" cellspacing="0" border="0" class="chartWidth" style="width:100%"><tr><td><table width="' + width + '" style="width:100%" border="0" cellpadding="0" cellspacing="0" class="" align="left"> <tr> <td height="7" style="font-size:1px;line-height:1px"> </td> </tr> <tr> <td align="center" class="label" style="color: #000000; font-family: &#39;ClanPro-Book&#39;, &#39;HelveticaNeue-Light&#39;, &#39;Helvetica Neue Light&#39;, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 28px; text-align:left;">' + bottomLabel + '</td> </tr> </table></td> </tr> </table></td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]-->'
}
var copyButton = "<button class=&quot;btn button example&quot; >Copy</button>"

function space() {
  return '</td> <td width="10%"><table width="100%" border="0" cellpadding="0" cellspacing="0" > <tr> <td>&nbsp;</td> </tr> </table></td>'
}
// Depending on number of Charts Selected this will create inputs for chart values
function colSelect() {
  var chartNumberValue = numberOfCharts.value;
  var chartNumberValueTop;
  // check to see if comparison is picked. If so double the bars and top labels
  if (whichChartShouldIPick === "compBar") {
    chartNumberValueTop = chartNumberValue * 2
  } else {
    chartNumberValueTop = chartNumberValue
  }

  var inputHeight = "";
  var topLabel = "";
  var bottomLabel = "";
  var percentLabel = "<label class=&quot;label&quot;>Percentage (1 - 100)</label>";
  var topDescriptionLabel = "<label class=&quot;label&quot;>Top Label</label>";
  var bottomDescriptionLabel = "<label class=&quot;label&quot;>Bottom Label</label>"
    // input for height and top label
  for (var i = 1; i <= chartNumberValueTop; i++) {
    inputHeight += '<input class="text-input" type="number" min="1" max="100" id="height' + i + '" placeholder="Percentage for bar ' + i + '">' + '<br>';
    topLabel += '<input class="text-input" type="text" id="topLabel' + i + '" placeholder="Top label for ' + i + '">' + '<br>';
  }
  // input for bottom label
  for (var i = 1; i <= chartNumberValue; i++) {
    bottomLabel += '<input class="text-input" type="text" id="bottomLabel' + i + '" placeholder="Bottom label for ' + i + '">' + '<br>';
  }

  bottomDescLabel.innerHTML = bottomDescriptionLabel;
  topDescLabel.innerHTML = topDescriptionLabel;
  perLabel.innerHTML = percentLabel;
  heightDiv.innerHTML = inputHeight;
  topLabelDiv.innerHTML = topLabel;
  bottomLabelDiv.innerHTML = bottomLabel;
}

// validation function to make sure percentage value is between 1 anmd 100
function validateNumber(min, max, value) {
  return value <= max && value >= min;
}

function validateForm() {
  var chartNumberValue = numberOfCharts.value;
  for (var i = 1; i <= chartNumberValue; i++) {
    chartHeight = +document.getElementById('height' + i).value;
    if (!validateNumber(0, 100, chartHeight)) {
      alert('Please enter a number from 1 - 100');
    }
  }
}
// Creates the magic
function gen() {
  var chartHeight = "";
  var percentage = "";
  var chartHeight2 = "";
  var antiHeight = "";
  var antiHeight2 = "";
  var topDescLabel = "";
  var topDescLabel2 = "";
  var bLabel = "";
  var chartWidth;
  var chartNumberValue;
  var copyButton = document.getElementById('copyBtn');
  //validate that percentage entered is between 1 and 100
  validateForm();

  chartNumberValue = numberOfCharts.value;
  if (chartNumberValue == 2) {
    chartWidth = 270;
  } else if (chartNumberValue == 3) {
    chartWidth = 159;
  } else if (chartNumberValue == 4) {
    chartWidth = 106;
  }
  //start table html
  var chartHtmlElms = [];
  var chartHtmlElms2 = [];

  if (whichChartShouldIPick === "vertBar") {
    codeBlock = start;
    // for loop for top of chart including top label, actualy chart, and anti height spacer
    for (var i = 1; i <= chartNumberValue; i++) {
      chartHeight = document.getElementById('height' + i).value;
      topDescLabel = document.getElementById('topLabel' + i).value;
      chartHeight = chartHeight * 2;
      antiHeight = 200 - chartHeight;
      chartHtmlElms.push(chart(chartWidth, chartHeight, antiHeight, topDescLabel));
    }
  } else if (whichChartShouldIPick === "compBar") {
    //start html block
    codeBlock = start;
    var compBarCounter;
    compBarCounter = chartNumberValue * 2;
    for (var i = 1; i <= compBarCounter; i += 2) {
      chartHeight = document.getElementById('height' + i).value;
      chartHeight2 = document.getElementById('height' + (i + 1)).value;
      topDescLabel = document.getElementById('topLabel' + i).value;
      topDescLabel2 = document.getElementById('topLabel' + (i + 1)).value;
      chartHeight = chartHeight * 2;
      chartHeight2 = chartHeight2 * 2;
      antiHeight = 200 - chartHeight;
      antiHeight2 = 200 - chartHeight2;
      chartHtmlElms.push(compChart(chartWidth, chartHeight, chartHeight2, antiHeight, antiHeight2, topDescLabel, topDescLabel2));
    }
  } else if (whichChartShouldIPick === "horBar") {
    horCodeBlock = horStart;

    for (var i = 1; i <= chartNumberValue; i++) {
      percentage = document.getElementById('height' + i).value;
      topDescLabel = document.getElementById('topLabel' + i).value;
      bLabel = document.getElementById('bottomLabel' + i).value;
      chartHtmlElms.push(horChart(percentage, bLabel, topDescLabel));
    }
    //join all elements in array to one string
    horCodeBlock += chartHtmlElms.join('');
    horCodeBlock += stop;
  }
  //take all elements of array and join with Space function inbetween
  codeBlock += chartHtmlElms.join(space());
  //add in line below charts and above labels
  codeBlock += line;
  //loop through bottom labels
  for (var i = 1; i <= chartNumberValue; i++) {
    var bottomLabel2 = document.getElementById('bottomLabel' + i).value;
    chartHtmlElms2.push(bottomLabel(chartWidth, bottomLabel2));
  }
  //take all elements of array and join with Space function inbetween
  codeBlock += chartHtmlElms2.join(space());
  //add in the end html for chart
  codeBlock += stop;

  //output live preview to page
  if (whichChartShouldIPick === "horBar") {
    output.innerHTML = horCodeBlock;
  } else {
    output.innerHTML = codeBlock;
  }
  //out put code to page
  if (whichChartShouldIPick === "horBar") {
    var exportCodeBlock = horCodeBlock.replace(/\</g, '&lt;');
    code.innerHTML = exportCodeBlock;
  } else {
    code.innerHTML = codeBlock.replace(/\</g, '&lt;');
  }

  //change button / headers to display
  copyButton.style.display = 'block';
  document.getElementById("livePrev").style.display = 'block';
  document.getElementById("codePrev").style.display = 'block';
}