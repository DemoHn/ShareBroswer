/***************************/
//@Author: Adrian "yEnS" Mato Gondelle
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/

//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;

    var popupStatus = 0;

//loading popup with jQuery magic!
    function loadPopup(id) {
        var i;
        for (i = 1; i <= 9; i++) {
            $("#C" + i).css("display", "none");
        }
        //loads popup only if it is disabled
        if (popupStatus == 0) {
            $("#bg_Black").css({
                "opacity": "0.5"
            });
            $("#bg_Black").fadeIn("fast");
            $("#" + id).fadeIn("fast");
            popupStatus = 1;
        }
    }

//disabling popup with jQuery magic!
    function disablePopup() {
        //disables popup only if it is enabled
        if (popupStatus == 1) {
            $("#bg_Black").fadeOut("fast");
            $(".popupContact").fadeOut("fast");
            popupStatus = 0;
        }
    }

//centering popup
    function centerPopup() {
        //request data for centering
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = 500;
        var popupWidth = 600;
        //centering
        $(".popupContact").css({
            "position": "absolute",
            "top": windowHeight / 2 - popupHeight / 2,
            "left": windowWidth / 2 - popupWidth / 2
        });
        //only need force for IE6

        $("#bg_Black").css({
            "height": windowHeight
        });
    }


//CONTROLLING EVENTS IN jQuery
    function start() {

        //LOADING POPUP
        //Click the button event!
        //centering with css

        //load popup

        $("#btn").click(function () {
            centerPopup();
            loadPopup("help");
        });


        //CLOSING POPUP
        //Click the x event!
        $(".popupContactClose").click(function () {
            disablePopup();
        });
        //Click out event!
        $("#bg_Black").click(function () {
            disablePopup();
        });
        //Press Escape event!
        $(document).keypress(function (e) {
            if (e.keyCode == 27 && popupStatus == 1) {
                disablePopup();
            }
        });
    }
