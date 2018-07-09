import $ from 'jquery';
import 'malihu-custom-scrollbar-plugin';

$( document ).ready(function() {
    $(".dealings__cards-wrapper").mCustomScrollbar({
        axis:"x",
        setTop: "0",
        setLeft: "0",
    });

    $(".table-wrapper").mCustomScrollbar({
        axis:"x",
        setTop: "0",
        setLeft: "0",
    });

    const tabs = $('.tabs');

    tabs.each(function () {
        $(this).on("click", function (event) {
            event.preventDefault();
            const nameContent = $(this).attr('href');

            $(this).parent().parent().find(".tabs-info").each(function () {
                $(this).addClass('hide');
            });

            if ($(this).hasClass('tabs--active')) {
                $(this).removeClass('tabs--active');
                $(nameContent).addClass('hide');
            } else {
                $(this).parent().find(".tabs").each(function () {
                    $(this).removeClass('tabs--active');
                });

                $(this).addClass('tabs--active');
                $(nameContent).removeClass('hide');
            }

            $('html, body').animate({
                scrollTop: $(this).offset().top - $('.header').outerHeight()
            }, 500);


            setTimeout(() => {
                $(".dealings__cards-wrapper").mCustomScrollbar("scrollTo", 0, 0)
            }, 200);
        });
    });

    $('.scrollTo').on('click', function (event) {
        event.preventDefault();

        $(".mobile-menu").removeClass('show');
        const nameContent = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(nameContent).offset().top - $('.header').outerHeight()
        }, 1000);
    })


    $('.buy').each(function () {
        $(this).on("click", function (event) {
            event.preventDefault();
            $(`.form${$(this).attr('href')}`).addClass('show');
        });
    });

    $('.closeForm').each(function () {
        $(this).on("click", function (event) {
            event.preventDefault();
            $('.form').removeClass('show');
        });
    });

    $('.header__burger').on("click", function() {
        event.preventDefault();
        $(".mobile-menu").addClass('show')
    });

    $('.close').on("click", function() {
        event.preventDefault();
        $(".mobile-menu").removeClass('show')
    });

    $('.input-field input').each(function () {
        $(this).on('change', function () {
            if(this.value.length > 0) {
                $(this).next().addClass('focus');
            } else {
                $(this).next().removeClass('focus');
            }
        });
    });

    const header = $('header');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            header.addClass('scroll');
        } else {
            header.removeClass('scroll');
        }
    });



    $(".form form").submit(function(event) {
        event.preventDefault();

        const regPhone = /^[0-9+]+$/gm;
        const form = $(this);
        const validPhone = regPhone.test(form.find('[name="phone"]').val());
        const typeForm = form.attr('data-form');

        if (validPhone) {
            const formData = new FormData(document.getElementById("form-" + typeForm));

            $.ajax({
                type: "POST",
                url: "/sendEmail.php",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                success: function () {
                    $('.input-field input').val('');
                    $('.input-field textarea').val('');
                    form.parent().addClass('sent');
                },
                error: function () {

                }
            });
        } else {
            $('form input[name="phone"]').parent().addClass('input-field--error');
        }
    });


});