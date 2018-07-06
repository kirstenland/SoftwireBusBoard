function getData(postcode) {
    $.ajax({url: "/departureBoards/"+postcode,
            success: renderData,
            error: renderError});
}

function renderData(data) {
    $("#errors").hide();
    var resultsDiv = $("#results").show();
    var header = $("<h2>").text("Results:")
    var stops = data.map(function(stop) {
        
        var subheader =$("<h3>").text(stop.commonName)
        var list =$("<ul>")
        for (var i = 0; i < stop.buses.length; ++i) {
            var bus = stop.buses[i];
            var label = bus.lineName + " to " + bus.destinationName + " arriving in " + (bus.timeToStation/60).toFixed(0) + " minutes";
            list.append($("<li>").text(label))
        }
        return $("<spand>").append(subheader).append(list);
    });
    resultsDiv.html(header).append(stops);
}

function renderError(xhr) {
    console.log(xhr);
    var errorBox = $("#errors");
    errorBox.show();
    errorBox.html(xhr.responseText);
    $("#results").hide();
}

$().ready(function() {
    $("#postcode_form").submit(function(event) {
        getData($("#postcode").val())
        event.preventDefault();
    })
}
)