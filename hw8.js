/*     
 Alekya Venkatapuram
          Alekya_Venkatapuram@student.uml.edu
           GUI-I assignment 7
            11/15/2016
*/

$().ready(function () {
    var tabCount = 1;

    function incrementCount() {
        tabCount++;
    }
    mulTab(); //For creating an initial table
    /* Validator */
    /* Source: http://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
     *         Checks if Max is greater than min. If it is, if gives an error */
   
    $.validator.addMethod("greaterThan",
            function (value, element, param) {
                var $min = $(param);
                if (this.settings.onfocusout) {
                    $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                        $(element).valid();
                    });
                }
                return parseInt(value) > parseInt($min.val());
            }, "Max must be greater than min");

    //mulTab(); //Create initial table
    var check = $('#mulTab').validate({
        rules: {
            rowSt: {
                required: true,
                number: true,
                range: [-100, 100]
            },
            rowEn: {
                required: true,
                number: true,
                greaterThan: '#rowSt',
                range: [-100, 100]
            },
            colSt: {
                required: true,
                number: true,
                range: [-100, 100]
            },
            colEn: {
                required: true,
                number: true,
                greaterThan: '#colSt',
                range: [-100, 100]
            }
        },
        messages: {
            rowSt: {
                required: " Please enter a valid number"
            },
            rowEn: {
                required: " Please enter a valid number"
            },
            colSt: {
                required: "Please enter a valid number"
            },
            colEn: {
                required: "Please enter a valid number"
            }
        }
    });
    /*In case of an error prevents form from getting submitted */
    $('#mulTab').on('submit', function (e) {
        e.preventDefault();
        var status = check;
        status = status.currentForm;

        /* Check for error and focus on if there is one */
        if (status[0].inVal !== 'error' && status[1].className !== 'error' && status[2].inVal !== 'error' && status[3].inVal !== 'error') {
            addTab();
            mulTab();
            createCheckBox(tabCount);
        } else {
            if (status[0].inVal === 'error') {
                document.getElementById("rowSt").focus();
            }
            if (status[1].inVal === 'error') {
                document.getElementById("rowEn").focus();
            }
            if (status[2].inVal === 'error') {
                document.getElementById("colSt").focus();
            }
            if (status[3].inVal === 'error') {
                document.getElementById("colEn").focus();
                checkVal = 0;
            }
        }
    });

    /* end of validator*/

    /* Dynamic Table */
    function mulTab() {
        
        $("#1").slider({
            range: "max",
            min: -100,
            max: 100,
            value: parseInt($('input[name=rowSt]').val()),
            stop: function (e, ui) {
                $("#rowSt").val(ui.value);
                
                
            }
        });

        $("#2").slider({
            range: "max",
            min: -100,
            max: 100,
            value: parseInt($('input[name=rowEn]').val()),
            stop: function (e, ui) {
                $("#rowEn").val(ui.value);
            }
        });

        $("#3").slider({
            range: "max",
            min: -100,
            max: 100,
            value: parseInt($('input[name=colSt]').val()),
            stop: function (e, ui) {
                $("#colSt").val(ui.value);
            }
        });

        $("#4").slider({
            range: "max",
            min: -100,
            max: 100,
            value: parseInt($('input[name=colEn]').val()),
            stop: function (e, ui) {
                $("#colEn").val(ui.value);
            }
        });

        /*Got help for parseInt from:
         *Source: http://stackoverflow.com/questions/7230553/reading-numbers-from-inputs-with-javascript-always-returns-nan
         *.val() returns the value attibute */

        /* Gets values from the sliders */
        var rowSt = $('#1').slider("value"),  //Row starting value
                rowEn = $('#2').slider("value"),  //Row ending value
                colSt = $('#3').slider("value"),  //Column starting value
                colEn = $('#4').slider("value"); //Column ending value
        var c = colSt; //To increment the column.

        /* To check that only numbers are entered for rows and columns */
        if (typeof rowSt === 'number' && typeof rowEn === 'number' && typeof colSt === 'number' && typeof colEn === 'number') {
            var table = '<table>';

            //To make the columns and rows for the table
            table = '<tr>' + '<td></td>';
            for (var i = rowSt; i <= rowEn; i++) {
                table += '<td>' + i + '</td>';
            }
            for (var j = colSt; j <= colEn; j++) {
                table += '<tr>';
                table += '<td>' + c + '</td>';
                for (var k = rowSt; k <= rowEn; k++) {
                    table += '<td>' + j * k + '</td>';
                }
                table += '</tr>';
                c++; //Increment the column number or else it won't change
            }
            table += '</table>';

            $('#table' + tabCount).html(table); 
            incrementCount();
        }
    }

//this will add focus on the input boxes
    $("input").focus(function () {
        $(this).next("span").css("display", "inline");
    });

   /* Worked with code from:
     * Source: http://jqueryui.com/tabs/#manipulation
     */
    var tabTitle = $("#tab_title"),
            tabContent = $("#tab_content"),
            tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
            tabCounter = 2;

    var tabs = $("#tabs").tabs();
    
    
function createCheckBox(index_tabs) {
        var checkbox = document.createElement("input");
        index_tabs--;
        
        checkbox.type = "checkbox";
        checkbox.name = "ch-" + index_tabs;
        checkbox.id = "ch-" + index_tabs;
        var label = document.createElement("label");
    
        label.htmlFor = "ch-" + index_tabs;
        label.id = "lb-" + index_tabs;
        label.appendChild(document.createTextNode("tab-" + index_tabs));
        
        document.getElementById('check').appendChild(checkbox);
        document.getElementById('check').appendChild(label);
    }
    
    $('#selected_tabs').click(function () {
   
        var selected = [];
        $('input:checkbox:checked').each(function () {
            selected.push($(this).attr('id'));
        });
       
        for (var m = 0; m < selected.length; m++) {
            $("#ch-" + selected[m].replace(/\D/g, '')).remove();
            $("#lb-" + selected[m].replace(/\D/g, '')).remove();
            $("#tab-" + selected[m].replace(/\D/g, '')).remove();
            $('#ui-id-' + selected[m].replace(/\D/g, '')).remove();
            $("li[aria-controls='tabs-" + selected[m].replace(/\D/g, '') +"']").remove();
            
        }
        $('#tabs').tabs("refresh");
    });

    // addTab() function to add actual new tab to input values
    function addTab() {
        var rowStart = parseInt($('input[name=rowSt]').val()),
         rowEnd = parseInt($('input[name=rowEn]').val()),
         colStart = parseInt($('input[name=colSt]').val()),
         colEnd = parseInt($('input[name=colEn]').val());
        var label = tabTitle.val() || "Parameters(" + rowStart + "," + rowEnd + "," + colStart + "," + colEnd + ")",
                id = "tabs-" + tabCount,
                li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><div id=\"table" + tabCount + "\"></div></div>");      
        tabs.tabs("refresh");
        
    }

    
    
}); 
