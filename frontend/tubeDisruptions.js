$().ready(function() {
    getDisruptions();
});

function getDisruptions() {
    $("#yes").html("Loading...");
    $.ajax({
        url: "/tubeDisruptions",
        success: renderData,
        error: renderError
    });
}

function renderData(disruptions) {
    var bad = disruptions.length > 0;
    $(document.body).addClass(bad ? "bad" : "good")
    $("#yes").html(bad ? "No" : "Yes");
    for (var i = 0; i < disruptions.length; ++i) {
        $("#bottom").append(disruptions[i]+"<br />");
    }
}

function renderError(xhr) {
    $("#yes").html("Error");
    $("#bottom").html(xhr.responseText);
}