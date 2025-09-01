$(document).ready(function() {
    if (window.location.href.toLowerCase().indexOf('/_layouts/') > -1 || window.location.href.toLowerCase().indexOf('allitems.aspx') > -1) {
        $('link[href*="styles.css"],style[data-original-href*="styles.css"],link[href*="bootstrap.css"],style[data-original-href*="bootstrap.css"],link[href*="font-awesome.css"],style[data-original-href*="font-awesome.css"],link[href*="style-dashboards.css"],style[data-original-href*="style-dashboards.css"]').disabled = true;
        $('link[href*="styles.css"],style[data-original-href*="styles.css"],link[href*="bootstrap.css"],style[data-original-href*="bootstrap.css"],link[href*="font-awesome.css"],style[data-original-href*="font-awesome.css"],link[href*="style-dashboards.css"],style[data-original-href*="style-dashboards.css"]').remove();
    }
});
$(function() {
    //handleMainMenu.init();
    handleCircleProgress.init();
    handleDatePicker.init();
})
var handleDatePicker = {
    init: function() {
        if ($(".datepicker").length > 0) {
            $(".datepicker").each(function() {
                $(".datepicker").datepicker();
            });
        }
    }
}

var handleCardCollapse = {
    toggle: function(elem) {
        if ($(elem).parent().find(".collapse").hasClass("show")) {
            $(elem).parent().find(".collapse").removeClass("show");
            $(elem).text("View More");
        } else {
            $(elem).parent().find(".collapse").addClass("show");
            $(elem).text("View Less");
        }

    }

}

var handleBudgetBarChart = {
    init: function() {
        try {
            if ($("#budgetChart").length > 0) {
                handleBarChart.setup();
            }
        } catch (err) {
            console.log("Error: " + err);
        }
    },
    setup: function() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Approved', 'Spent', 'Remaining'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

}

var handleCircleProgress = {
    init: function() {
        try {
            if ($(".progress-circle").length > 0) {
                handleCircleProgress.setup();
            }
        } catch (err) {
            console.log("Error: " + err);
        }
    },
    setup: function() {

        $(".progress-circle").each(function() {

            var value = $(this).attr('data-value');
            var left = $(this).find('.progress-circle-left .progress-circle-bar');
            var right = $(this).find('.progress-circle-right .progress-circle-bar');

            if (value > 0) {
                if (value <= 50) {
                    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
                } else {
                    right.css('transform', 'rotate(180deg)')
                    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
                }
            }

        })

        function percentageToDegrees(percentage) {

            return percentage / 100 * 360

        }
    }
}

var handleMainMenu = {

    init: function() {
        try {
            handleMainMenu.setup();
        } catch (err) {

            console.log("Error: " + err);
        }
    },
    setup: function() {
        $(".js-close-layer").click(function() {
            $("#navbarsParent").removeClass("nav-open");
            $("body").removeClass("nav-open");
            $(".close-layer").removeClass("visible");
        })
        $(".js-menu-click").click(function() {
            if ($("#navbarsParent").hasClass("nav-open")) {
                $("#navbarsParent").removeClass("nav-open");
                $("body").removeClass("nav-open");
                $(".close-layer").removeClass("visible");

            } else {

                $("#navbarsParent").addClass("nav-open");
                $("body").addClass("nav-open");
                $(".close-layer").addClass("visible");


            }
        })
    },
    close: function() {
        $("#navbarsParent").removeClass("nav-open");
        $("body").removeClass("nav-open");
        $(".close-layer").removeClass("visible");
    },
    open: function() {
        if ($("#navbarsParent").hasClass("nav-open")) {
            $("#navbarsParent").removeClass("nav-open");
            $("body").removeClass("nav-open");
            $(".close-layer").removeClass("visible");

        } else {

            $("#navbarsParent").addClass("nav-open");
            $("body").addClass("nav-open");
            $(".close-layer").addClass("visible");
        }
    }
}

var handlePopupDialog = {
    init: function() {
        try {
            handlePopupDialog.setup();
        } catch (err) {

            console.log("Error: " + err);
        }
    },
    setup: function() {
        var fancy = $("#popup-box").fancybox({
            padding: 0,
            scrolling: 'auto'
        })
        fancy.click();
    }
}
var handlePopupDialogTargetView = {
    init: function(elem) {
        try {
            handlePopupDialogTargetView.setup(elem);
        } catch (err) {

            console.log("Error: " + err);
        }

    },
    setup: function(elem) {
        var fancy = $(elem).parents(".collapse").find("#popup-box").fancybox({
            padding: 0,
            scrolling: 'auto',
            afterShow: function() {
                $(".datepicker").datepicker();

            },
            afterLoad: function() {
                $('.fancybox-inner').on('scroll', function() {
                    var inp = $(this).find('input.hasDatepicker');
                    $('#ui-datepicker-div').css('top', inp.offset().top + inp.outerHeight());
                });
            },
            beforeClose: function() {
                $('.fancybox-inner').off('scroll');
            }
        })
        fancy.click();
    }
}