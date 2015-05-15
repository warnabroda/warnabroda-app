var app = {

        initialize: function() {
            $(document).off('pageshow').on('pageshow', '#main-page', this.bindEvents);
            //$(document).delegate('#page_name', 'pageshow', function () {
            //    var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
            //    $(this).height($(window).height()).find('[data-role="content"]').height(the_height);
            //});
        },

        hideAllDivs: function() {
            $("#div_email").hide();
        },

        selectChange: function() {
            $("input[type='radio']").bind( "change", function(event, ui) {
              if( $('input[name=warn_by]:checked').val() === "0" ) {
                  $("#div_email").show();
                  $("#div_tel").hide();
              } else {
                  $("#div_email").hide();
                  $("#div_tel").show();
              }
            });
        },

        bindEvents: function() {
           app.hideAllDivs();
           app.selectChange();
        }
    };
