$(function() {
    ajaxGrabGlobalOptions();

    function overrideSkin(SKINOPTIONS) {
        let options = SKINOPTIONS.options[SKINOPTIONS.selectedID].value;
        let dark = {
            "background" : options.bgDark
        };
        let light = {
            "background" : options.bgLight
        };
        let txtColor = {
            "color" : options.titleTextColor
        };
        $(".block-top").css(dark);
        $(".header").css(light);
        $(".navBar").css(dark);
        $(".footer").css(light);
        $(".logo-text").css(txtColor);
        $(".footer-bot").css(dark);
        console.log("changed");
    }

    function ajaxGrabGlobalOptions() {
        $.ajax({
            url: "/globalOptions",
            method: "GET",
            contentType: "application/json",
            success: function (res) {
                if(res) {
                    overrideSkin(res.SKINOPTIONS);
                } else {
                    console.log("Could not grab global settings.");
                }
            }
        })
    }
})