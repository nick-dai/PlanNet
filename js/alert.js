// Set global attributes of SweetAlert 2.
swal.setDefaults({
    showCancelButton: true,
    confirmButtonColor: "#69A75C",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    allowOutsideClick: true
});

function showInputDialog(text, target) {
    swal({
        title: "修改" + text,
        text: "請輸入您要修改的" + text + ":",
        html: "<input id='input-field' value='" + target.innerHTML + "'>"
    }, function() {
        if ($("#input-field").val() != false) target.innerHTML = $("#input-field").val();
    });
}
function showDateDialog(text, target) {
    swal({
        title: "修改" + text,
        text: "請輸入您要修改的:" + text,
        html: "<input type='date' id='input-field' value='" + target.innerHTML + "'>"
    }, function() {
        if ($('#input-field').val() != false) target.innerHTML = $('#input-field').val();
    });
}
function showDropdownDialog(array, text, target) {
    var myList = "";
    for (var i=0; i<plants.length; i++) {
        myList += "<option value='" + i + "'>" + array[i].name + "</option>";
    }
    swal({
        title: "修改" + text,
        text: "請輸入您要修改的:" + text,
        html: "<select id='my-select' class='browser-default'>" + myList + "</select>"
    }, function() {
        if ($("#my-select").val() != false) target.html($("#my-select").find("option:selected").text());
    });
}

function showConfirmDialog(title, text) {
    swal({
        title: title,
        text: text,
        type: "input"
    }, function(inputValue) {
        if (inputValue != false) target.html("<div class='valign center'>" + inputValue + "</div>");
    });
}

function showErrorDialog(text) {
    swal({
        title: "錯誤",
        text: text,
        type: "error",
        showCancelButton: false
    });
}