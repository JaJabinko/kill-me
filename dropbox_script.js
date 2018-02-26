$(document).ready(function () {
    var Price = 0;
    var json = require('json.json');

    $('#btnSort').click(function (e) {

        sortSelect('#optInt', 'text', 'asc');
        sortSelect('#optAmd', 'text', 'asc');
        $('#dropDownDest').get(0).selectedIndex = 0;

    }); // event listener click

    $('#btnSortPrice').click(function (e) {

        sortSelect('#optInt', 'value', 'desc');
        sortSelect('#optAmd', 'value', 'desc');
        $('#dropDownDest').get(0).selectedIndex = 0;

    }); // event listener click

    $('#btnSort2').click(function (e) {

        sortSelect('#dropDownDest2', 'text', 'asc');

    }); // event listener click

    $('#btnSortPrice2').click(function (e) {

        sortSelect('#dropDownDest2', 'value', 'desc');

    }); // event listener click

    $.getJSON("json.js", function (obj) {

        $.each(json.cpu, function (key, value) {
            if (value.price == "") {
                value.price = String.fromCharCode('163') + 0.0;
            }
            var option = $('<option />').val(value.price).text(value.name + " for " + value.price);
            if (value.name.indexOf("Intel") !== -1) {
                $("#optInt").append(option);
            } else {
                if (value.name.indexOf("AMD") !== -1) {
                    $("#optAmd").append(option);
                } else {
                    $("#dropDownDest").append(option);

                }
            }
        });

        $.each(json.gpu, function (key, value) {
            var option = $('<option />').val(value.price).text(value.name + " for " + value.price);

            $("#dropDownDest2").append(option);


        });
    });

    $('#dropDownDest').on('change', function () {
        updatePrice();

    });

    $('#dropDownDest2').on('change', function () {
        updatePrice();

    });

    var updatePrice = function () {
        var pricecpu = parseFloat($('#dropDownDest option:selected').val().substring(1));
        var pricegpu = parseFloat($('#dropDownDest2 option:selected').val().substring(1));
        Price = pricecpu + pricegpu;
        var Pricestring = String.fromCharCode('163') + Price;
        $('#drop1Label').text(Pricestring);

    };
});





var sortSelect = function (select, attr, order) {
    if (attr === 'text') {
        if (order === 'asc') {
            $(select).html($(select).children('option').sort(function (x, y) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            e.preventDefault();
        }// end asc
        if (order === 'desc') {
            $(select).html($(select).children('option').sort(function (y, x) {
                return $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
            }));
            e.preventDefault();
        }// end desc
    }
    if (attr === 'value') {
        if (order === 'asc') {
            $(select).html($(select).children('option').sort(function (x, y) {
                return parseFloat($(x).val().substring(1)) < parseFloat($(y).val().substring(1)) ? -1 : 1;
            }));
            e.preventDefault();
        }// end asc
        if (order === 'desc') {
            $(select).html($(select).children('option').sort(function (y, x) {
                return parseFloat($(x).val().substring(1)) < parseFloat($(y).val().substring(1)) ? -1 : 1;
            }));
            e.preventDefault();
        }// end desc
    }
};