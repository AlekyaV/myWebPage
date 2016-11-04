// Name: Alekya Venkatapuram
//Gui Progrmming I Assignment6
//Email: Alekya_Venkatapuram@student.uml.edu

// Returns true if the given input (as defined by its CSS selector) is a valid number.
function inputIsValid(cssSelector)
{
return ($(cssSelector).val() !== "" && !isNaN($(cssSelector).val()));
}

function validateInput(cssSelector)
{
if (inputIsValid(cssSelector) == false)
{
$(cssSelector).css("background-color","red");
return false;
}
else
{
$(cssSelector).css("background-color","white");
return true;
}
}

// Returns true if all inputs are valid (and thus the table can be generated).
function allInputsAreValid()
{
var startX = $("#HorizonalStartTextBox").val();
var endX = $("#HorizonalEndTextBox").val();
var startY = $("#VerticalStartTextBox").val();
var endY = $("#VerticalEndTextBox").val();
return (inputIsValid("#HorizonalStartTextBox") &&
inputIsValid("#HorizonalEndTextBox") &&
inputIsValid("#VerticalStartTextBox") &&
inputIsValid("#VerticalEndTextBox") &&
Number(endX) >= Number(startX) &&
Number(endY) >= Number(startY))
}
// Creates a table based on the inputs and returns the HTML as a string.
function generateTable(startX, endX, startY, endY)
{
var table = "<table class='darkShadedTable'>";
startX = Number(startX);
startY = Number(startY);
endX = Number(endX);
endY = Number(endY);
// First make the header
table += "<tr><th>&nbsp;</th>";
for (var x = startX; x <= endX; x++)
{
table += "<th>" + x + "</th>"
}
table += "</tr>";
// Now do each individual row.
for (var y = startY; y <= endY; y++)
{
table += "<tr><th>" + y + "</th>";
for (var x = startX; x <= endX; x++)
{
table += "<td>" + (x * y) + "</td>";
}
table += "</tr>";
}
table += "</table>";
return table;
}

function checkAndGenerateTable()
{
var startX = $("#HorizonalStartTextBox").val();
var endX = $("#HorizonalEndTextBox").val();
var startY = $("#VerticalStartTextBox").val();
var endY = $("#VerticalEndTextBox").val();
if (allInputsAreValid())
{
$("#content").html(generateTable(startX, endX, startY, endY));
$("#content").css("display","block");
}
}
jQuery(document).ready(function()
{

$(".LimitsTextBox").on('input', function()
{
validateInput("#HorizonalStartTextBox");
validateInput("#HorizonalEndTextBox");
validateInput("#VerticalStartTextBox");
validateInput("#VerticalEndTextBox");
checkAndGenerateTable();
});
$(".LimitsTextBox").blur(function()
{

var startX = $("#HorizonalStartTextBox").val();
var endX = $("#HorizonalEndTextBox").val();
var startY = $("#VerticalStartTextBox").val();
var endY = $("#VerticalEndTextBox").val();

if (inputIsValid("#HorizonalStartTextBox") && inputIsValid("#HorizonalEndTextBox"))
if (Number(endX) < Number(startX))
$("#HorizonalEndTextBox").val(Number(startX));

if (inputIsValid("#VerticalStartTextBox") && inputIsValid("#VerticalEndTextBox"))
if (Number(endY) < Number(startY))
$("#VerticalEndTextBox").val(Number(startY));
checkAndGenerateTable();
});
checkAndGenerateTable();
});
