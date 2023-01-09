function getCookieValue(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2)
        return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = '; expires=' + date.toGMTString();
    document.cookie = name + '=' + value + expires + ';path=/';
}

function getParamValueFromUrl(p) {
    var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Recupero la cookie y en un campo hidden 
// Si en la cookie no tengo valores, uso el del GET por si el browser no acepta cookies
function recoverCookieAndForm(fieldParam) {
    var fieldValueFromParamFromUrl = getParamValueFromUrl(fieldParam);
    if (fieldValueFromParamFromUrl)
        setCookie(fieldParam, fieldValueFromParamFromUrl, 7);

    var fieldValueFromCookie = getCookieValue(fieldParam);
    fieldValueFromCookie = typeof fieldValueFromCookie === 'undefined' ? "" : fieldValueFromCookie;

    var valorParaElHidden = typeof fieldValueFromCookie !== 'undefined' && fieldValueFromCookie != null && fieldValueFromCookie != "" ? fieldValueFromCookie :
        (typeof fieldValueFromParamFromUrl !== 'undefined' && fieldValueFromParamFromUrl != null && fieldValueFromParamFromUrl != "" ? fieldValueFromParamFromUrl : "");

    crearHiddenField(fieldParam, valorParaElHidden);
}

function crearHiddenField(field, value) {
    for (var i = 0; i < document.forms.length; i++) {
        var form = document.forms[i];
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", field);
        input.setAttribute("value", value);
        form.appendChild(input);
        //alert('acabo de meter el valor ' + value + ' en ' + field);
    }
}

function assignCookieValueToFormInput(fieldParam, inputs) {
    var field = getCookieValue(fieldParam),
        length = inputs.length;
    if (field && length) {
        for (var i = 0; i < length; i++) {
            inputs[i].value = field;
        }
    }
}

var prev_handler = window.onload;
window.onload = function () {
    if (prev_handler) {
        prev_handler();
    }
    // Save cookie value
    // Take cookie value
    // Add hidden input with value in every form
    //saveToCookieAndForm('gclid');
    //saveToCookieAndForm('fbclid');
    recoverCookieAndForm('utm_source');
    recoverCookieAndForm('utm_medium');
    recoverCookieAndForm('utm_campaign');
    recoverCookieAndForm('utm_term');
    recoverCookieAndForm('utm_content');

    //saveToCookieAndForm('utm_landing');
};