(function($) {
    'use strict';


    /*--------------------------------------------------------------
      Scripts initialization
    --------------------------------------------------------------*/
    $.exists = function(selector) {
        return $(selector).length > 0;
    };

    $(window).on('load', function() {
        preloader();
    });

    $(function() {
        mainNav();
        stickyHeader();
        dynamicBackground();
        slickInit();
        modalVideo();
        accordian();
        tabs();
        progressBar();
        review();
        listAndGridView();
        inputPasswordShow();
        countdownInitial();
        incrementDecrement();
        customDropdown();
        commonJS();
        // Zoom Integration
        $('.cs_product_zoom').each(function() {
            $(this).zoom();
        });
        // Select 2 Integration
        if ($.exists('.cs_select')) {
            $('.cs_select').select2({
                placeholder: function() {
                    $(this).data('placeholder');
                },
            });
        }
    });

    /*--------------------------------------------------------------
      1. Preloader
    --------------------------------------------------------------*/
    function preloader() {
        $('.cs_perloader').fadeOut();
        $('cs_perloader_in').delay(150).fadeOut('slow');
    }

    /*--------------------------------------------------------------
      2. Mobile Menu
    --------------------------------------------------------------*/
    function mainNav() {
        $('.cs_site_header').append(
            '<span class="cs_menu_toggle"><span></span></span>',
        );
        $('.menu-item-has-children').append(
            '<span class="cs_munu_dropdown_toggle"><span></span></span>',
        );
        $('.cs_menu_toggle').on('click', function() {
            $(this)
                .toggleClass('cs_toggle_active')
                .parents('.cs_site_header')
                .toggleClass('cs_mobile_active');
        });
        $('.cs_menu_toggle')
            .parents('body')
            .find('.cs_side_header')
            .addClass('cs_has_main_nav');
        $('.cs_menu_toggle')
            .parents('body')
            .find('.cs_toolbox')
            .addClass('cs_has_main_nav');
        $('.cs_header_overlay_mobile, .cs_close_mobile_active').on(
            'click',
            function() {
                $('.cs_site_header').removeClass('cs_mobile_active');
                $('.cs_menu_toggle').removeClass('cs_toggle_active');
            },
        );
        $('.cs_munu_dropdown_toggle').on('click', function() {
            $(this).toggleClass('active').siblings('ul').slideToggle();
            $(this).parent().toggleClass('active');
        });
        $('.cs_mobile_tab_btn').on('click', function() {
            $(this)
                .parent()
                .addClass('cs_mobile_active')
                .siblings()
                .removeClass('cs_mobile_active');
        });
        // Search toggle
        $('.cs_mobile_search_toggle').on('click', function() {
            $('.cs_header_search_form_wrap').toggleClass('active');
        });
        // Side Nav
        $('.cs_hamburger_btn').on('click', function() {
            $('.cs_side_header').addClass('active');
        });
        $('.cs_close, .cs_side_header_overlay').on('click', function() {
            $('.cs_side_header').removeClass('active');
        });
    }

    /*--------------------------------------------------------------
      3. Sticky Header
    --------------------------------------------------------------*/
    function stickyHeader() {
        var $window = $(window);
        var lastScrollTop = 0;
        var $header = $('.cs_sticky_header');
        var headerHeight = $header.outerHeight() + 30;

        $window.scroll(function() {
            var windowTop = $window.scrollTop();

            if (windowTop >= headerHeight) {
                $header.addClass('cs_sticky_active');
            } else {
                $header.removeClass('cs_sticky_active');
            }

            lastScrollTop = windowTop;
        });
    }

    /*--------------------------------------------------------------
      4. Dynamic Background
    --------------------------------------------------------------*/
    function dynamicBackground() {
        $('[data-src]').each(function() {
            var src = $(this).attr('data-src');
            $(this).css({
                'background-image': 'url(' + src + ')',
            });
        });
    }

    /*--------------------------------------------------------------
      5. Slick Slider
    --------------------------------------------------------------*/
    function slickInit() {
        if ($.exists('.cs_slider')) {
            $('.cs_slider').each(function() {
                // Slick Variable
                var $ts = $(this).find('.cs_slider_container');
                var $slickActive = $(this).find('.cs_slider_wrapper');

                // Auto Play
                var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
                // Auto Play Time Out
                var autoplaySpdVar = 3000;
                if (autoPlayVar > 1) {
                    autoplaySpdVar = autoPlayVar;
                    autoPlayVar = 1;
                }
                // Slide Change Speed
                var speedVar = parseInt($ts.attr('data-speed'), 10);
                // Slider Loop
                var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
                // Slider Center
                var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
                // Variable Width
                var variableWidthVar = Boolean(
                    parseInt($ts.attr('data-variable-width'), 10),
                );
                // Pagination
                var paginaiton = $(this)
                    .find('.cs_pagination')
                    .hasClass('cs_pagination');
                // Slide Per View
                var slidesPerView = $ts.attr('data-slides-per-view');
                if (slidesPerView == 1) {
                    slidesPerView = 1;
                }
                if (slidesPerView == 'responsive') {
                    var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
                    var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
                    var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
                    var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
                    var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
                }
                // Fade Slider
                var fadeVar = parseInt($($ts).attr('data-fade-slide'));
                fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

                // Slick Active Code
                $slickActive.slick({
                    autoplay: autoPlayVar,
                    dots: paginaiton,
                    centerPadding: '28%',
                    speed: speedVar,
                    infinite: loopVar,
                    autoplaySpeed: autoplaySpdVar,
                    centerMode: centerVar,
                    fade: fadeVar,
                    prevArrow: $(this).find('.cs_left_arrow'),
                    nextArrow: $(this).find('.cs_right_arrow'),
                    appendDots: $(this).find('.cs_pagination'),
                    slidesToShow: slidesPerView,
                    variableWidth: variableWidthVar,
                    swipeToSlide: true,
                    responsive: [{
                            breakpoint: 1600,
                            settings: {
                                slidesToShow: lgPoint,
                            },
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: mdPoint,
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: smPoint,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: xsPoing,
                                slidesToScroll: xsPoing,
                            },
                        },
                    ],
                });
            });
        }
        // Product Details Slider
        if ($.exists('.cs_single_product_thumb')) {
            $('.cs_single_product_thumb').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: '.cs_single_product_nav',
            });
        }
        if ($.exists('.cs_single_product_nav')) {
            $('.cs_single_product_nav').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.cs_single_product_thumb',
                focusOnSelect: true,
                prevArrow: $('.cs_single_left_arrow'),
                nextArrow: $('.cs_single_right_arrow'),
                centerMode: true,
                centerPadding: '0',
            });
        }

        if ($.exists('.cs_single_product_thumb_2')) {
            $('.cs_single_product_thumb_2').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: '.cs_single_product_nav_2',
            });
        }
        if ($.exists('.cs_single_product_nav_2')) {
            $('.cs_single_product_nav_2').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.cs_single_product_thumb_2',
                focusOnSelect: true,
                prevArrow: $('.cs_single_left_arrow'),
                nextArrow: $('.cs_single_right_arrow'),
                vertical: true,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        vertical: false,
                    },
                }, ],
            });
        }
    }

    /*--------------------------------------------------------------
      6. Modal Video
    --------------------------------------------------------------*/
    function modalVideo() {
        if ($.exists('.cs_video_open')) {
            $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup_content">
            <div class="cs_video_popup_layer"></div>
            <div class="cs_video_popup_container">
              <div class="cs_video_popup_align">
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" src="about:blank"></iframe>
                </div>
              </div>
              <div class="cs_video_popup_close"></div>
            </div>
          </div>
        </div>
      `);
            $(document).on('click', '.cs_video_open', function(e) {
                e.preventDefault();
                var video = $(this).attr('href');

                $('.cs_video_popup_container iframe').attr('src', `${video}`);

                $('.cs_video_popup').addClass('active');
            });
            $('.cs_video_popup_close, .cs_video_popup_layer').on(
                'click',
                function(e) {
                    $('.cs_video_popup').removeClass('active');
                    $('html').removeClass('overflow-hidden');
                    $('.cs_video_popup_container iframe').attr('src', 'about:blank');
                    e.preventDefault();
                },
            );
        }
    }

    /*--------------------------------------------------------------
      7. Accordian
    --------------------------------------------------------------*/
    function accordian() {
        $('.cs_accordian').children('.cs_accordian_body').hide();
        $('.cs_accordian.active').children('.cs_accordian_body').show();
        $('.cs_accordian_head').on('click', function() {
            $(this)
                .parent('.cs_accordian')
                .siblings()
                .children('.cs_accordian_body')
                .slideUp(250);
            $(this).siblings().slideDown(250);
            $(this)
                .parent()
                .parent()
                .siblings()
                .find('.cs_accordian_body')
                .slideUp(250);
            /* Accordian Active Class */
            $(this).parents('.cs_accordian').addClass('active');
            $(this).parent('.cs_accordian').siblings().removeClass('active');
        });
    }

    /*--------------------------------------------------------------
      8. Tabs
    --------------------------------------------------------------*/
    function tabs() {
        $('.cs_tabs .cs_tab_links a').on('click', function(e) {
            var currentAttrValue = $(this).attr('href');
            $('.cs_tabs ' + currentAttrValue)
                .fadeIn(400)
                .siblings()
                .hide();
            $(this).parents('li').addClass('active').siblings().removeClass('active');
            e.preventDefault();
        });
    }

    /*--------------------------------------------------------------
      9. Progress Bar
    --------------------------------------------------------------*/
    function progressBar() {
        $('.cs_progress').each(function() {
            var progressPercentage = $(this).data('progress') + '%';
            $(this).find('.cs_progress_in').css('width', progressPercentage);
        });
    }

    /*--------------------------------------------------------------
      10. Common JS
    --------------------------------------------------------------*/
    function commonJS() {
        // Like Toggle
        $('.cs_like_btn').on('click', function() {
            $(this).toggleClass('active');
        });

        // Category Widget Toggle
        $('.cs_filter_widget_title').on('click', function() {
            $(this)
                .toggleClass('active')
                .siblings('.cs_filter_widget_content')
                .slideToggle();
        });

        // Drawer Btn
        $('.cs_drawer_btn').on('click', function() {
            $(this).toggleClass('active');
            $('.cs_overlay_filter_widgets').toggleClass('active');
        });
        $('.cs_overlay_filter').on('click', function() {
            $('.cs_drawer_btn').removeClass('active');
            $('.cs_overlay_filter_widgets').removeClass('active');
        });

        // Cart Btn
        $('.cs_cart_btn').on('click', function() {
            $('.cs_cart_card_wrap').toggleClass('active');
        });
        $('.cs_cart_overlay, .cs_cart_close').on('click', function() {
            $('.cs_cart_card_wrap').removeClass('active');
        });
    }

    /*--------------------------------------------------------------
      11. Review
    --------------------------------------------------------------*/
    function review() {
        $('.cs_rating').each(function() {
            var review = $(this).data('rating');
            var reviewVal = review * 20 + '%';
            $(this).find('.cs_rating_percentage').css('width', reviewVal);
        });
    }

    /*--------------------------------------------------------------
      12. Custom Dropdown
    --------------------------------------------------------------*/
    function customDropdown() {
        $('.cs_dropdown_btn').on('click', function(event) {
            var $dropdown = $(this).siblings('.cs_dropdown_content');
            $('.cs_dropdown_content').not($dropdown).removeClass('active');
            $('.cs_dropdown_content').not($dropdown).siblings().removeClass('active');
            $dropdown.toggleClass('active');
            $dropdown.siblings().toggleClass('active');
            $(this)
                .parent()
                .addClass('cs_mobile_active')
                .siblings()
                .removeClass('cs_mobile_active');
            event.stopPropagation();
        });

        $(document).on('click', function(event) {
            if (!$(event.target).closest('.cs_dropdown').length) {
                $('.cs_dropdown_content').removeClass('active');
                $('.cs_dropdown_content').siblings().removeClass('active');
            }
        });
        $('.cs_dropdown_content').on('click', function() {
            $(this)
                .addClass('active')
                .siblings('.cs_dropdown_btn')
                .addClass('active');
        });
    }

    /*--------------------------------------------------------------
      13. Input Password Show
    --------------------------------------------------------------*/
    function inputPasswordShow() {
        $('.cs_eye_btn').click(function() {
            $(this).toggleClass('show');
            var input = $(this).siblings('.cs_password_input');
            if (input.attr('type') == 'password') {
                input.attr('type', 'text');
            } else {
                input.attr('type', 'password');
            }
        });
    }

    /*--------------------------------------------------------------
      14. Increment Decrement
    --------------------------------------------------------------*/
    function incrementDecrement() {
        $('.cs_increment').click(function() {
            var countElement = $(this).siblings('.cs_quantity_input');
            var count = parseInt(countElement.text());
            count++;
            countElement.text(count);
        });

        $('.cs_decrement').click(function() {
            var countElement = $(this).siblings('.cs_quantity_input');
            var count = parseInt(countElement.text());
            if (count > 0) {
                count--;
                countElement.text(count);
            }
        });
    }

    /*--------------------------------------------------------------
      15. Countdown Initial
    --------------------------------------------------------------*/
    function countdownInitial() {
        if ($.exists('.cs_countdown')) {
            $('.cs_countdown').each(function() {
                let _this = this;
                let el = $(_this).data('countdate');
                // Start Only for Never end Date
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);

                const year = tomorrow.getFullYear();
                const month = tomorrow.getMonth() + 1;
                const day = tomorrow.getDate();
                const formattedTomorrow = `${year}-${
          month < 10 ? '0' + month : month
        }-${day < 10 ? '0' + day : day}`;
                el = formattedTomorrow;
                // End Only for Never end Date
                let countDownDate = new Date(el).getTime();
                let x = setInterval(function() {
                    let now = new Date().getTime();
                    let distance = countDownDate - now;
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    let hours = Math.floor(
                        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    );
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    $(_this).find('.cs_count_days').html(days);
                    $(_this).find('.cs_count_hours').html(hours);
                    $(_this).find('.cs_count_minutes').html(minutes);
                    $(_this).find('.cs_count_seconds').html(seconds);

                    if (distance < 0) {
                        clearInterval(x);
                        $(_this).find('.cs_count_days').html('00');
                        $(_this).find('.cs_count_hours').html('00');
                        $(_this).find('.cs_count_minutes').html('00');
                        $(_this).find('.cs_count_seconds').html('00');
                    }
                }, 1000);
            });
        }
    }

    /*--------------------------------------------------------------
      16. List And Grid View
    --------------------------------------------------------------*/
    function listAndGridView() {
        $('.cs_list_view').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.cs_products_view').addClass('active');
            $('.cs_products_list_view').removeClass('active');
        });

        $('.cs_grid_view').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('.cs_products_view').removeClass('active');
            $('.cs_products_list_view').addClass('active');
        });
    }
})(jQuery); // End of use strict