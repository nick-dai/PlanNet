function readFile(url) {
    window.resolveLocalFileSystemURL(url, function(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(event) {
                return this.result;
            };
            reader.readAsText(file);
        }, errorHandler);
    }, fail);
}

function fail(e) {
    console.log("FileSystem Error");
    console.dir(e);
}

function errorHandler(e) {
    var msg = "";
    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = "QUOTA_EXCEEDED_ERR";
            break;
        case FileError.NOT_FOUND_ERR:
            msg = "NOT_FOUND_ERR";
            break;
        case FileError.SECURITY_ERR:
            msg = "SECURITY_ERR";
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = "INVALID_MODIFICATION_ERR";
            break;
        case FileError.INVALID_STATE_ERR:
            msg = "INVALID_STATE_ERR";
            break;
        default:
            msg = "Unknown Error";
            break;
    };
    return msg;
}