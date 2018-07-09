function getBusNumber() {
    var lineFinder = /\/bus\/([^\/]+)/;

    return lineFinder.exec(window.location.href)[1];
}

var spinner = {
    show: function() {
        $("#spinner").show();
    },
    hide: function() {
        $("#spinner").hide();
    }
}

function renderError(xhr) {
    //spinner.hide();
    var errorBox = $("#errors");
    errorBox.show();
    errorBox.html(xhr.responseText);
    $("#results").hide();
}

function renderData(response) {
    spinner.hide();
    var list = $("#station");

    for (var i = 0; i < response.length; ++i) {
        var listRow = $("<li>");
        var busIcon =$("<span>")
            .addClass("fa-li")
            .append($("<i>")
            .addClass(["fas", "fa-bus-alt"]));
        listRow.append(busIcon).append(response[i]);
        list.append(listRow);
    }
}

$().ready(function() {
    var busNumber = getBusNumber();
    $("#linename").text(busNumber);

    spinner.show();
    $.ajax({url: "/api/bus/"+busNumber,
            success: renderData,
            error: renderError});
})
