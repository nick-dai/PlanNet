// jQuery's init function (Objects here are loaded _before_ all of HTML are loaded.)
$(document).ready(function() {
    // Initialize right-sliding menu.
    $(".button-collapse").sideNav({
        menuWidth: $(document).width(),
        edge: "right",
        closeOnClick: true
    });
    $("#facebook").on("click", function() {
        $.oauth2({
            auth_url: 'https://www.facebook.com/dialog/oauth',
            response_type: 'token',
            client_id: 'id',
            redirect_uri: 'http://localhost',
            other_params: {
                scope: 'user_events',
                display: 'popup'
            }
        }, function(token, response){
            alert("token: "+token+"<br>response: "+response);
        }, function(error, response){
            alert(error + ": " + response);
        });
    });
});

// body's init function (Objects here are loaded _after_ all of HTML are loaded.)
function init() {
    updateUser();
    updateMyPlants();
    updateMyRecords();
        $("#status").animateCss("slideInDown");
        $("#plant").animateCss("rotateIn");
        $("#chat").animateCss("slideInRight");
        $("#message").animateCss("slideInRight");
        document.getElementById("home").style.display = "inline";
}

function load(page) {
    switch(page) {
        case "home":
            // Load myPlants status from Parse.
            setArc(humidity, luminous, temperature, coins);
            // Animate components.
            $("#status").animateCss("slideInDown");
            $("#plant").animateCss("rotateIn");
            $("#chat").animateCss("slideInRight");
            $("#message").animateCss("slideInRight");
            break;
        case "info":
            // Animate components.
            $(".info-plant").animateCss("zoomIn");
            $(".header-circle-1").animateCss("zoomIn");
            $(".header-circle-2").animateCss("zoomIn");
            $(".header-circle-3").animateCss("zoomIn");
            $(".bottom-circle-1").animateCss("zoomIn");
            $(".bottom-circle-2").animateCss("zoomIn");
            $(".bottom-circle-3").animateCss("zoomIn");
            break;
        case "store":
            break;
        case "items":
            break;
        case "diary":
            break;
        case "messages":
            break;
        case "settings":
            var columns = $("#settings").children(),
                index = 0;
            setInterval(function() {
                $(columns).eq(index).toggleClass("invisible").animateCss("slideInRight");
                index++;
                if (index == columns.length) clearInterval();
            }, 50);
            break;
    }
    document.getElementById(current).style.display = "none";
    document.getElementById(page).style.display = "inline";
    current = page;
}

$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        $(this).addClass("animated " + animationName).one(animationEnd, function() {
            $(this).removeClass("animated " + animationName);
        });
    }
});

function makeApiCall(token) {
    var url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?" + $.param({
        access_token: token,
        singleEvents: true, // "orderBy" requires this to work.
        orderBy: "startTime",
        timeMax: moment().add(7, "d").format(), // Upper bound (exclusive) for an event's start time to filter by.
        timeMin: moment().format() // Lower bound (inclusive) for an event's end time to filter by.
    });
    $.get(url, function(data) {
        var str = "帳號: " + data.summary + "<br>活動:<br>";
        for (var i=0; i<data.items.length; i++) {
            str += "  [" + data.items[i].summary + "]<br>    時間: " + data.items[i].start.dateTime + "~" + data.items[i].end.dateTime + "<br>    地點: " + data.items[i].location + "<br>    描述: " + data.items[i].description + "<br><br>";
        }
        $("#test").html(str);
    });
}

var current = "home";
// Change current page.
function display(page) {
    animateOut(current);
    animateIn(page);
    current = page;
}
// Animate when you change between pages.
function animateOut(page) {
    document.getElementById(current).style.display = "none";
}
function animateIn(page) {
    document.getElementById(page).style.display = "inline";
}
function switchOption(button) {
    if (button.hasClass("theme-accent-2")) {
        button.removeClass("theme-accent-2").addClass("button-off").html("<div class='valign-wrapper left full-height'><div class='valign'><span class='left'>關閉</span></div></div>");
    } else {
        button.removeClass("button-off").addClass("theme-accent-2").html("<div class='valign-wrapper left full-height'><div class='valign'><span class='left'>開啟</span></div></div>");
    }
}

function setArc(h, l, t, c) {
    var lArc = 90 - 90*l/100,
        hArc = -90+ 90*h/100,
        cArc = -90+ 90*c/100,
        tArc = 90 - 90*(50-t)/50;
    $("#temperature").css("transform", "skewX(" + tArc + "deg)");
    $("#temperature-inner").css("transform", "skewX(" + (-tArc) + "deg)");
    $("#coins").css("transform", "skewY(" + cArc + "deg)");
    $("#coins-inner").css("transform", "skewY(" + (-cArc) + "deg)");
    $("#humidity").css("transform", "skewY(" + hArc + "deg)");
    $("#humidity-inner").css("transform", "skewY(" + (-hArc) + "deg)");
    $("#luminous").css("transform", "skewX(" + lArc + "deg)");
    $("#luminous-inner").css("transform", "skewX(" + (-lArc) + "deg)");
}