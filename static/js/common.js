
var dfLoadStatus = 0;
var dfLoadFiles = [
    ["//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"],
    [
        
        "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
        "../static/js/slick.min.js",
        "../static/js/scrollIt.min.js",
        "../static/js/utm_tracking.js",
        "../static/js/jquery.validate.min.js",
        "../static/js/jquery.numericInput.min.js",
    ]
];

function downloadJSAtOnload() {
    if (!dfLoadFiles.length) return;

    var dfGroup = dfLoadFiles.shift();
    dfLoadStatus = 0;

    for (var i = 0; i < dfGroup.length; i++) {
        dfLoadStatus++;
        var element = document.createElement('script');
        element.src = dfGroup[i];
        element.onload = element.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'complete') {
                dfLoadStatus--;
                if (dfLoadStatus === 0) {
                    if (dfGroup.length === 1) { //if jquery was loaded, then load other js
                        downloadJSAtOnload();
                    } else { //all is already loaded, perform deffered actions

                        performDeferredActions();
                    }
                }
            }
        };
        document.body.appendChild(element);
    }
}

if (window.addEventListener) {
    window.addEventListener("load", downloadJSAtOnload, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", downloadJSAtOnload);
} else {
    window.onload = downloadJSAtOnload;
}

function performDeferredActions() {


    //do anything after all the resources are loaded.


    /* ========================================================================
    * Preguntas frecuentes
    * ======================================================================== */

    $(window).on('load', function () {
        $.getJSON(faqRef, function (data) {
            var faqList = ''
            $('#faq').addClass(data.visibilidad);
            $('#faqlink').addClass(data.visibilidad);
            for (var i = 0; i < data.preguntas.length; i++)
                faqList += '<div class="faq-panel">' +
                    '<div role="tab" id="heading' + i + '">' +
                    '<h4 class="panel-title"><a role="button" data-toggle="collapse" class="collapsed" data-parent="#accordion" href="#collapse' + i + '">' + data.preguntas[i].pregunta + data.preguntas[i].subtitulo + '</a></h4>' +
                    '</div>' +
                    '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">' +
                    '<p>' + data.preguntas[i].respuesta + '</p>' +
                    '</div>' +
                    '</div>';
            $('#accordion').html(faqList);
        });
    });

    /* ========================================================================
    * Header
    * ======================================================================== */

    $(window).on('load', function () {
        $.getJSON(headerRef, function (data) {
            $('.codigo-descuento').html('<input id="txtCodigoPromocion" class="form-control" type="text" maxlength="30" name="txtCodigoPromocion" placeholder="referido o promo code" value="' + data.codigodescuento + '"/>');
            $('.h-destacado').html('<p>' + data.destacado + '</p>');
            /*$('.h-boton').html(data.boton);
            // Inicializa magnificPopup 
            $('.popup-video').magnificPopup({
                
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });*/
        });
    });

    /* ========================================================================
    * Planes
    * ======================================================================== */

    $(window).on('load', function () {
        $.getJSON(planesRef, function (data) {

            var h, i, j, x = "";

            $('.p-titulo').html('<h2 class="mt0">' + data.titulo + '</h2>');
            $('.p-desc1').html('<p class="text-lg text-narrow text-important">' + data.descripcion1 + '</p>');
            $('.p-desc2').html('<p class="text-lg text-narrow">' + data.descripcion2 + '</p>');

            for (i in data.planes) {
                x += '<div class="' + data.planes[i].class + '">' +
                    '<div class="pricing-wrapper wow fadeInUp animated ' + data.planes[i].css + '" data-wow-duration="1s" data-wow-delay=".4">' + data.planes[i].toplabel +
                    '<div class="pricing-header">' +
                    '<h3>' + data.planes[i].nombre + '</h3>' +
                    '<div class="pricing-top">' +
                    '<div class="wrapper">' + data.planes[i].header +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="pricing-body">' +
                    '<a href="' + data.planes[i].botonhref + '" class="' + data.planes[i].botonclass + '" target="' + data.planes[i].botontarget + '">' + data.planes[i].boton + '</a>' +
                    '<ul class="pricing-features">';
                for (j in data.planes[i].features) {
                    x += '<li>' + data.planes[i].features[j] + '</li>';
                }
                x +=
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            $('#planesWrapper').html(x);

            $("a[href='#top']").click(function () {
                $("html, body").animate({ scrollTop: 0 }, 1000);
            });

            $.getScript(preciosRef, function () { });

        });

    });




    /* ========================================================================
     * Top nav show/hide
     * ======================================================================== */

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.top-nav').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('.top-nav').css("margin-top", -navbarHeight);
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('.top-nav').css("margin-top", "0");
            }
        }

        lastScrollTop = st;
    }

    /* ========================================================================
     * WOW (initialization)
     * ======================================================================== */

    //new WOW().init();


    /* ========================================================================
     * ScrollIt.js
     * ======================================================================== */

    $(function () {
        $.scrollIt({
            easing: 'linear',
            scrollTime: 500,
            topOffset: -30,
        });
    });

    /* ========================================================================
     * Back to top link
     * ======================================================================== */

    $("a[href='#top']").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });

    /* ========================================================================
     * Integraciones
     * ======================================================================== */

    $(document).ready(function () {
        $.getJSON(integracionesRef, function (data) {
            $.each(data.integraciones, function () {
                var img = this["img"];
                var title = this["title"];
                $(".carousel-integraciones").append(
                    "<div>" +
                    "<img src='" + img + "' title='" + title + "'>" +
                    "</div>"
                );
            });
            $('.carousel-integraciones').slick({
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false,
                autoplay: true,
                pauseOnHover: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
    });

    /* ========================================================================
    * Clientes
    * ======================================================================== */

    $(document).ready(function () {
        $.getJSON(clientesRef, function (data) {
            $.each(data.clientes, function () {
                var img = this["img"];
                var title = this["title"];
                var alt = this["alt"];
                $(".carousel-clientes").append(
                    "<div>" +
                    "<img src='../static/" + img + "' title='" + title + "' alt='" + alt + "'>" +
                    "</div>"
                );
            });
            $('.carousel-clientes').slick({
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 2,
                arrows: false,
                autoplay: true,
                pauseOnHover: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
    });

    /* ========================================================================
    * Testimonios
    * ======================================================================== */

    $(document).ready(function () {
        $.getJSON(testimoniosRef, function (data) {
            $.each(data.testimonios, function () {
                var img = this["img"];
                var comentario = this["comentario"];
                var nombre = this["nombre"];
                var empresa = this["empresa"];
                $(".carousel-testimonios").append(
                    "<div>" +
                    "<div class='client-wrapper'>" +
                    "<div class='client-avatar'>" +
                    "<img src='" + img + "' title='" + nombre + "'>" +
                    "</div>" +
                    "<div class='client-text'>" +
                    "<p>" + comentario + "</p>" +
                    "<div class='client-info'><b>" + nombre + "</b> - " + empresa + "</div>" +
                    "<i class='fa fa-star' style='color:#FFC107;margin:5px 5px 0 0;'></i><i class='fa fa-star' style='color:#FFC107;margin:5px 5px 0 0;'></i><i class='fa fa-star' style='color:#FFC107;margin:5px 5px 0 0;'></i><i class='fa fa-star' style='color:#FFC107;margin:5px 5px 0 0;'></i><i class='fa fa-star' style='color:#FFC107;margin:5px 5px 0 0;'></i>" +
                    "</div>" +
                    "</div>"
                );
            });
            $('.carousel-testimonios').slick({
                infinite: true,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                speed: 4000,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
    });

    function mostrarProcesando(controlName) {
        $("#" + controlName).attr("disabled", true);
        $("#" + controlName).html("Procesando...");
        $("#" + controlName).val("Procesando...");
    }

    function ocultarProcesando(controlName, texto) {
        $("#" + controlName).attr("disabled", false);
        $("#" + controlName).html(texto);
        $("#" + controlName).val(texto);
    }

    function grabar_landing_desc(descuento) {
        $("#divError").hide();
        if ($('#frmRegistro').valid()) {

            /*
            {
        "razonsocial": "test halfon",
        "pwd": "Admin123",
        "email": "leandrohalfon@gmail.com",
        "nroDocumento": "214172500012",
        "pais": "Uruguay",
        "telefono": "325345",
        "codigoPromocion": "google"
    }
            */
            /*recoverCookieAndForm('utm_source');
        recoverCookieAndForm('utm_medium');
        recoverCookieAndForm('utm_campaign');
        recoverCookieAndForm('utm_term');
        recoverCookieAndForm('utm_content');*/

            mostrarProcesando("lnkRegistrarme");
            var utm_source = "";
            var utm_medium = "";
            var utm_campaign = "";
            var utm_term = "";
            var utm_content = "";

            var promo = $("#txtCodigoPromocion").val();

            if ($("[name='utm_source']").val() != "" && $("[name='utm_source']").val() != "undefined" && $("[name='utm_source']").val() != undefined)
                utm_source = $("[name='utm_source']").val();

            if ($("[name='utm_medium']").val() != "" && $("[name='utm_medium']").val() != "undefined" && $("[name='utm_medium']").val() != undefined)
                utm_medium = $("[name='utm_medium']").val();

            if ($("[name='utm_campaign']").val() != "" && $("[name='utm_campaign']").val() != "undefined" && $("[name='utm_campaign']").val() != undefined)
                utm_campaign = $("[name='utm_campaign']").val();

            if ($("[name='utm_term']").val() != "" && $("[name='utm_term']").val() != "undefined" && $("[name='utm_term']").val() != undefined)
                utm_term = $("[name='utm_term']").val();

            if ($("[name='utm_content']").val() != "" && $("[name='utm_content']").val() != "undefined" && $("[name='utm_content']").val() != undefined)
                utm_content = $("[name='utm_content']").val();


            var codigo = "";
            if (promo != "")
                codigo = promo + "|" + utm_source + "|" + utm_medium + "|" + utm_campaign + "|" + utm_term + "|" + utm_content;
            else
                codigo = utm_source + "|" + utm_medium + "|" + utm_campaign + "|" + utm_term + "|" + utm_content;

            //var info = "{ cuit: '" + $("#txtNroDocumento").val()
            var info = "{ razonsocial: '" + $("#txtNombre").val()
                + "', email: '" + $("#txtEmail").val()
                + "', pwd: '" + $("#txtPwd").val()
                + "', telefono: '" + $("#txtArea").val() + "-" + $("#txtTelefono").val()
                + "', codigoPromocion: '" + codigo
                + "', descuento: '" + descuento
                + "', pais: '" + $("#hdnPais").val()
                + "'}";

            $.ajax({
                type: "POST",
                url: "https://rest.contabilium.com/api/landings/crearUsuario",
                data: info,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, text) {
                    window.location.href = "gracias.html";
                    //else
                    //    alert("error al registrarse");
                },
                error: function (response) {
                    var r = jQuery.parseJSON(response.responseText);

                    if (r.Message == "User created.")
                        window.location.href = "gracias.html";
                    else {

                        $("#divError").html(r.Message);
                        $("#divError").show();
                        ocultarProcesando("lnkRegistrarme", "Quiero probarlo ahora");
                    }
                }
            });
            /*}
            else {
                $("#divError").html("Debe aceptar los terminos y condiciones");
                $("#divError").show();
            }
        }*/
        }
        else {
            return false;
        }
    }

    jQuery(document).ready(function () {

        $("#txtArea,#txtTelefono").numericInput();
        $(".plan-mensual").click(function () {
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
            $(".precio_a").hide();
            $(".leyenda").html("");
            $(".precio_m").show();
        });
        $(".plan-anual").click(function () {
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
            $(".precio_a").show();
            $(".leyenda").html("15% OFF pagando anual");
            $(".precio_m").hide();
        });
    });
};