// Cordova APIs need "deviceready" listener to ensure they're loaded.
// So, all of the actions requiring Cordova APIs should be filled here.
function googleLogin() {
    $.oauth2({
        auth_url: "https://accounts.google.com/o/oauth2/v2/auth",
        response_type: "code",
        token_url: "https://www.googleapis.com/oauth2/v4/token",
        client_id: "id",
        client_secret: "secret",
        redirect_uri: "http://localhost",
        other_params: {
            scope: "https://www.googleapis.com/auth/calendar.readonly"
        }
    }, function(token, response) {
        callGoogleApi(token);
    }, function(error) {
        $("#test").html("Error: " + error);
    });
}
function callGoogleApi() {
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
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Popup an alert when users click on exit.
    $("#exit").on("click", function() {
        swal({
            title: "結束",
            text: "您確定要結束本程式嗎?",
            type: "warning",
            showCancelButton: true
        }, function(isConfirm) {
            if (isConfirm) navigator.app.exitApp();
        });
    });
    $("#google").on("click", function() {
        googleLogin();
    });
    $("#facebook").on("click", function() {
        facebookLogin();
    });
}
function facebookLogin() {
    $.oauth2({
        auth_url: 'https://www.facebook.com/dialog/oauth',
        response_type: 'token',
        client_id: 'id',
        redirect_uri: 'http://localhost/',
        other_params: {
            scope: 'user_events',
            display: 'popup'
        }
    }, function(token, response) {
        callFbApi(token);
    }, function(error) {
        $("#test").html("Error: " + error);
    });
}
function callFbApi(token) {
    var url = "https://graph.facebook.com/v2.5/me/events/attending?" + $.param({
        access_token: token
    });
    $.get(url, function(response) {
        alert(response.data[0].description);
        $("#test").html(data);
    });
}