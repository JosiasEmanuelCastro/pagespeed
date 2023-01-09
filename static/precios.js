$(document).ready(function () {

    var pStandard = 10259, pPro = 12779, pFull = 17099, pContadores = 21995;

    var descuentoAnual = 0.8;
    var descuentoMensual = 1;


    $("#pStandardDescAnual").text(parseInt(pStandard * descuentoAnual));
    $("#pStandardDescMensual").text(parseInt(pStandard * descuentoMensual));

    $("#pProDescAnual").text(parseInt(pPro * descuentoAnual));
    $("#pProDescMensual").text(parseInt(pPro * descuentoMensual));

    $("#pFullDescAnual").text(parseInt(pFull * descuentoAnual));
    $("#pFullDescMensual").text(parseInt(pFull * descuentoMensual));


});